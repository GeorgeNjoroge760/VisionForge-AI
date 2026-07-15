"use client";

import { motion } from "framer-motion";
import { Upload, Wand2, Download, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Image",
    description: "Drag and drop or click to upload any image. We support PNG, JPEG, and WebP formats up to 10MB.",
    color: "text-primary",
    bg: "bg-primary/10",
    border: "border-primary/20",
  },
  {
    icon: Wand2,
    step: "02",
    title: "Describe Your Vision",
    description: "Tell AI what you want in plain English. Be creative - remove backgrounds, add effects, change styles, and more.",
    color: "text-secondary",
    bg: "bg-secondary/10",
    border: "border-secondary/20",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "AI Generates",
    description: "Our advanced AI processes your request in seconds. Watch the magic happen with real-time progress.",
    color: "text-accent",
    bg: "bg-accent/10",
    border: "border-accent/20",
  },
  {
    icon: Download,
    step: "04",
    title: "Download & Share",
    description: "Compare before and after, then download your masterpiece in high resolution or share it with the world.",
    color: "text-green-500",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            How It Works
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Four simple steps to
            <br />
            <span className="gradient-text">stunning results</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            No design skills required. Just upload, describe, and download.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-24 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative text-center"
              >
                {/* Step Number */}
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${step.bg} ${step.border} border mb-6`}>
                  <span className={`text-sm font-bold ${step.color}`}>{step.step}</span>
                </div>

                {/* Icon */}
                <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${step.bg} border ${step.border} mb-4`}>
                  <step.icon className={`h-8 w-8 ${step.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
