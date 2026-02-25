"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Portfolio } from "@/components/portfolio";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Footer } from "@/components/footer";
import { ProjectBuilder } from "@/components/project-builder";
import { ContactForm } from "@/components/contact-form";

export default function Home() {
   const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [builderOpen, setBuilderOpen] = useState(false)

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }


  return (
   <>
   <Navbar onOpenBuilder={() => setBuilderOpen(true)} />
    <main>
       <Hero onOpenBuilder={() => setBuilderOpen(true)} />
   <Services
          selected={selectedServices}
          onToggle={toggleService}
          onOpenBuilder={() => setBuilderOpen(true)}
        />
    <Portfolio />
    <ContactForm />
    </main>
     <Footer />
      <ProjectBuilder
        open={builderOpen}
        onOpenChange={setBuilderOpen}
        selectedServices={selectedServices}
      />
   </>
  );
}
