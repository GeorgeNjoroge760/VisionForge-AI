"use client";

import { motion } from "framer-motion";
import {
  Wand2,
  ImagePlus,
  Layers,
  Zap,
  Palette,
  Download,
  Sparkles,
  ArrowRightLeft,
  Eraser,
} from "lucide-react";

const features = [
  {
    icon: Wand2,
    title: "AI Magic Edit",
    description: "Describe what you want in plain English and watch AI transform your image instantly.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: ImagePlus,
    title: "Style Transfer",
    description: "Apply stunning artistic styles - from anime to oil painting, cyberpunk to watercolor.",
    gradient: "from-secondary to-accent",
  },
  {
    icon: Eraser,
    title: "Smart Removal",
    description: "Remove unwanted objects, people, or backgrounds with AI precision.",
    gradient: "from-accent to-primary",
  },
  {
    icon: Layers,
    title: "Before & After",
    description: "Compare your original and edited images side-by-side with our interactive slider.",
    gradient: "from-primary to-accent",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get professional-quality edits in seconds, not hours. No design skills needed.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Palette,
    title: "14+ Style Presets",
    description: "Choose from curated presets or create your own custom style with natural language.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Download,
    title: "HD Downloads",
    description: "Download your edited images in high resolution, perfect for print or web.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Sparkles,
    title: "Prompt Enhancement",
    description: "AI automatically enhances your prompts for better, more detailed results.",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    icon: ArrowRightLeft,
    title: "Batch Processing",
    description: "Edit multiple images at once with consistent style across your entire batch.",
    gradient: "from-blue-500 to-cyan-500",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
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
            Features
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Everything you need to
            <br />
            <span className="gradient-text">create stunning visuals</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful AI tools that make professional image editing accessible to everyone.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
