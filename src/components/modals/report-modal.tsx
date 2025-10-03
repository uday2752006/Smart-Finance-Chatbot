"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download } from "lucide-react";
import { MonthlyExpenseChart } from "../dashboard/charts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

export function ReportModal() {
  // Mock data for the report
  const reportData = {
    period: "June 2024",
    income: 5000,
    expenses: 3578,
    savings: 1422,
    insights: [
      "Your spending on 'Food' was 15% higher than last month.",
      "You met your savings goal for this month. Great job!",
      "Consider reviewing your 'Entertainment' subscriptions to find potential savings.",
    ],
  };

  const formatted = (amount: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  return (
    <DialogContent className="sm:max-w-[725px]">
      <DialogHeader>
        <DialogTitle className="font-headline">Monthly Financial Report</DialogTitle>
        <DialogDescription>
          A summary of your financial activity for {reportData.period}.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Income</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{formatted(reportData.income)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold">{formatted(reportData.expenses)}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Savings</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-2xl font-bold text-green-500">{formatted(reportData.savings)}</p>
                </CardContent>
            </Card>
        </div>
        
        <Separator />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="font-semibold mb-2">Expense Distribution</h3>
                <MonthlyExpenseChart />
            </div>
            <div>
                <h3 className="font-semibold mb-2">Key Insights</h3>
                <ul className="space-y-3 list-disc list-inside text-sm text-muted-foreground">
                    {reportData.insights.map((insight, index) => <li key={index}>{insight}</li>)}
                </ul>
            </div>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => alert("Downloading PDF...")}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
