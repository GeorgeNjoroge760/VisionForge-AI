import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const openaiConfig = {
  apiKey: process.env.OPENAI_API_KEY,
};

export const siteConfig = {
  name: "VisionForge AI",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
};
