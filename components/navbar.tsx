"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
]

export function Navbar({ onOpenBuilder }: { onOpenBuilder: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-foreground"
        >
          Nexora<span className="text-primary">.</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}

          <Button size="sm" onClick={onOpenBuilder}>
            Build My Project
          </Button>

          {/* ✅ Admin Login Button */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => router.push("/admin/login")}
          >
            Admin Login
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-foreground md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col gap-4 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}

            <Button
              size="sm"
              onClick={() => {
                setMobileOpen(false)
                onOpenBuilder()
              }}
            >
              Build My Project
            </Button>

            {/* ✅ Mobile Admin Login */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setMobileOpen(false)
                router.push("/admin/login")
              }}
            >
              Admin Login
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}


// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Menu, X } from "lucide-react"
// import { cn } from "@/lib/utils"

// const navLinks = [
//   { label: "Services", href: "#services" },
//   { label: "Portfolio", href: "#portfolio" },
//   { label: "Contact", href: "#contact" },
// ]

// export function Navbar({ onOpenBuilder }: { onOpenBuilder: () => void }) {
//   const [scrolled, setScrolled] = useState(false)
//   const [mobileOpen, setMobileOpen] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <header
//       className={cn(
//         "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
//         scrolled
//           ? "bg-background/80 backdrop-blur-lg border-b border-border"
//           : "bg-transparent"
//       )}
//     >
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         <a href="#" className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight text-foreground">
//           Nexora<span className="text-primary">.</span>
//         </a>

//         <div className="hidden items-center gap-8 md:flex">
//           {navLinks.map((link) => (
//             <a
//               key={link.href}
//               href={link.href}
//               className="text-sm text-muted-foreground transition-colors hover:text-foreground"
//             >
//               {link.label}
//             </a>
//           ))}
//           <Button size="sm" onClick={onOpenBuilder}>
//             Build My Project
//           </Button>
//         </div>

//         <button
//           className="text-foreground md:hidden"
//           onClick={() => setMobileOpen(!mobileOpen)}
//           aria-label="Toggle menu"
//         >
//           {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
//         </button>
//       </nav>

//       {mobileOpen && (
//         <div className="border-b border-border bg-background/95 backdrop-blur-lg md:hidden">
//           <div className="flex flex-col gap-4 px-6 py-4">
//             {navLinks.map((link) => (
//               <a
//                 key={link.href}
//                 href={link.href}
//                 className="text-sm text-muted-foreground transition-colors hover:text-foreground"
//                 onClick={() => setMobileOpen(false)}
//               >
//                 {link.label}
//               </a>
//             ))}
//             <Button
//               size="sm"
//               onClick={() => {
//                 setMobileOpen(false)
//                 onOpenBuilder()
//               }}
//             >
//               Build My Project
//             </Button>
//           </div>
//         </div>
//       )}
//     </header>
//   )
// }
