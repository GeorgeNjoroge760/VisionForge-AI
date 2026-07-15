import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const signUpSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase, one lowercase, and one number"
    ),
});

export const projectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(100),
  description: z.string().max(500).optional(),
});

export const promptSchema = z.object({
  prompt: z
    .string()
    .min(1, "Prompt is required")
    .max(1000, "Prompt must be less than 1000 characters"),
  style: z.string().optional(),
  negativePrompt: z.string().max(500).optional(),
});

export const settingsSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  theme: z.enum(["light", "dark", "system"]),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    marketing: z.boolean(),
    generationComplete: z.boolean(),
    weeklyReport: z.boolean(),
  }),
});

export const collectionSchema = z.object({
  name: z.string().min(1, "Collection name is required").max(50),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type PromptInput = z.infer<typeof promptSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
export type CollectionInput = z.infer<typeof collectionSchema>;
