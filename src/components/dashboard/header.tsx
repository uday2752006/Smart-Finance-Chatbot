"use client";

import { DollarSign, FileText, PiggyBank, ReceiptText, Lightbulb } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ThemeToggle } from "./theme-toggle";
import { UserNav } from "./user-nav";
import { Badge } from "@/components/ui/badge";
import { BudgetPlannerModal } from "../modals/budget-planner-modal";
import { SavingsProjectorModal } from "../modals/savings-projector-modal";
import { ReportModal } from "../modals/report-modal";

interface HeaderProps {
  balance: number;
}

export function Header({ balance }: HeaderProps) {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "normal";

  const isStudent = role === 'student';

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center space-x-4 px-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="inline-block font-bold font-headline">
              FinWise
            </span>
            <Badge variant="secondary" className="capitalize">{role}</Badge>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <ReceiptText className="mr-2 h-4 w-4" /> Budget Planner
              </Button>
            </DialogTrigger>
            <BudgetPlannerModal currentBalance={balance} />
          </Dialog>

          {!isStudent && (
             <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">
                  <PiggyBank className="mr-2 h-4 w-4" /> Savings
                </Button>
              </DialogTrigger>
              <SavingsProjectorModal currentSavings={balance} />
            </Dialog>
          )}

          {isStudent && (
            <Button variant="ghost">
              <Lightbulb className="mr-2 h-4 w-4" /> Tips
            </Button>
          )}
          
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <FileText className="mr-2 h-4 w-4" /> Report
              </Button>
            </DialogTrigger>
            <ReportModal balance={balance} />
          </Dialog>

          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
