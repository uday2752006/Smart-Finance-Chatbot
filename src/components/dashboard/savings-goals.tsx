
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Laptop, Plane, Smartphone, Home, Car } from "lucide-react";
import Image from "next/image";

const goals = [
  {
    name: "New Gaming Laptop",
    target: 150000,
    saved: 95000,
    icon: Laptop,
    image: "/goals/laptop.jpg",
    imageHint: "gaming laptop"
  },
  {
    name: "Goa Trip",
    target: 40000,
    saved: 15000,
    icon: Plane,
    image: "/goals/trip.jpg",
    imageHint: "beach holiday"
  },
  {
    name: "Latest Smartphone",
    target: 80000,
    saved: 60000,
    icon: Smartphone,
    image: "/goals/phone.jpg",
    imageHint: "new smartphone"
  },
];

export function SavingsGoals() {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Savings Goals</CardTitle>
        <CardDescription>
          Track your progress towards your financial goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {goals.map((goal, index) => {
          const progress = (goal.saved / goal.target) * 100;
          return (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:w-32 h-24 rounded-lg overflow-hidden">
                    <Image
                        src={`https://picsum.photos/seed/${index+10}/300/200`}
                        alt={goal.name}
                        fill
                        className="object-cover"
                        data-ai-hint={goal.imageHint}
                    />
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <goal.icon className="w-8 h-8 text-white" />
                    </div>
                </div>
              <div className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold">{goal.name}</h4>
                  <span className="text-sm font-medium text-primary">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                  <span>{formatCurrency(goal.saved)}</span>
                  <span>{formatCurrency(goal.target)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
