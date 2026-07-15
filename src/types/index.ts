export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  avatar?: string;
  credits: number;
  plan: Plan;
  createdAt: string;
  updatedAt: string;
}

export type Plan = "free" | "basic" | "pro" | "unlimited";

export interface Project {
  id: string;
  userId: string;
  name: string;
  description?: string;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  images: Image[];
}

export type ProjectStatus = "draft" | "processing" | "completed" | "failed";

export interface Image {
  id: string;
  projectId: string;
  originalUrl: string;
  generatedUrl?: string;
  prompt: string;
  enhancedPrompt?: string;
  negativePrompt?: string;
  style?: StylePreset;
  status: ImageStatus;
  createdAt: string;
}

export type ImageStatus = "pending" | "processing" | "completed" | "failed";

export type StylePreset =
  | "photorealistic"
  | "anime"
  | "studio-ghibli"
  | "oil-painting"
  | "3d-render"
  | "pixel-art"
  | "cyberpunk"
  | "fantasy"
  | "watercolor"
  | "real-estate"
  | "fashion"
  | "food-photography"
  | "product-photography"
  | "portrait";

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: CreditType;
  description: string;
  createdAt: string;
}

export type CreditType = "purchase" | "usage" | "bonus" | "refund" | "subscription";

export interface Subscription {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  plan: Plan;
  status: SubscriptionStatus;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

export type SubscriptionStatus =
  | "active"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "past_due"
  | "unpaid"
  | "trialing";

export interface PricingPlan {
  id: Plan;
  name: string;
  description: string;
  price: number;
  interval: "month" | "year";
  credits: number;
  features: string[];
  popular?: boolean;
  stripePriceId?: string;
}

export interface StylePresetOption {
  id: StylePreset;
  name: string;
  description: string;
  icon: string;
  prompt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}

export type NotificationType = "info" | "success" | "warning" | "error";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface GenerateImageRequest {
  imageUrl: string;
  prompt: string;
  style?: StylePreset;
  negativePrompt?: string;
  projectId?: string;
}

export interface GenerateImageResponse {
  id: string;
  originalUrl: string;
  generatedUrl: string;
  prompt: string;
  enhancedPrompt?: string;
}
