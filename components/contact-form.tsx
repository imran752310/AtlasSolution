"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Send, Loader2 } from "lucide-react"

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })


  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)


  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(formData)
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to send message")
      }
      setSubmitted(true)
      toast.success("Message sent successfully!")
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Something went wrong"
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="contact" className="px-6 py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-10">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10">
              <Send className="size-6 text-primary" />
            </div>
            <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
              Message Sent!
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {"Thank you for reaching out. We'll get back to you within 24 hours."}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSubmitted(false)
                setFormData({ name: "", email: "", message: "" })
              }}
            >
              Send Another Message
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left column */}
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-primary">
              Get in Touch
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {"Let's start a conversation"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Have a project in mind or just want to say hello? Fill out the
              form and we will get back to you within 24 hours.
            </p>

            <div className="mt-10 flex flex-col gap-6">
              <div>
                <p className="text-sm font-medium text-foreground">Email</p>
                <p className="text-muted-foreground">hello@nexora.digital</p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Location</p>
                <p className="text-muted-foreground">
                  San Francisco, CA
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Working Hours
                </p>
                <p className="text-muted-foreground">
                  Mon - Fri, 9:00 AM - 6:00 PM PST
                </p>
              </div>
            </div>
          </div>

          {/* Right column - Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 md:p-8"
          >
            <div>
              <label
                htmlFor="contact-name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Name
              </label>
              <Input
                id="contact-name"
                placeholder="Your name"
                value={formData.name}
                name="name"
                onChange={onHandleChange }
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <Input
                id="contact-email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                name="email"
                onChange={onHandleChange}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Message
              </label>
              <Textarea
                id="contact-message"
                placeholder="Tell us about your project..."
                rows={5}
                value={formData.message}
                name="message"
                onChange={onHandleChange}
                aria-invalid={!!errors.message}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={submitting}
              className="gap-2 w-full"
            >
              {submitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
