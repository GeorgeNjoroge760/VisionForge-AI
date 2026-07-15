import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { imageUrl, prompt, style, negativePrompt, projectId } = body;

    if (!imageUrl || !prompt) {
      return NextResponse.json(
        { error: "Image URL and prompt are required" },
        { status: 400 }
      );
    }

    // Enhance prompt based on style
    let enhancedPrompt = prompt;
    if (style) {
      const stylePrompts: Record<string, string> = {
        photorealistic: "photorealistic, high detail, 8k resolution, professional photography",
        anime: "anime style, studio ghibli inspired, vibrant colors, detailed illustration",
        "studio-ghibli": "studio ghibli style, magical, soft watercolor, whimsical, detailed background",
        "oil-painting": "oil painting, classical art, rich textures, dramatic lighting, masterpiece",
        "3d-render": "3d render, octane render, unreal engine 5, ray tracing, high detail",
        "pixel-art": "pixel art, 16-bit style, retro gaming, detailed sprites, nostalgic",
        cyberpunk: "cyberpunk style, neon lights, futuristic, dark atmosphere, high tech",
        fantasy: "fantasy art, magical, ethereal glow, epic, detailed environment",
        watercolor: "watercolor painting, soft edges, flowing colors, artistic, delicate",
        "real-estate": "real estate photography, HDR, wide angle, professional lighting, interior design",
        fashion: "fashion photography, editorial, studio lighting, high-end, glamorous",
        "food-photography": "food photography, appetizing, studio lighting, close-up, professional",
        "product-photography": "product photography, studio setup, white background, professional lighting",
        portrait: "portrait photography, professional headshot, studio lighting, bokeh background",
      };
      enhancedPrompt = `${prompt}, ${stylePrompts[style] || ""}`;
    }

    // Generate image using OpenAI
    const response = await openai.images.edit({
      model: "dall-e-3",
      image: imageUrl,
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
    });

    const generatedUrl = response.data[0].url;

    return NextResponse.json({
      success: true,
      data: {
        id: `img_${Date.now()}`,
        originalUrl: imageUrl,
        generatedUrl,
        prompt,
        enhancedPrompt,
      },
    });
  } catch (error) {
    console.error("Generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate image" },
      { status: 500 }
    );
  }
}
