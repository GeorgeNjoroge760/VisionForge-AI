"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  Check,
  Sparkles,
  ArrowRight,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PLANS } from "@/constants";
import { cn } from "@/lib/utils";

export default function BillingPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="text-muted-foreground">
          Manage your subscription and payment methods.
        </p>
      </div>

      {/* Current Plan */}
      <Card className="border-white/10 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-xl">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="info">Current Plan</Badge>
                <h2 className="text-2xl font-bold">Basic Plan</h2>
              </div>
              <p className="text-muted-foreground">
                $9/month • 100 credits per month
              </p>
              <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Renews on January 15, 2026
              </p>
            </div>
            <Button variant="outline">
              Manage Subscription
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
            <div className="flex items-center gap-4">
              <div className="h-12 w-20 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
                <span className="text-white font-bold text-sm">VISA</span>
              </div>
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/2027</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Plans */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Upgrade Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card
                className={cn(
                  "border-white/10 bg-white/5 backdrop-blur-xl h-full",
                  plan.id === "basic" && "border-primary bg-primary/5"
                )}
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-semibold">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="text-3xl font-bold">
                        {plan.price === 0 ? "Free" : `$${plan.price / 100}`}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-muted-foreground">/mo</span>
                      )}
                    </div>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.slice(0, 4).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.id === "basic" ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      variant={plan.popular ? "gradient" : "outline"}
                      className="w-full"
                    >
                      {plan.price === 0 ? "Downgrade" : "Upgrade"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>Your recent invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "Dec 15, 2025", amount: "$9.00", status: "Paid" },
              { date: "Nov 15, 2025", amount: "$9.00", status: "Paid" },
              { date: "Oct 15, 2025", amount: "$9.00", status: "Paid" },
            ].map((invoice, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium">{invoice.amount}</p>
                    <p className="text-sm text-muted-foreground">{invoice.date}</p>
                  </div>
                </div>
                <Badge variant="success">{invoice.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
