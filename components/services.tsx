"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Globe,
  ShoppingCart,
  Palette,
  Search,
  Wrench,
  Check,
  Clock,
  DollarSign,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export interface Service {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  deliveryDays: number;
  icon: React.ReactNode;
}

export const services: Service[] = [
  {
    id: "web-dev",
    name: "Website Development",
    description:
      "Custom responsive websites built with modern frameworks and best practices.",
    basePrice: 3000,
    deliveryDays: 21,
    icon: <Globe className="size-5" />,
  },
  {
    id: "ecommerce",
    name: "E-commerce Store",
    description:
      "Full-featured online stores with payment integration and inventory management.",
    basePrice: 5000,
    deliveryDays: 30,
    icon: <ShoppingCart className="size-5" />,
  },
  {
    id: "branding",
    name: "Branding",
    description:
      "Complete brand identity including logo, typography, and brand guidelines.",
    basePrice: 2000,
    deliveryDays: 14,
    icon: <Palette className="size-5" />,
  },
  {
    id: "seo",
    name: "SEO",
    description:
      "Search engine optimization to boost your visibility and organic traffic.",
    basePrice: 1500,
    deliveryDays: 30,
    icon: <Search className="size-5" />,
  },
  {
    id: "maintenance",
    name: "Maintenance",
    description:
      "Ongoing website maintenance, updates, security patches, and support.",
    basePrice: 800,
    deliveryDays: 0,
    icon: <Wrench className="size-5" />,
  },
];

const RECOMMENDED_THRESHOLD = 8000;

interface ServicesProps {
  selected: string[];
  onToggle: (id: string) => void;
  onOpenBuilder: () => void;
}

export function Services({ selected, onToggle, onOpenBuilder }: ServicesProps) {
  const totalPrice = services
    .filter((s) => selected.includes(s.id))
    .reduce((sum, s) => sum + s.basePrice, 0);

  const totalDays = Math.max(
    ...services
      .filter((s) => selected.includes(s.id))
      .map((s) => s.deliveryDays),
    0,
  );

  const isRecommended = totalPrice >= RECOMMENDED_THRESHOLD;

  return (
    <section id="services" className="relative px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Our Services
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Everything you need to go digital
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground leading-relaxed">
            Select the services you need and get an instant price estimate.
            Combine services for better value.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => {
            const isSelected = selected.includes(service.id);
            return (
              <motion.button
                key={service.id}
                onClick={() => onToggle(service.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={cn(
                  "group relative flex flex-col items-start gap-4 rounded-xl border p-6 text-left transition-all duration-200",
                  isSelected
                    ? "border-primary bg-primary/5 ring-1 ring-primary"
                    : "border-border bg-card hover:border-muted-foreground/30",
                )}
              >
                {/* Selection indicator */}
                <div
                  className={cn(
                    "absolute top-4 right-4 flex size-6 items-center justify-center rounded-full border transition-all",
                    isSelected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary",
                  )}
                >
                  {isSelected && <Check className="size-3.5" />}
                </div>

                <div
                  className={cn(
                    "flex size-10 items-center justify-center rounded-lg transition-colors",
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {service.icon}
                </div>

                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-lg font-semibold text-foreground">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <div className="mt-auto flex w-full items-center justify-between pt-4 border-t border-border">
                  <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-foreground">
                    ${service.basePrice.toLocaleString()}
                  </span>
                  {service.deliveryDays > 0 && (
                    <span className="text-xs text-muted-foreground">
                      ~{service.deliveryDays} days
                    </span>
                  )}
                  {service.deliveryDays === 0 && (
                    <span className="text-xs text-muted-foreground">
                      Monthly
                    </span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Pricing summary */}
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-10 rounded-xl border border-border bg-card p-6 md:p-8"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <DollarSign className="size-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Total Project Cost
                    </p>
                    <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                      ${totalPrice.toLocaleString()}
                    </p>
                  </div>
                </div>

                {totalDays > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Clock className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Est. Delivery
                      </p>
                      <p className="font-[family-name:var(--font-heading)] text-2xl font-bold text-foreground">
                        ~{totalDays} days
                      </p>
                    </div>
                  </div>
                )}

                {isRecommended && (
                  <Badge className="gap-1.5 bg-primary/10 text-primary border-primary/20 py-1 px-3">
                    <Sparkles className="size-3.5" />
                    Recommended Package
                  </Badge>
                )}
              </div>

              <Button size="lg" className="gap-2" onClick={onOpenBuilder}>
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
