"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  ExternalLink,
  Copy,
  Settings,
  Image as ImageIcon,
  Heart,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function ProfilePage() {
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://visionforge.ai/u/johndoe");
    toast.success("Profile link copied!");
  };

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-muted-foreground">
          Manage your public profile and information.
        </p>
      </div>

      {/* Profile Card */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt="User" />
              <AvatarFallback className="bg-primary/20 text-primary text-2xl">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">john@example.com</p>
              <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
                <Badge variant="info">Pro Plan</Badge>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Joined Oct 2025
                </span>
              </div>
            </div>
            <Link href="/settings">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Public Profile Link */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Public Profile
          </CardTitle>
          <CardDescription>
            Share your profile with others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <code className="flex-1 p-3 rounded-lg bg-white/5 text-sm">
              visionforge.ai/u/johndoe
            </code>
            <Button variant="outline" size="icon" onClick={handleCopyLink}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <ImageIcon className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">127</p>
            <p className="text-sm text-muted-foreground">Images</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 mx-auto mb-2 text-red-500" />
            <p className="text-2xl font-bold">24</p>
            <p className="text-sm text-muted-foreground">Favorites</p>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-6 text-center">
            <FolderOpen className="h-8 w-8 mx-auto mb-2 text-secondary" />
            <p className="text-2xl font-bold">4</p>
            <p className="text-sm text-muted-foreground">Collections</p>
          </CardContent>
        </Card>
      </div>

      {/* Bio */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Bio</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Product designer and photographer passionate about AI-powered creative tools.
            Always experimenting with new styles and techniques.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
