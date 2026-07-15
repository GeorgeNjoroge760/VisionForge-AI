"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Coins,
  Gift,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Sparkles,
  CreditCard,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PLANS } from "@/constants";

const transactions = [
  {
    id: "1",
    type: "usage",
    amount: -1,
    description: "Image generation - Product Shot",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    type: "usage",
    amount: -1,
    description: "Image generation - Anime Style",
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    type: "purchase",
    amount: 100,
    description: "Basic Plan - Monthly Subscription",
    createdAt: "1 week ago",
  },
  {
    id: "4",
    type: "bonus",
    amount: 10,
    description: "Referral Bonus - Friend signed up",
    createdAt: "2 weeks ago",
  },
  {
    id: "5",
    type: "usage",
    amount: -1,
    description: "Image generation - Background Removal",
    createdAt: "2 weeks ago",
  },
];

export default function CreditsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Credits</h1>
        <p className="text-muted-foreground">
          Manage your credits and view usage history.
        </p>
      </div>

      {/* Credit Balance */}
      <Card className="border-white/10 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground mb-2">Current Balance</p>
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-bold">89</span>
                <span className="text-2xl text-muted-foreground">credits</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                of 100 monthly credits remaining
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/pricing">
                <Button variant="gradient" size="lg">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Buy More Credits
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <Gift className="h-5 w-5 mr-2" />
                Refer a Friend
              </Button>
            </div>
          </div>

          {/* Usage Bar */}
          <div className="mt-8">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Monthly Usage</span>
              <span className="font-medium">11 / 100</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "11%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-2xl font-bold mt-1">11</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Used</p>
                <p className="text-2xl font-bold mt-1">127</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Earned Free</p>
                <p className="text-2xl font-bold mt-1">10</p>
              </div>
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Gift className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent credit transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      transaction.amount > 0
                        ? "bg-green-500/10"
                        : "bg-red-500/10"
                    }`}
                  >
                    {transaction.amount > 0 ? (
                      <ArrowUpRight className="h-5 w-5 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {transaction.createdAt}
                    </p>
                  </div>
                </div>
                <span
                  className={`font-semibold ${
                    transaction.amount > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
