"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { chatbotSuggestsBudgetPlan } from "@/ai/flows/chatbot-suggests-budget-plan";
import { Loader } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Card, CardContent } from "../ui/card";

const budgetSchema = z.object({
  monthlyIncome: z.coerce.number().min(1, "Monthly income is required."),
  monthlyExpenses: z.coerce.number().min(0, "Monthly expenses must be positive."),
});

type BudgetFormValues = z.infer<typeof budgetSchema>;

export function BudgetPlannerModal() {
  const [budgetPlan, setBudgetPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      monthlyIncome: 5000,
      monthlyExpenses: 3500,
    },
  });

  const onSubmit = async (values: BudgetFormValues) => {
    setIsLoading(true);
    setBudgetPlan(null);
    try {
      const result = await chatbotSuggestsBudgetPlan(values);
      setBudgetPlan(result.budgetPlan);
    } catch (error) {
      console.error("Failed to generate budget plan:", error);
      setBudgetPlan("Sorry, there was an error generating your budget plan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle className="font-headline">Budget Planner</DialogTitle>
        <DialogDescription>
          Enter your income and expenses to generate a personalized budget.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        {budgetPlan ? (
          <div className="space-y-4">
            <h3 className="font-semibold">Your Generated Budget Plan:</h3>
            <Card>
              <ScrollArea className="h-72">
                <CardContent className="pt-6 text-sm whitespace-pre-wrap">
                  {budgetPlan}
                </CardContent>
              </ScrollArea>
            </Card>
            <Button variant="outline" onClick={() => setBudgetPlan(null)}>Create a new plan</Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monthly Income ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 5000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="monthlyExpenses"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Monthly Expenses ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 3500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                  Generate Budget Plan
                </Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </div>
    </DialogContent>
  );
}
