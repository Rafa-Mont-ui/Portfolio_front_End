"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js"
import { gsap } from "gsap"

// Simplex noise 3D — Ian McEwan / Ashima Arts (MIT)
const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmp;
varying vec3 vNormal;
varying vec3 vViewPos;
varying float vNoise;
${noise}

float field(vec3 p){
  return snoise(p * 1.05 + vec3(uTime * 0.22, uTime * 0.16, 0.0))
       + snoise(p * 2.3 - uTime * 0.28) * 0.3;
}

vec3 displace(vec3 p){
  return p + normalize(p) * field(p) * uAmp;
}

void main(){
  // Recalcula a normal a partir de dois vizinhos deslocados;
  // o ruído do ponto central é calculado uma vez só e reaproveitado
  vec3 n = normalize(position);
  vec3 t = normalize(cross(n, abs(n.y) < 0.99 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0)));
  vec3 b = cross(n, t);
  float e = 0.01;
  float f0 = field(position);
  vec3 p0 = position + n * f0 * uAmp;
  vec3 p1 = displace(position + t * e);
  vec3 p2 = displace(position + b * e);
  vec3 dn = normalize(cross(p1 - p0, p2 - p0));

  vNoise = f0;
  vNormal = normalize(normalMatrix * dn);
  vec4 mv = modelViewMatrix * vec4(p0, 1.0);
  vViewPos = -mv.xyz;
  gl_Position = projectionMatrix * mv;
}
`

const fragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uBase;
uniform vec3 uLime;
uniform vec3 uCream;
varying vec3 vNormal;
varying vec3 vViewPos;
varying float vNoise;

void main(){
  vec3 n = normalize(vNormal);
  vec3 v = normalize(vViewPos);
  float fres = pow(1.0 - max(dot(n, v), 0.0), 2.6);

  // Linhas de contorno "topográficas" seguindo o ruído
  float k = vNoise * 7.0 - uTime * 0.12;
  float f = fract(k);
  float w = fwidth(k);
  float line = 1.0 - smoothstep(0.0, w * 1.4, min(f, 1.0 - f));

  vec3 light = normalize(vec3(-0.5, 0.8, 0.6));
  float diff = max(dot(n, light), 0.0);

  vec3 col = uBase + uCream * diff * 0.06;
  col = mix(col, uLime, line * (0.25 + fres * 0.75));
  col += uLime * fres * 0.85;

  gl_FragColor = vec4(col, 1.0);
}
`

// WebGL emulado na CPU (aceleração de hardware desligada, driver bloqueado, VM...)
function isSoftwareRenderer() {
  try {
    const gl = document.createElement("canvas").getContext("webgl2")
    if (!gl) return true
    const info = gl.getExtension("WEBGL_debug_renderer_info")
    const name = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : ""
    gl.getExtension("WEBGL_lose_context")?.loseContext()
    return /swiftshader|llvmpipe|software|basic render/i.test(name)
  } catch {
    return false
  }
}

const hex = (h: string) => {
  const c = parseInt(h.slice(1), 16)
  return new THREE.Vector3(((c >> 16) & 255) / 255, ((c >> 8) & 255) / 255, (c & 255) / 255)
}

export function HeroObject({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const software = isSoftwareRenderer()
    const deviceDpr = Math.min(window.devicePixelRatio, 1.5)
    // Níveis de qualidade: começa no mais alto e desce se o fps cair
    const pixelRatios = software ? [0.75, 0.5] : [deviceDpr, Math.min(deviceDpr, 1), 0.75]
    let tier = 0

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !software && window.devicePixelRatio < 1.5,
        alpha: true,
        powerPreference: "high-performance",
      })
    } catch {
      return // Sem WebGL: o hero continua funcionando só com a tipografia
    }

    renderer.setPixelRatio(pixelRatios[tier])
    renderer.setClearColor(0x000000, 0)
    const canvas = renderer.domElement
    canvas.style.cssText = "display:block;width:100%;height:100%;"
    container.appendChild(canvas)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50)
    camera.position.z = 6

    const uniforms = {
      uTime: { value: 0 },
      uAmp: { value: 0.32 },
      uBase: { value: hex("#11110f") },
      uLime: { value: hex("#d4ff3a") },
      uCream: { value: hex("#ede4cf") },
    }

    // IcosahedronGeometry vem sem índice (cada vértice repetido ~6x); sem normal/uv
    // os vértices podem ser fundidos e o vertex shader roda ~6x menos
    const base = new THREE.IcosahedronGeometry(1.25, software ? 20 : 40)
    base.deleteAttribute("normal")
    base.deleteAttribute("uv")
    const geometry = mergeVertices(base)
    base.dispose()
    const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      if (!width || !height) return
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      if (reduce) renderer.render(scene, camera)
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    // Entrada: cresce depois que o nome termina de aparecer
    mesh.scale.setScalar(reduce ? 1 : 0)
    const intro = reduce
      ? null
      : gsap.to(mesh.scale, { x: 1, y: 1, z: 1, duration: 2.2, delay: 0.7, ease: "expo.out" })

    const pointer = { x: 0, y: 0, tx: 0, ty: 0, energy: 0 }
    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      pointer.energy = Math.min(pointer.energy + Math.hypot(nx - pointer.tx, ny - pointer.ty) * 1.5, 1)
      pointer.tx = nx
      pointer.ty = ny
    }
    window.addEventListener("pointermove", onPointer, { passive: true })

    let inView = true
    const io = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting))
    io.observe(container)

    const clock = new THREE.Clock()
    let frame = 0
    const sample = { frames: 0, time: 0, warmup: 90 }

    // Se a média ficar abaixo de ~45fps, reduz a resolução do canvas
    const adaptQuality = (rawDt: number) => {
      if (sample.warmup > 0) {
        sample.warmup--
        return
      }
      sample.frames++
      sample.time += rawDt
      if (sample.frames < 60) return
      const avg = sample.time / sample.frames
      sample.frames = 0
      sample.time = 0
      if (avg > 1 / 45 && tier < pixelRatios.length - 1) {
        tier++
        renderer.setPixelRatio(pixelRatios[tier])
        resize()
        sample.warmup = 30
      }
    }

    const render = () => {
      frame = requestAnimationFrame(render)
      if (!inView || document.hidden) {
        clock.getDelta()
        return
      }

      const rawDt = clock.getDelta()
      const dt = Math.min(rawDt, 0.05)
      const scroll = Math.min(window.scrollY / window.innerHeight, 1.5)
      adaptQuality(rawDt)

      // Suavização independente da taxa de quadros (60Hz, 120Hz, 144Hz...)
      const ease = 1 - Math.pow(0.95, dt * 60)
      uniforms.uTime.value += dt
      pointer.x += (pointer.tx - pointer.x) * ease
      pointer.y += (pointer.ty - pointer.y) * ease
      pointer.energy *= Math.pow(0.96, dt * 60)

      // Mais agitação com o mouse em movimento e ao rolar
      uniforms.uAmp.value = 0.32 + pointer.energy * 0.22 + scroll * 0.25

      mesh.rotation.y += dt * 0.12
      mesh.rotation.x = pointer.y * 0.45 + scroll * 0.8
      mesh.rotation.z = -pointer.x * 0.3
      mesh.position.x = pointer.x * 0.15
      mesh.position.y = -pointer.y * 0.1 + scroll * 1.2

      renderer.render(scene, camera)
    }

    if (reduce) {
      renderer.render(scene, camera)
    } else {
      render()
    }

    return () => {
      cancelAnimationFrame(frame)
      intro?.kill()
      window.removeEventListener("pointermove", onPointer)
      resizeObserver.disconnect()
      io.disconnect()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (canvas.parentNode === container) container.removeChild(canvas)
    }
  }, [])

  return <div ref={containerRef} aria-hidden="true" className={className} />
}
