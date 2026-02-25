"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { ArrowUpRight } from "lucide-react"

type Category = "All" | "Web" | "Ecommerce" | "Branding"

interface Project {
  id: string
  title: string
  description: string
  category: Category
  tags: string[]
  imageColor: string
  imageInitials: string
}

const projects: Project[] = [
  {
    id: "1",
    title: "Horizon SaaS Platform",
    description:
      "A modern SaaS dashboard with real-time analytics, user management, and subscription billing.",
    category: "Web",
    tags: ["Next.js", "Tailwind", "Stripe"],
    imageColor: "from-primary/20 to-primary/5",
    imageInitials: "HS",
  },
  {
    id: "2",
    title: "Verde Organic Market",
    description:
      "Premium organic grocery e-commerce with subscription boxes and local delivery integration.",
    category: "Ecommerce",
    tags: ["Shopify", "Custom Theme", "SEO"],
    imageColor: "from-chart-2/20 to-chart-2/5",
    imageInitials: "VO",
  },
  {
    id: "3",
    title: "Lumina Studios",
    description:
      "Complete brand identity for a creative studio including logo, typography, and brand guide.",
    category: "Branding",
    tags: ["Logo", "Identity", "Guidelines"],
    imageColor: "from-chart-5/20 to-chart-5/5",
    imageInitials: "LS",
  },
  {
    id: "4",
    title: "Atlas Fitness App",
    description:
      "Responsive web app for a fitness brand with class booking, membership tiers, and trainer profiles.",
    category: "Web",
    tags: ["React", "Node.js", "MongoDB"],
    imageColor: "from-chart-1/20 to-chart-1/5",
    imageInitials: "AF",
  },
  {
    id: "5",
    title: "Noir Fashion House",
    description:
      "High-end fashion e-commerce with lookbook galleries, size guides, and international shipping.",
    category: "Ecommerce",
    tags: ["WooCommerce", "Custom", "Multi-currency"],
    imageColor: "from-foreground/10 to-foreground/5",
    imageInitials: "NF",
  },
  {
    id: "6",
    title: "Crest Financial Group",
    description:
      "Sophisticated brand identity for a financial advisory firm targeting high-net-worth individuals.",
    category: "Branding",
    tags: ["Branding", "Print", "Digital"],
    imageColor: "from-chart-4/20 to-chart-4/5",
    imageInitials: "CF",
  },
]

const categories: Category[] = ["All", "Web", "Ecommerce", "Branding"]

export function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="portfolio" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Portfolio
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Work that speaks for itself
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
            A selection of our recent projects across web development,
            e-commerce, and branding.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-10 flex justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-medium transition-all",
                activeCategory === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-muted-foreground/30"
            >
              {/* Image placeholder */}
              <div
                className={cn(
                  "flex h-48 items-center justify-center bg-gradient-to-br",
                  project.imageColor
                )}
              >
                <span className="font-[family-name:var(--font-heading)] text-4xl font-bold text-foreground/30">
                  {project.imageInitials}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-3">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
