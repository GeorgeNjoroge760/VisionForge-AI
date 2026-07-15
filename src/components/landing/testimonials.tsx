"use client";

import { motion } from "framer-motion";
import { Star, Sparkles, Quote } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Product Designer at Stripe",
    avatar: "SC",
    content: "VisionForge AI has completely transformed my design workflow. What used to take hours in Photoshop now takes seconds. The AI understands exactly what I want.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Content Creator",
    avatar: "MJ",
    content: "As a content creator, I need to produce high-quality visuals quickly. VisionForge AI lets me create stunning images for my social media in minutes.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Real Estate Agent",
    avatar: "ER",
    content: "The real estate preset is incredible. I can transform ordinary property photos into magazine-quality images that help sell homes faster.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "E-commerce Owner",
    avatar: "DK",
    content: "Product photography used to be expensive. Now I can create professional product shots with just a phone photo and a simple prompt.",
    rating: 5,
  },
  {
    name: "Lisa Wang",
    role: "Marketing Manager",
    avatar: "LW",
    content: "The batch processing feature is a game-changer. I can apply consistent styling to hundreds of images at once. Our marketing visuals have never looked better.",
    rating: 5,
  },
  {
    name: "James Mitchell",
    role: "Photographer",
    avatar: "JM",
    content: "I was skeptical about AI photo editing, but VisionForge AI changed my mind. The results are genuinely impressive and save me so much post-processing time.",
    rating: 5,
  },
];

export function Testimonials() {
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
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Loved by
            <br />
            <span className="gradient-text">thousands of creators</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See what our users have to say about their experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-white/10" />
              
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground mb-6">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback className="bg-primary/20 text-primary">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
