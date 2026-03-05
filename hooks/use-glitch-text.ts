"use client"

import { useEffect, useState } from "react"

const GLITCH_CHARS = "0123456789@#$%&*"

function getRandomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
}

export function useGlitchText(
  originalText: string,
  options?: { initialDelay?: number; glitchInterval?: number; pauseDuration?: number }
) {
  const [displayText, setDisplayText] = useState(originalText)
  const { initialDelay = 1500, glitchInterval = 50, pauseDuration = 3000 } = options ?? {}

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>
    let timeoutId: ReturnType<typeof setTimeout>

    const startGlitch = () => {
      let frame = 0
      const maxFrames = 30

      intervalId = setInterval(() => {
        frame++
        setDisplayText(
          originalText
            .split("")
            .map((char) => {
              if (char === " " || char === "-") return char
              return Math.random() > 0.4 ? getRandomChar() : char
            })
            .join("")
        )

        if (frame >= maxFrames) {
          clearInterval(intervalId)
          setDisplayText(originalText)
          timeoutId = setTimeout(startGlitch, pauseDuration)
        }
      }, glitchInterval)
    }

    timeoutId = setTimeout(startGlitch, initialDelay)

    return () => {
      clearInterval(intervalId)
      clearTimeout(timeoutId)
    }
  }, [originalText, initialDelay, glitchInterval, pauseDuration])

  return displayText
}
