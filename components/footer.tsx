export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <a
            href="#"
            className="font-[family-name:var(--font-heading)] text-lg font-bold tracking-tight text-foreground"
          >
            Nexora<span className="text-primary">.</span>
          </a>
          <p className="mt-1 text-sm text-muted-foreground">
            Building digital products that matter.
          </p>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#services" className="transition-colors hover:text-foreground">
            Services
          </a>
          <a href="#portfolio" className="transition-colors hover:text-foreground">
            Portfolio
          </a>
          <a href="#contact" className="transition-colors hover:text-foreground">
            Contact
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          {"\u00A9 2026 Nexora Digital. All rights reserved."}
        </p>
      </div>
    </footer>
  )
}
