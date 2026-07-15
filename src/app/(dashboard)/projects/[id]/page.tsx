"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  Share2,
  Heart,
  Trash2,
  RotateCcw,
  Edit3,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  GripVertical,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import Link from "next/link";

export default function ResultPage() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isFavorited, setIsFavorited] = useState(false);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleDownload = () => {
    toast.success("Download started!");
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Generated Image</h1>
              <p className="text-sm text-muted-foreground">
                Created 2 minutes ago
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleFavorite}>
                  <Heart
                    className={cn(
                      "h-4 w-4",
                      isFavorited && "fill-red-500 text-red-500"
                    )}
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Favorite</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Share2 className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share</TooltipContent>
            </Tooltip>
            <Button variant="gradient" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        {/* Image Comparison */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
              {/* Before Side */}
              <div
                className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto mb-4 rounded-xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                      <span className="text-6xl">📷</span>
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
                    <div className="w-48 h-48 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                      <span className="text-6xl">✨</span>
                    </div>
                    <p className="text-white text-sm">AI Generated</p>
                  </div>
                </div>
              </div>

              {/* Slider Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <GripVertical className="h-6 w-6 text-gray-600" />
                </div>
              </div>

              {/* Hidden Range Input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />

              {/* Labels */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium">
                Before
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-sm font-medium">
                After
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-black/50 backdrop-blur-sm"
                  onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm font-medium bg-black/50 backdrop-blur-sm px-2 py-1 rounded">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-black/50 backdrop-blur-sm"
                  onClick={() => setZoom(Math.min(3, zoom + 0.25))}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-black/50 backdrop-blur-sm"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Prompt */}
          <Card className="md:col-span-2 border-white/10 bg-white/5 backdrop-blur-xl">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Prompt</h3>
              <p className="text-sm text-muted-foreground">
                Remove the background and replace it with a beautiful sunset beach scene
              </p>
              <Separator className="my-4 bg-white/10" />
              <div className="flex items-center gap-2">
                <Badge variant="secondary">Background Removal</Badge>
                <Badge variant="secondary">Style Transfer</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-semibold">Actions</h3>
              <Button variant="outline" className="w-full justify-start">
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Prompt
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <RotateCcw className="h-4 w-4 mr-2" />
                Regenerate
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* More Actions */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download Original
          </Button>
          <Button variant="gradient" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download HD
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
