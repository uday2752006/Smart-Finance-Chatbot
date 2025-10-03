
"use client";

import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getSavingsTips } from "@/ai/flows/chatbot-suggests-savings-tips";
import { Loader, Lightbulb } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";

export function TipsModal() {
  const [tips, setTips] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTips = async () => {
    setIsLoading(true);
    try {
      const result = await getSavingsTips({ 
        userInput: "Give me some financial tips for a student.",
        financialSituation: "I am a student with a limited monthly allowance."
      });
      setTips(result.savingsTips);
    } catch (error) {
      console.error("Failed to fetch tips:", error);
      setTips(["Sorry, there was an error fetching tips. Please try again."]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  return (
    <DialogContent className="sm:max-w-[525px]">
      <DialogHeader>
        <DialogTitle className="font-headline flex items-center gap-2">
          <Lightbulb /> Financial Tips for Students
        </DialogTitle>
        <DialogDescription>
          Here are some AI-powered tips to help you manage your finances wisely.
        </DialogDescription>
      </DialogHeader>
      <div className="py-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-60">
            <Loader className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <Card>
            <ScrollArea className="h-72">
              <CardContent className="pt-6">
                <ul className="space-y-4">
                  {tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <Lightbulb className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </ScrollArea>
          </Card>
        )}
      </div>
      <div className="flex justify-end">
        <Button variant="outline" onClick={fetchTips} disabled={isLoading}>
          {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : null}
          Get New Tips
        </Button>
      </div>
    </DialogContent>
  );
}
