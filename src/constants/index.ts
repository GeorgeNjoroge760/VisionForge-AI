import { PricingPlan, StylePresetOption } from "@/types";

export const PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    description: "Perfect for trying out VisionForge AI",
    price: 0,
    interval: "month",
    credits: 5,
    features: [
      "5 image generations",
      "Basic style presets",
      "Standard quality",
      "Web downloads",
    ],
  },
  {
    id: "basic",
    name: "Basic",
    description: "For casual users who want more",
    price: 900,
    interval: "month",
    credits: 100,
    features: [
      "100 generations/month",
      "All style presets",
      "HD quality",
      "Priority support",
      "No watermark",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For professionals and creators",
    price: 1900,
    interval: "month",
    credits: 500,
    popular: true,
    features: [
      "500 generations/month",
      "All style presets",
      "4K quality",
      "Priority support",
      "No watermark",
      "API access",
      "Batch generation",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    description: "For teams and businesses",
    price: 4900,
    interval: "month",
    credits: -1,
    features: [
      "Unlimited generations",
      "All style presets",
      "4K quality",
      "Dedicated support",
      "No watermark",
      "API access",
      "Batch generation",
      "Custom styles",
      "Brand kit",
    ],
  },
];

export const STYLE_PRESETS: StylePresetOption[] = [
  {
    id: "photorealistic",
    name: "Photorealistic",
    description: "Ultra-realistic photo quality",
    icon: "📸",
    prompt: "photorealistic, high detail, 8k resolution, professional photography",
  },
  {
    id: "anime",
    name: "Anime",
    description: "Japanese animation style",
    icon: "🎌",
    prompt: "anime style, studio ghibli inspired, vibrant colors, detailed illustration",
  },
  {
    id: "studio-ghibli",
    name: "Studio Ghibli",
    description: "Magical Ghibli aesthetic",
    icon: "🏡",
    prompt: "studio ghibli style, magical, soft watercolor, whimsical, detailed background",
  },
  {
    id: "oil-painting",
    name: "Oil Painting",
    description: "Classic oil painting style",
    icon: "🎨",
    prompt: "oil painting, classical art, rich textures, dramatic lighting, masterpiece",
  },
  {
    id: "3d-render",
    name: "3D Render",
    description: "Modern 3D render look",
    icon: "🧊",
    prompt: "3d render, octane render, unreal engine 5, ray tracing, high detail",
  },
  {
    id: "pixel-art",
    name: "Pixel Art",
    description: "Retro pixel art style",
    icon: "👾",
    prompt: "pixel art, 16-bit style, retro gaming, detailed sprites, nostalgic",
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Futuristic cyberpunk aesthetic",
    icon: "🌃",
    prompt: "cyberpunk style, neon lights, futuristic, dark atmosphere, high tech",
  },
  {
    id: "fantasy",
    name: "Fantasy",
    description: "Magical fantasy world",
    icon: "🧙",
    prompt: "fantasy art, magical, ethereal glow, epic, detailed environment",
  },
  {
    id: "watercolor",
    name: "Watercolor",
    description: "Soft watercolor painting",
    icon: "💧",
    prompt: "watercolor painting, soft edges, flowing colors, artistic, delicate",
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Professional property photos",
    icon: "🏠",
    prompt: "real estate photography, HDR, wide angle, professional lighting, interior design",
  },
  {
    id: "fashion",
    name: "Fashion",
    description: "High fashion photography",
    icon: "👗",
    prompt: "fashion photography, editorial, studio lighting, high-end, glamorous",
  },
  {
    id: "food-photography",
    name: "Food Photography",
    description: "Appetizing food photos",
    icon: "🍕",
    prompt: "food photography, appetizing, studio lighting, close-up, professional",
  },
  {
    id: "product-photography",
    name: "Product Photography",
    description: "Clean product shots",
    icon: "📦",
    prompt: "product photography, studio setup, white background, professional lighting",
  },
  {
    id: "portrait",
    name: "Portrait",
    description: "Professional headshots",
    icon: "🧑",
    prompt: "portrait photography, professional headshot, studio lighting, bokeh background",
  },
];

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

export const DASHBOARD_NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    title: "New Project",
    href: "/projects/new",
    icon: "Plus",
  },
  {
    title: "History",
    href: "/history",
    icon: "History",
  },
  {
    title: "Favorites",
    href: "/favorites",
    icon: "Heart",
  },
  {
    title: "Collections",
    href: "/collections",
    icon: "FolderOpen",
  },
  {
    title: "Credits",
    href: "/credits",
    icon: "Coins",
  },
  {
    title: "Billing",
    href: "/billing",
    icon: "CreditCard",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "Settings",
  },
];

export const ADMIN_NAV_ITEMS = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "LayoutDashboard",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: "Users",
  },
  {
    title: "Revenue",
    href: "/admin/revenue",
    icon: "DollarSign",
  },
  {
    title: "Generations",
    href: "/admin/generations",
    icon: "Image",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: "BarChart3",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: "Settings",
  },
];

export const PROMPT_SUGGESTIONS = [
  "Remove the background",
  "Turn this into anime",
  "Make it cinematic",
  "Add snow effect",
  "Luxury interior design",
  "Professional LinkedIn photo",
  "Make it look like a painting",
  "Add dramatic lighting",
  "Convert to black and white",
  "Make it look vintage",
  "Add a sunset background",
  "Make it look like a movie poster",
];

export const CREDITS_PER_GENERATION = 1;

export const MAX_FREE_CREDITS = 5;

export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

export const SITE_CONFIG = {
  name: "VisionForge AI",
  description: "Transform any image with AI. Upload a photo, describe your vision, and let AI do the magic.",
  url: process.env.NEXT_PUBLIC_APP_URL || "https://visionforge.ai",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/visionforgeai",
    github: "https://github.com/visionforgeai",
  },
};
