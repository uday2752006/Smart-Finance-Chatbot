"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  RadialBarChart,
  RadialBar,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"];

// For Normal User Dashboard
export function MonthlyExpenseChart() {
  const data = [
    { name: "Housing", value: 1200 },
    { name: "Food", value: 450 },
    { name: "Transport", value: 250 },
    { name: "Utilities", value: 180 },
    { name: "Entertainment", value: 300 },
    { name: "Other", value: 200 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `$${value}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function SpendingTrendsChart() {
  const data = [
    { name: "Jan", Spending: 2400 },
    { name: "Feb", Spending: 2210 },
    { name: "Mar", Spending: 2290 },
    { name: "Apr", Spending: 2000 },
    { name: "May", Spending: 2181 },
    { name: "Jun", Spending: 2500 },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
        <YAxis stroke="hsl(var(--foreground))" />
        <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
        <Legend />
        <Line type="monotone" dataKey="Spending" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function IncomeVsExpensesChart() {
    const data = [
        { name: 'Jan', income: 5000, expenses: 3800 },
        { name: 'Feb', income: 5100, expenses: 4000 },
        { name: 'Mar', income: 5200, expenses: 3700 },
        { name: 'Apr', income: 4900, expenses: 3900 },
        { name: 'May', income: 5300, expenses: 4100 },
    ];
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
                <YAxis stroke="hsl(var(--foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
                <Legend />
                <Bar dataKey="income" fill="#82ca9d" />
                <Bar dataKey="expenses" fill="#ff8042" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export function SavingsProgressChart() {
  const data = [
    { name: 'Jan', savings: 1200 },
    { name: 'Feb', savings: 1100 },
    { name: 'Mar', savings: 1500 },
    { name: 'Apr', savings: 1000 },
    { name: 'May', savings: 1200 },
  ];
    return (
      <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
              <Legend />
              <Area type="monotone" dataKey="savings" stroke="#82ca9d" fill="url(#colorSavings)" />
          </AreaChart>
      </ResponsiveContainer>
    );
}
// Dummy AreaChart component for SavingsProgressChart
const AreaChart = (props: any) => <LineChart {...props} />;
const Area = (props: any) => <Line {...props} />;

export function SixMonthTrendChart() { return <SpendingTrendsChart />; }
export function CategoryTrendsChart() { return <IncomeVsExpensesChart />; }
export function SavingsProjectionChart() { return <SavingsProgressChart />; }
export function InvestmentGrowthChart() { return <SpendingTrendsChart />; }


// For Student User Dashboard
export function ExpensesVsAllowanceChart() {
  const data = [
    { name: 'Week 1', allowance: 250, expenses: 180 },
    { name: 'Week 2', allowance: 250, expenses: 220 },
    { name: 'Week 3', allowance: 250, expenses: 190 },
    { name: 'Week 4', allowance: 250, expenses: 240 },
  ];
  return (
      <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))' }} />
              <Legend />
              <Bar dataKey="allowance" fill="#8884d8" name="Weekly Allowance" />
              <Bar dataKey="expenses" fill="#82ca9d" name="Weekly Expenses" />
          </BarChart>
      </ResponsiveContainer>
  );
}

export function FeePaymentStatusChart() {
    const data = [{ name: 'Fees Paid', value: 75, fill: '#82ca9d' }]; // 75% paid
    return (
        <ResponsiveContainer width="100%" height={300}>
            <RadialBarChart 
                innerRadius="70%" 
                outerRadius="90%" 
                data={data} 
                startAngle={90} 
                endAngle={-270}
                barSize={30}
            >
                <RadialBar
                    background
                    dataKey='value'
                />
                <text 
                    x="50%" 
                    y="50%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    className="fill-foreground text-4xl font-bold"
                >
                    75%
                </text>
                 <text 
                    x="50%" 
                    y="65%" 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    className="fill-muted-foreground text-sm"
                >
                    Paid
                </text>
            </RadialBarChart>
        </ResponsiveContainer>
    );
}

