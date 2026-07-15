"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Plus,
  Image as ImageIcon,
  Coins,
  TrendingUp,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Generations",
    value: "127",
    change: "+12 this week",
    icon: ImageIcon,
    trend: "up",
  },
  {
    title: "Credits Remaining",
    value: "89",
    change: "of 100",
    icon: Coins,
    trend: "neutral",
  },
  {
    title: "Success Rate",
    value: "98.5%",
    change: "+2.3%",
    icon: TrendingUp,
    trend: "up",
  },
  {
    title: "Avg. Generation Time",
    value: "4.2s",
    change: "-0.8s",
    icon: Clock,
    trend: "up",
  },
];

const recentProjects = [
  {
    id: "1",
    name: "Product Shot Enhancement",
    status: "completed",
    createdAt: "2 hours ago",
    prompt: "Make it look professional with studio lighting",
  },
  {
    id: "2",
    name: "Anime Style Conversion",
    status: "completed",
    createdAt: "5 hours ago",
    prompt: "Turn this into anime style illustration",
  },
  {
    id: "3",
    name: "Background Removal",
    status: "processing",
    createdAt: "10 minutes ago",
    prompt: "Remove the background and replace with gradient",
  },
];

const quickActions = [
  {
    title: "New Project",
    description: "Start a new image editing project",
    icon: Plus,
    href: "/projects/new",
    gradient: "from-primary to-secondary",
  },
  {
    title: "Remove Background",
    description: "Quickly remove image backgrounds",
    icon: Sparkles,
    href: "/projects/new?preset=background-removal",
    gradient: "from-secondary to-accent",
  },
  {
    title: "Style Transfer",
    description: "Apply artistic styles to images",
    icon: ImageIcon,
    href: "/projects/new?preset=style-transfer",
    gradient: "from-accent to-primary",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your account.
          </p>
        </div>
        <Link href="/projects/new">
          <Button variant="gradient">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            >
              <Link href={action.href}>
                <Card className="group border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Projects</h2>
          <Link href="/history">
            <Button variant="ghost" size="sm">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {recentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
            >
              <Link href={`/projects/${project.id}`}>
                <Card className="group border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {project.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {project.prompt}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          variant={project.status === "completed" ? "success" : "info"}
                        >
                          {project.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {project.createdAt}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
