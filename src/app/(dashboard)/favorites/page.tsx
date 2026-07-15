"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  Image as ImageIcon,
  Download,
  Share2,
  Trash2,
  Grid,
  List,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const mockFavorites = [
  {
    id: "1",
    name: "Product Shot Enhancement",
    prompt: "Make it look professional with studio lighting",
    createdAt: "2 hours ago",
  },
  {
    id: "3",
    name: "Background Removal",
    prompt: "Remove the background and replace with gradient",
    createdAt: "1 day ago",
  },
  {
    id: "6",
    name: "Food Photography",
    prompt: "Make it look like professional food photography",
    createdAt: "4 days ago",
  },
];

export default function FavoritesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Favorites</h1>
          <p className="text-muted-foreground">
            Your favorite generations in one place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {mockFavorites.length === 0 ? (
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-12 text-center">
            <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">
              Start favoriting your best generations to see them here.
            </p>
            <Link href="/history">
              <Button variant="outline">View History</Button>
            </Link>
          </CardContent>
        </Card>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockFavorites.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Link href={`/projects/${item.id}`}>
                <Card className="group border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center relative">
                    <ImageIcon className="h-12 w-12 text-white/30" />
                    <div className="absolute top-2 right-2">
                      <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {item.prompt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {mockFavorites.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <Link href={`/projects/${item.id}`}>
                <Card className="group border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center shrink-0">
                        <ImageIcon className="h-8 w-8 text-white/30" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {item.prompt}
                        </p>
                      </div>
                      <Heart className="h-5 w-5 fill-red-500 text-red-500 shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
