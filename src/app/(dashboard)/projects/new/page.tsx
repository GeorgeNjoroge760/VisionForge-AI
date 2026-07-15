"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import {
  Upload,
  Image as ImageIcon,
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Wand2,
  Loader2,
  Check,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, formatFileSize } from "@/lib/utils";
import { STYLE_PRESETS, PROMPT_SUGGESTIONS, ACCEPTED_IMAGE_TYPES, MAX_IMAGE_SIZE } from "@/constants";
import { StylePreset } from "@/types";
import { toast } from "sonner";

type Step = 1 | 2 | 3;

export default function NewProjectPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<StylePreset | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error("File too large. Maximum size is 10MB.");
        return;
      }
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setStep(2);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    maxSize: MAX_IMAGE_SIZE,
  });

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsGenerating(true);
    setStep(3);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile!);

      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.error || "Upload failed");
      }

      const generateRes = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageUrl: uploadData.data.url,
          prompt,
          style: selectedStyle,
        }),
      });

      const generateData = await generateRes.json();

      if (!generateRes.ok) {
        throw new Error(generateData.error || "Generation failed");
      }

      toast.success("Image generated successfully!");
      router.push("/projects/demo-result");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
      setStep(2);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setPreviewUrl(null);
    setStep(1);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">New Project</h1>
        <p className="text-muted-foreground">
          Upload an image and describe how you want it transformed.
        </p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-center gap-4">
        {[
          { step: 1, label: "Upload" },
          { step: 2, label: "Prompt" },
          { step: 3, label: "Generate" },
        ].map((s) => (
          <div key={s.step} className="flex items-center gap-2">
            <div
              className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors",
                step >= s.step
                  ? "bg-primary text-white"
                  : "bg-white/10 text-muted-foreground"
              )}
            >
              {step > s.step ? (
                <Check className="h-4 w-4" />
              ) : (
                s.step
              )}
            </div>
            <span
              className={cn(
                "text-sm font-medium",
                step >= s.step ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {s.label}
            </span>
            {s.step < 3 && (
              <div
                className={cn(
                  "w-16 h-0.5 mx-2",
                  step > s.step ? "bg-primary" : "bg-white/10"
                )}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {/* Step 1: Upload */}
        {step === 1 && (
          <motion.div
            key="step-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-8">
                <div
                  {...getRootProps()}
                  className={cn(
                    "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all",
                    isDragActive
                      ? "border-primary bg-primary/5"
                      : "border-white/20 hover:border-white/30 hover:bg-white/5"
                  )}
                >
                  <input {...getInputProps()} />
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className={cn(
                        "h-16 w-16 rounded-2xl flex items-center justify-center transition-colors",
                        isDragActive ? "bg-primary/20" : "bg-white/10"
                      )}
                    >
                      <Upload
                        className={cn(
                          "h-8 w-8 transition-colors",
                          isDragActive ? "text-primary" : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <div>
                      <p className="text-lg font-medium">
                        {isDragActive
                          ? "Drop your image here"
                          : "Drag & drop your image here"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        or click to browse
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Info className="h-4 w-4" />
                      <span>Supports PNG, JPEG, WebP • Max 10MB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 2: Prompt */}
        {step === 2 && (
          <motion.div
            key="step-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Image Preview */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-white/10">
                    {previewUrl && (
                      <img
                        src={previewUrl}
                        alt="Uploaded"
                        className="h-full w-full object-cover"
                      />
                    )}
                    <button
                      onClick={handleRemoveFile}
                      className="absolute top-1 right-1 h-6 w-6 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium truncate">{uploadedFile?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {uploadedFile && formatFileSize(uploadedFile.size)}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                    Change
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Prompt Input */}
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Describe Your Vision
                </CardTitle>
                <CardDescription>
                  Tell AI what you want to do with the image. Be as descriptive as you like.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Prompt</Label>
                  <Textarea
                    id="prompt"
                    placeholder="e.g., Remove the background and replace it with a sunset beach scene..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px] bg-white/5 border-white/10"
                  />
                </div>

                {/* Prompt Suggestions */}
                <div className="space-y-2">
                  <Label>Quick Suggestions</Label>
                  <div className="flex flex-wrap gap-2">
                    {PROMPT_SUGGESTIONS.slice(0, 6).map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setPrompt(suggestion)}
                        className={cn(
                          "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                          prompt === suggestion
                            ? "bg-primary text-white"
                            : "bg-white/10 text-muted-foreground hover:bg-white/20"
                        )}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Style Presets */}
                <div className="space-y-2">
                  <Label>Style Preset (Optional)</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {STYLE_PRESETS.slice(0, 8).map((style) => (
                      <button
                        key={style.id}
                        onClick={() =>
                          setSelectedStyle(
                            selectedStyle === style.id ? null : style.id
                          )
                        }
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-xl text-left transition-all",
                          selectedStyle === style.id
                            ? "bg-primary/20 border border-primary"
                            : "bg-white/5 border border-white/10 hover:bg-white/10"
                        )}
                      >
                        <span className="text-xl">{style.icon}</span>
                        <span className="text-sm font-medium">{style.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                  <Button variant="ghost" onClick={() => setStep(1)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    variant="gradient"
                    onClick={handleGenerate}
                    disabled={!prompt.trim()}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Generating */}
        {step === 3 && (
          <motion.div
            key="step-3"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-12">
                <div className="flex flex-col items-center gap-6 text-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                      {isGenerating ? (
                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                      ) : (
                        <Check className="h-12 w-12 text-green-500" />
                      )}
                    </div>
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {isGenerating ? "Generating your image..." : "Generation Complete!"}
                    </h3>
                    <p className="text-muted-foreground">
                      {isGenerating
                        ? "Our AI is working its magic. This usually takes 3-5 seconds."
                        : "Your transformed image is ready."}
                    </p>
                  </div>

                  {isGenerating && (
                    <div className="w-full max-w-xs">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-secondary"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 3, ease: "easeInOut" }}
                        />
                      </div>
                    </div>
                  )}

                  {!isGenerating && (
                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        New Project
                      </Button>
                      <Button variant="gradient">
                        View Result
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
