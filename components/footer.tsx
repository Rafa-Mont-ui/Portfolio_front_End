export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <a
          href="#"
          className="font-mono text-sm font-bold text-primary"
        >
          {'<dev />'}
        </a>
        <p className="text-center text-xs text-muted-foreground">
          Desenvolvido com Next.js, Tailwind CSS & muito cafe.
        </p>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}
