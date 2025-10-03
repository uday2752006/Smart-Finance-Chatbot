
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Laptop, Plane, Smartphone, CirclePlus, ShoppingCart, Gift } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useToast } from "@/hooks/use-toast";

const initialGoals = [
  {
    id: 1,
    name: "New Gaming Laptop",
    target: 150000,
    saved: 95000,
    icon: Laptop,
    imageHint: "gaming laptop",
  },
  {
    id: 2,
    name: "Goa Trip",
    target: 40000,
    saved: 15000,
    icon: Plane,
    imageHint: "beach holiday",
  },
  {
    id: 3,
    name: "Latest Smartphone",
    target: 80000,
    saved: 60000,
    icon: Smartphone,
    imageHint: "new smartphone",
  },
];

const goalSchema = z.object({
  name: z.string().min(1, "Goal name is required."),
  target: z.coerce.number().min(1, "Target amount must be greater than 0."),
  saved: z.coerce.number().min(0, "Saved amount must be positive."),
});

type GoalFormValues = z.infer<typeof goalSchema>;

export function SavingsGoals() {
  const [goals, setGoals] = useState(initialGoals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: "",
      target: 1000,
      saved: 0,
    },
  });

  const onSubmit = (values: GoalFormValues) => {
    const newGoal = {
      id: Date.now(),
      ...values,
      icon: getIconForGoal(values.name),
      imageHint: values.name.toLowerCase().split(' ').slice(0, 2).join(' ')
    };
    setGoals([...goals, newGoal]);
    toast({
      title: "Goal Added!",
      description: `Your new savings goal "${values.name}" has been added.`,
    });
    form.reset();
    setIsDialogOpen(false);
  };
  
  const getIconForGoal = (name: string) => {
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes('laptop') || lowerCaseName.includes('computer')) return Laptop;
    if (lowerCaseName.includes('trip') || lowerCaseName.includes('vacation') || lowerCaseName.includes('holiday')) return Plane;
    if (lowerCaseName.includes('phone') || lowerCaseName.includes('mobile')) return Smartphone;
    if (lowerCaseName.includes('car')) return ShoppingCart;
    return Gift;
  }

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
            <div key={goal.id} className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-full sm:w-32 h-24 rounded-lg overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${goal.id}/300/200`}
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
      <CardFooter>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full">
              <CirclePlus className="mr-2 h-4 w-4" />
              Add New Goal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Savings Goal</DialogTitle>
              <DialogDescription>
                What are you saving up for?
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal Name</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., New Watch" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="target"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Target Amount (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 25000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="saved"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Already Saved (₹)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 5000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Add Goal</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
