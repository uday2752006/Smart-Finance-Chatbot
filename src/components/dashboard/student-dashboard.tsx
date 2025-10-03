'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Hotel,
  Sandwich,
  Users,
  Utensils,
  TramFront,
  GraduationCap,
} from 'lucide-react';
import { ExpensesVsAllowanceChart, FeePaymentStatusChart } from './charts';
import { useToast } from '@/hooks/use-toast';

export function StudentUserDashboard() {
  const { toast } = useToast();

  const summaryData = [
    {
      title: 'Monthly Allowance',
      value: '₹8,000',
      change: '+1.2%',
      changeType: 'increase',
    },
    {
      title: 'Monthly Expenses',
      value: '₹6,240',
      change: '+5.4%',
      changeType: 'increase',
    },
    {
      title: 'Monthly Savings',
      value: '₹1,760',
      change: '-2.1%',
      changeType: 'decrease',
    },
  ];

  const quickExpenseActions = [
    { label: 'Stationery', icon: BookOpen },
    { label: 'Tuition Fee', icon: GraduationCap },
    { label: 'Hostel Fee', icon: Hotel },
    { label: 'Group Event', icon: Users },
  ];

  const financialTips = [
    {
      title: 'Food Savings',
      content: 'Cook your own meals instead of eating out.',
      icon: Utensils,
      hint: 'cooking home',
    },
    {
      title: 'Transport',
      content: 'Use public transport or walk/cycle for short distances.',
      icon: TramFront,
      hint: 'public transport',
    },
    {
      title: 'Textbooks',
      content: 'Buy second-hand textbooks or use library resources.',
      icon: BookOpen,
      hint: 'used books',
    },
    {
      title: 'Savings',
      content: 'Set a weekly savings goal, no matter how small.',
      icon: Sandwich,
      hint: 'piggy bank',
    },
  ];

  const handleQuickActionClick = (label: string) => {
    toast({
      title: 'Expense Logged',
      description: `${label} expense has been logged.`,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 md:grid-cols-3">
        {summaryData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {item.changeType === 'increase' ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={
                    item.changeType === 'increase'
                      ? 'text-green-500'
                      : 'text-red-500'
                  }
                >
                  {item.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Expenses vs Allowance</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpensesVsAllowanceChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Fee Payment Status</CardTitle>
          </CardHeader>
          <CardContent>
            <FeePaymentStatusChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Expense Actions</CardTitle>
          <CardDescription>
            Quickly log your common expenses.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          {quickExpenseActions.map(action => (
            <Button
              key={action.label}
              variant="outline"
              onClick={() => handleQuickActionClick(action.label)}
            >
              <action.icon className="mr-2 h-4 w-4" />
              {action.label}
            </Button>
          ))}
        </CardContent>
      </Card>

      <div>
        <h2 className="text-2xl font-bold tracking-tight font-headline mb-4">
          Financial Tips
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {financialTips.map(tip => (
            <Card key={tip.title} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4 space-y-0">
                <div className="bg-primary/10 p-3 rounded-full">
                  <tip.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>{tip.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground">{tip.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
