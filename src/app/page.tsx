import { AuthForm } from "@/components/auth-form";
import { DollarSign } from "lucide-react";

export default function AuthenticationPage() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2">
            <DollarSign className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground font-headline">
                FinWise Dashboard
            </h1>
        </div>
        <div className="w-full max-w-md">
            <AuthForm />
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          By continuing, you agree to our{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </main>
  );
}
