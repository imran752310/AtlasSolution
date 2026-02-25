"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Mail,
  Calendar,
  Loader2,
} from "lucide-react"
import { services } from "@/components/services"

const STEPS = ["Industry", "Project Type", "Budget", "Details"] as const

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Retail",
  "Real Estate",
  "Food & Beverage",
  "Other",
]

const projectTypes = [
  "New Website",
  "Website Redesign",
  "E-commerce Platform",
  "Brand Identity",
  "Marketing Campaign",
  "Full Digital Transformation",
]

const budgetRanges = [
  "$1,000 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $10,000",
  "$10,000 - $20,000",
  "$20,000+",
]

interface ProjectBuilderProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedServices: string[]
}

interface FormData {
  industry: string
  projectType: string
  budget: string
  name: string
  email: string
}

export function ProjectBuilder({
  open,
  onOpenChange,
  selectedServices,
}: ProjectBuilderProps) {
  const [step, setStep] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    industry: "",
    projectType: "",
    budget: "",
    name: "",
    email: "",
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const selectedServiceObjects = services.filter((s) =>
    selectedServices.includes(s.id)
  )
  const totalPrice = selectedServiceObjects.reduce(
    (sum, s) => sum + s.basePrice,
    0
  )

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.industry !== ""
      case 1:
        return formData.projectType !== ""
      case 2:
        return formData.budget !== ""
      case 3:
        return formData.name !== "" && formData.email !== ""
      default:
        return false
    }
  }

  const validateStep3 = () => {
    const newErrors: Partial<FormData> = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      if (!validateStep3()) return
      setSubmitting(true)
      console.log(selectedServices)
      console.log(totalPrice)
      console.log(formData)
      try {
        const res = await fetch("/api/project-builder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...formData,
            selectedServices: selectedServices,
            totalPrice,
          }),
        })
        if (!res.ok) throw new Error("Submission failed")
        setSubmitted(true)
      } catch {
        setErrors({ email: "Something went wrong. Please try again." })
      } finally {
        setSubmitting(false)
      }
    }
  }

  const handleClose = () => {
    onOpenChange(false)
    setTimeout(() => {
      setStep(0)
      setSubmitted(false)
      setFormData({
        industry: "",
        projectType: "",
        budget: "",
        name: "",
        email: "",
      })
      setErrors({})
    }, 300)
  }

  if (submitted) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-lg">
          <div className="flex flex-col items-center gap-6 py-6 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Check className="size-8 text-primary" />
            </div>

            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                {"Thank you, " + formData.name + "!"}
              </h2>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {"We've received your project details and will reach out to you at "}
                <span className="text-foreground font-medium">
                  {formData.email}
                </span>
                {" with a personalized proposal."}
              </p>
            </div>

            {/* Summary */}
            <div className="w-full rounded-lg border border-border bg-secondary/30 p-4 text-left">
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Project Summary
              </h3>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Industry</span>
                  <span className="text-foreground">{formData.industry}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Project Type</span>
                  <span className="text-foreground">
                    {formData.projectType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Budget Range</span>
                  <span className="text-foreground">{formData.budget}</span>
                </div>
                {selectedServiceObjects.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
                    {selectedServiceObjects.map((s) => (
                      <Badge key={s.id} variant="secondary" className="text-xs">
                        {s.name}
                      </Badge>
                    ))}
                  </div>
                )}
                {totalPrice > 0 && (
                  <div className="flex justify-between pt-2 border-t border-border font-semibold">
                    <span className="text-muted-foreground">Estimated Cost</span>
                    <span className="text-primary">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {totalPrice >= 8000 && (
              <Badge className="gap-1.5 bg-primary/10 text-primary border-primary/20 py-1.5 px-4">
                <Sparkles className="size-3.5" />
                Recommended Package
              </Badge>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-3 w-full">
              <Button variant="outline" className="gap-2 w-full" asChild>
                <a href="mailto:muhammadimran752310@gmail.com">
                  <Mail className="size-4" />
                  Email Us Directly
                </a>
              </Button>
              <Button className="gap-2 w-full" asChild>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="size-4" />
                  Schedule a Call
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-heading)] text-xl">
            Build My Project
          </DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-2">
          {STEPS.map((s, i) => (
            <div key={s} className="flex flex-1 items-center gap-2">
              <div
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                  i <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                {i < step ? <Check className="size-3.5" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 flex-1 rounded-full transition-colors",
                    i < step ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <p className="text-sm text-muted-foreground">
          {step === 0 && "What industry is your business in?"}
          {step === 1 && "What type of project are you looking for?"}
          {step === 2 && "What is your estimated budget?"}
          {step === 3 && "Almost there! Tell us how to reach you."}
        </p>

        {/* Step 0 - Industry */}
        {step === 0 && (
          <div className="grid grid-cols-2 gap-2">
            {industries.map((ind) => (
              <button
                key={ind}
                onClick={() => setFormData({ ...formData, industry: ind })}
                className={cn(
                  "rounded-lg border px-4 py-3 text-sm text-left transition-all",
                  formData.industry === ind
                    ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30"
                )}
              >
                {ind}
              </button>
            ))}
          </div>
        )}

        {/* Step 1 - Project Type */}
        {step === 1 && (
          <div className="grid grid-cols-1 gap-2">
            {projectTypes.map((pt) => (
              <button
                key={pt}
                onClick={() => setFormData({ ...formData, projectType: pt })}
                className={cn(
                  "rounded-lg border px-4 py-3 text-sm text-left transition-all",
                  formData.projectType === pt
                    ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30"
                )}
              >
                {pt}
              </button>
            ))}
          </div>
        )}

        {/* Step 2 - Budget Range */}
        {step === 2 && (
          <div className="grid grid-cols-1 gap-2">
            {budgetRanges.map((br) => (
              <button
                key={br}
                onClick={() => setFormData({ ...formData, budget: br })}
                className={cn(
                  "rounded-lg border px-4 py-3 text-sm text-left transition-all",
                  formData.budget === br
                    ? "border-primary bg-primary/5 text-foreground ring-1 ring-primary"
                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30"
                )}
              >
                {br}
              </button>
            ))}
          </div>
        )}

        {/* Step 3 - Name + Email */}
        {step === 3 && (
          <div className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="builder-name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Full Name
              </label>
              <Input
                id="builder-name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="builder-email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email Address
              </label>
              <Input
                id="builder-email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep(step - 1)}
            disabled={step === 0}
            className="gap-1"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          <Button
            size="sm"
            onClick={handleNext}
            disabled={!canProceed() || submitting}
            className="gap-1"
          >
            {submitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Submitting
              </>
            ) : step === 3 ? (
              "Submit"
            ) : (
              <>
                Next
                <ArrowRight className="size-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
