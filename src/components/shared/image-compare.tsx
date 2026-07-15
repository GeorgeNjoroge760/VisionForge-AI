"use client";

import { forwardRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageCompareProps {
  firstImage: string;
  secondImage: string;
  firstImageLabel?: string;
  secondImageLabel?: string;
  className?: string;
}

export const ImageCompare = forwardRef<HTMLDivElement, ImageCompareProps>(
  (
    {
      firstImage,
      secondImage,
      firstImageLabel = "Before",
      secondImageLabel = "After",
      className,
    },
    ref
  ) => {
    const [sliderPosition, setSliderPosition] = useState(50);

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl border border-white/10",
          className
        )}
      >
        {/* First Image (Before) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={firstImage}
            alt={firstImageLabel}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Second Image (After) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src={secondImage}
            alt={secondImageLabel}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 z-10"
        />

        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white z-5"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center">
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium z-5">
          {firstImageLabel}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium z-5">
          {secondImageLabel}
        </div>
      </div>
    );
  }
);

ImageCompare.displayName = "ImageCompare";
