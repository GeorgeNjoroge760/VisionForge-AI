"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, GripVertical } from "lucide-react";

export function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

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
            Before & After
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            See the
            <br />
            <span className="gradient-text">transformation</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to compare the original and AI-edited images.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl overflow-hidden">
            <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
              {/* Before Side */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                      <span className="text-4xl">📷</span>
                    </div>
                    <p className="text-gray-400 text-sm">Original Image</p>
                  </div>
                </div>
              </div>

              {/* After Side */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/30 to-accent/30"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-4xl">✨</span>
                    </div>
                    <p className="text-white text-sm">AI Edited</p>
                  </div>
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <GripVertical className="h-5 w-5 text-gray-600" />
                </div>
              </div>

              {/* Hidden Range Input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium">
                Before
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium">
                After
              </div>
            </div>
          </div>

          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-3xl blur-2xl opacity-30" />
        </motion.div>
      </div>
    </section>
  );
}
