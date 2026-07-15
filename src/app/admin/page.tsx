"use client";

import { motion } from "framer-motion";
import {
  Users,
  Image as ImageIcon,
  DollarSign,
  TrendingUp,
  Activity,
  CreditCard,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+234 this week",
    icon: Users,
    trend: "up",
  },
  {
    title: "Total Generations",
    value: "89,432",
    change: "+1,234 this week",
    icon: ImageIcon,
    trend: "up",
  },
  {
    title: "Revenue",
    value: "$24,891",
    change: "+$2,341 this month",
    icon: DollarSign,
    trend: "up",
  },
  {
    title: "Active Subscriptions",
    value: "3,421",
    change: "+89 this week",
    icon: CreditCard,
    trend: "up",
  },
];

const recentActivity = [
  {
    user: "Sarah Chen",
    action: "Created new project",
    time: "2 minutes ago",
    type: "project",
  },
  {
    user: "Marcus Johnson",
    action: "Upgraded to Pro plan",
    time: "5 minutes ago",
    type: "subscription",
  },
  {
    user: "Emily Rodriguez",
    action: "Generated 10 images",
    time: "10 minutes ago",
    type: "generation",
  },
  {
    user: "David Kim",
    action: "Created account",
    time: "15 minutes ago",
    type: "signup",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your platform metrics and activity.
        </p>
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
                    <p className="text-xs text-green-500 mt-1">{stat.change}</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Platform Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "API Uptime", value: "99.9%", status: "success" },
                { label: "Avg. Generation Time", value: "4.2s", status: "success" },
                { label: "Error Rate", value: "0.3%", status: "success" },
                { label: "Active Sessions", value: "1,234", status: "info" },
                { label: "Storage Used", value: "2.4 TB", status: "warning" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                >
                  <span className="text-sm">{item.label}</span>
                  <Badge variant={item.status as "success" | "info" | "warning"}>
                    {item.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
