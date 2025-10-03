import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <main className="flex-1">
        <Suspense fallback={<div className="flex h-full w-full items-center justify-center p-8">Loading...</div>}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
