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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const savingsSchema = z.object({
  currentSavings: z.coerce.number().min(0),
  monthlyContribution: z.coerce.number().min(0),
  interestRate: z.coerce.number().min(0).max(100),
  projectionPeriod: z.coerce.number().int().min(1).max(30),
});

type SavingsFormValues = z.infer<typeof savingsSchema>;
type ProjectionData = { year: number; savings: number };

export function SavingsProjectorModal() {
  const [projection, setProjection] = useState<ProjectionData[] | null>(null);

  const form = useForm<SavingsFormValues>({
    resolver: zodResolver(savingsSchema),
    defaultValues: {
      currentSavings: 10000,
      monthlyContribution: 500,
      interestRate: 5,
      projectionPeriod: 10,
    },
  });

  const onSubmit = (values: SavingsFormValues) => {
    const { currentSavings, monthlyContribution, interestRate, projectionPeriod } = values;
    const monthlyRate = interestRate / 100 / 12;
    const data: ProjectionData[] = [];
    let futureValue = currentSavings;

    for (let i = 0; i <= projectionPeriod; i++) {
        data.push({ year: i, savings: Math.round(futureValue) });
        for (let j = 0; j < 12; j++) {
            futureValue = (futureValue + monthlyContribution) * (1 + monthlyRate);
        }
    }
    setProjection(data);
  };

  const finalAmount = projection ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(projection[projection.length - 1].savings) : '$0';

  return (
    <DialogContent className="sm:max-w-[625px]">
      <DialogHeader>
        <DialogTitle className="font-headline">Savings Projector</DialogTitle>
        <DialogDescription>
          Project your savings growth over time.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        {projection ? (
          <div className="space-y-4">
            <h3 className="font-semibold">Your Savings Projection:</h3>
            <p>After {form.getValues('projectionPeriod')} years, your projected savings will be <span className="font-bold text-primary">{finalAmount}</span>.</p>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={projection}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="year" stroke="hsl(var(--foreground))" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                    <YAxis stroke="hsl(var(--foreground))" tickFormatter={(value) => `$${value/1000}k`} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} formatter={(value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)} />
                    <Legend />
                    <Line type="monotone" dataKey="savings" stroke="hsl(var(--primary))" name="Projected Savings" />
                </LineChart>
            </ResponsiveContainer>
            <Button variant="outline" onClick={() => setProjection(null)}>New Projection</Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField name="currentSavings" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Current Savings ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="monthlyContribution" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Monthly Contribution ($)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="interestRate" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Annual Interest Rate (%)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <FormField name="projectionPeriod" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Projection Period (Years)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
              <DialogFooter className="col-span-1 md:col-span-2">
                <Button type="submit">Calculate Projection</Button>
              </DialogFooter>
            </form>
          </Form>
        )}
      </div>
    </DialogContent>
  );
}
