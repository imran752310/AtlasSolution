"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function Hero({ onOpenBuilder }: { onOpenBuilder: () => void }) {

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground"
        >
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          Now accepting new projects for 2026
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-[family-name:var(--font-heading)] text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-7xl text-balance"
        >
          We build digital
          <br />
          products that <span className="text-primary">matter</span>
        </motion.h1>

        {/* Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty"
        >
          Nexora Digital is a full-service agency helping brands launch, grow,
          and scale through thoughtful design, modern development, and strategic
          digital marketing.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button size="lg" className="gap-2 px-8 text-base" onClick={onOpenBuilder}>
            Build My Project
            <ArrowRight className="size-4" />
          </Button>
          <Button variant="outline" size="lg" className="px-8 text-base" asChild>
            <a href="#services">Explore Services</a>
          </Button>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-8 border-t border-border pt-10"
        >
         
          {[
            { value: "150+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "5+", label: "Years of Experience" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          ))}


          
        </motion.div>
      </div>
    </section>
  )
}

