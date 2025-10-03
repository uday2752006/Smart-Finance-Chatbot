"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { BankBalance } from "@/components/dashboard/bank-balance";
import { Chatbot } from "@/components/dashboard/chatbot";
import { NormalUserDashboard } from "@/components/dashboard/normal-dashboard";
import { StudentUserDashboard } from "@/components/dashboard/student-dashboard";
import { Header } from "@/components/dashboard/header";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "normal";
  const [balance, setBalance] = useState(12530.75);

  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <Header balance={balance} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="container mx-auto">
          <div className="flex flex-col gap-8">
            {role === "normal" && <BankBalance balance={balance} setBalance={setBalance} />}
            <Chatbot role={role as "normal" | "student"} />
            {role === "normal" ? (
              <NormalUserDashboard balance={balance} />
            ) : (
              <StudentUserDashboard />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
