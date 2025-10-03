"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MonthlyExpenseChart,
  SpendingTrendsChart,
  IncomeVsExpensesChart,
  SavingsProgressChart,
  SixMonthTrendChart,
  CategoryTrendsChart,
  SavingsProjectionChart,
  InvestmentGrowthChart,
} from "./charts";

export function NormalUserDashboard({ balance }: { balance: number }) {
  const monthlyExpenses = balance * 0.7; // Example calculation
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Dashboard</CardTitle>
        <CardDescription>
          An overview of your financial activity. Current balance: {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(balance)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="projections">Projections</TabsTrigger>
          </TabsList>
          
          <TabsContent value="expenses" className="mt-4">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Expense Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <MonthlyExpenseChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Spending Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <SpendingTrendsChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analysis" className="mt-4">
             <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Income vs Expenses</CardTitle>
                </CardHeader>
                <CardContent>
                  <IncomeVsExpensesChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Savings Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <SavingsProgressChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="trends" className="mt-4">
             <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>6-Month Trend Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <SixMonthTrendChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Category Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <CategoryTrendsChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="projections" className="mt-4">
             <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Savings Projection</CardTitle>
                </CardHeader>
                <CardContent>
                  <SavingsProjectionChart />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Investment Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <InvestmentGrowthChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
