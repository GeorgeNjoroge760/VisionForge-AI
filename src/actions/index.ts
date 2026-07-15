"use server";

import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function createProject(name: string, description?: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("projects")
    .insert({
      user_id: user.id,
      name,
      description,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard");
  return data;
}

export async function updateProject(
  projectId: string,
  updates: { name?: string; description?: string; status?: string }
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", projectId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard");
  revalidatePath(`/projects/${projectId}`);
  return data;
}

export async function deleteProject(projectId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", projectId);

  if (error) {
    throw error;
  }

  revalidatePath("/dashboard");
  revalidatePath("/history");
}

export async function getUserProjects() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*, images(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
}

export async function getProject(projectId: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*, images(*)")
    .eq("id", projectId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function toggleFavorite(imageId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_id", userId)
    .single();

  if (!user) {
    throw new Error("User not found");
  }

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("image_id", imageId)
    .single();

  if (existing) {
    await supabase.from("favorites").delete().eq("id", existing.id);
  } else {
    await supabase.from("favorites").insert({
      user_id: user.id,
      image_id: imageId,
    });
  }

  revalidatePath("/favorites");
}

export async function getUserCredits() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { data, error } = await supabase
    .from("users")
    .select("credits, plan")
    .eq("clerk_id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deductCredit() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const { data: user } = await supabase
    .from("users")
    .select("id, credits")
    .eq("clerk_id", userId)
    .single();

  if (!user) {
    throw new Error("User not found");
  }

  if (user.credits <= 0) {
    throw new Error("No credits remaining");
  }

  const { error } = await supabase
    .from("users")
    .update({ credits: user.credits - 1 })
    .eq("id", user.id);

  if (error) {
    throw error;
  }

  await supabase.from("credit_transactions").insert({
    user_id: user.id,
    amount: -1,
    type: "usage",
    description: "Image generation",
  });

  revalidatePath("/credits");
  revalidatePath("/dashboard");
}
