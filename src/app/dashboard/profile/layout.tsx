import { Header } from "@/components/dashboard/header";
import { Suspense } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
       <Header balance={12530.75} />
      <main className="flex-1">
        <Suspense fallback={<div className="flex h-full w-full items-center justify-center p-8">Loading...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
