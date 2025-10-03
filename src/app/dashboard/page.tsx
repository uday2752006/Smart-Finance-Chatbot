"use client";

import { useSearchParams } from "next/navigation";
import { BankBalance } from "@/components/dashboard/bank-balance";
import { Chatbot } from "@/components/dashboard/chatbot";
import { NormalUserDashboard } from "@/components/dashboard/normal-dashboard";
import { StudentUserDashboard } from "@/components/dashboard/student-dashboard";

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "normal";

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        {role === "normal" && <BankBalance />}
        <Chatbot role={role as "normal" | "student"} />
        {role === "normal" ? (
          <NormalUserDashboard />
        ) : (
          <StudentUserDashboard />
        )}
      </div>
    </div>
  );
}
