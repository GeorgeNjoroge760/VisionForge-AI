"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Search,
  Filter,
  Image as ImageIcon,
  Clock,
  MoreVertical,
  Heart,
  Download,
  Trash2,
  Grid,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const mockHistory = [
  {
    id: "1",
    name: "Product Shot Enhancement",
    prompt: "Make it look professional with studio lighting",
    status: "completed",
    createdAt: "2 hours ago",
    isFavorite: true,
  },
  {
    id: "2",
    name: "Anime Style Conversion",
    prompt: "Turn this into anime style illustration",
    status: "completed",
    createdAt: "5 hours ago",
    isFavorite: false,
  },
  {
    id: "3",
    name: "Background Removal",
    prompt: "Remove the background and replace with gradient",
    status: "completed",
    createdAt: "1 day ago",
    isFavorite: true,
  },
  {
    id: "4",
    name: "Landscape Enhancement",
    prompt: "Make it look like a professional landscape photo",
    status: "completed",
    createdAt: "2 days ago",
    isFavorite: false,
  },
  {
    id: "5",
    name: "Portrait Retouching",
    prompt: "Professional headshot with bokeh background",
    status: "completed",
    createdAt: "3 days ago",
    isFavorite: false,
  },
  {
    id: "6",
    name: "Food Photography",
    prompt: "Make it look like professional food photography",
    status: "completed",
    createdAt: "4 days ago",
    isFavorite: true,
  },
];

export default function HistoryPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = mockHistory.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.prompt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">History</h1>
          <p className="text-muted-foreground">
            View all your previous generations.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search history..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/5 border-white/10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
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

      {/* Content */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHistory.map((item, index) => (
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-black/50 backdrop-blur-sm"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <Heart
                          className={cn(
                            "h-4 w-4",
                            item.isFavorite && "fill-red-500 text-red-500"
                          )}
                        />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium truncate group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate mt-1">
                      {item.prompt}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <Badge variant="success" className="text-xs">
                        {item.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.createdAt}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filteredHistory.map((item, index) => (
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
                      <div className="flex items-center gap-4 shrink-0">
                        <Badge variant="success" className="text-xs hidden sm:flex">
                          {item.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1 hidden sm:flex">
                          <Clock className="h-3 w-3" />
                          {item.createdAt}
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={(e) => e.preventDefault()}
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Heart className="h-4 w-4 mr-2" />
                              {item.isFavorite ? "Unfavorite" : "Favorite"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
