"use client";

import { motion } from "framer-motion";
import { Sparkles, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is VisionForge AI?",
    answer: "VisionForge AI is an AI-powered image editing platform that lets you transform images using natural language descriptions. Simply upload a photo, describe what you want, and our AI will edit it for you.",
  },
  {
    question: "How does the AI editing work?",
    answer: "Our AI uses advanced machine learning models to understand your text prompts and apply the requested changes to your images. It can handle tasks like background removal, style transfer, object removal, color grading, and much more.",
  },
  {
    question: "What image formats are supported?",
    answer: "We support PNG, JPEG, and WebP formats. Maximum file size is 10MB for free users and 50MB for paid subscribers.",
  },
  {
    question: "How many images can I create?",
    answer: "Free users get 5 generations per month. Basic plan includes 100, Pro includes 500, and Unlimited plan offers unlimited generations. You can also purchase additional credits at any time.",
  },
  {
    question: "Can I use the generated images commercially?",
    answer: "Yes! All images generated with VisionForge AI are yours to use commercially. There are no royalties or attribution requirements.",
  },
  {
    question: "Is there a refund policy?",
    answer: "We offer a 7-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund.",
  },
  {
    question: "Do you offer an API?",
    answer: "Yes, API access is available for Pro and Unlimited plan subscribers. Our REST API lets you integrate VisionForge AI into your own applications and workflows.",
  },
  {
    question: "How can I contact support?",
    answer: "You can reach our support team through the in-app chat, email at support@visionforge.ai, or through our help center. We typically respond within 24 hours.",
  },
];

export function FAQ() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            FAQ
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Frequently asked
            <br />
            <span className="gradient-text">questions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about VisionForge AI.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border border-white/10 bg-white/5 px-6 backdrop-blur-xl"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
