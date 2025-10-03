"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Loader, Send, Mic, User, HelpCircle, Save, Lightbulb, LineChart, Volume2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getFinancialAdvice } from "@/ai/flows/chatbot-financial-advice";
import { getSavingsTips } from "@/ai/flows/chatbot-suggests-savings-tips";
import { chatbotSuggestsBudgetPlan } from "@/ai/flows/chatbot-suggests-budget-plan";
import { textToSpeech } from "@/ai/flows/text-to-speech";
import { cn } from "@/lib/utils";

type Message = {
  id: number;
  text: string | string[];
  sender: "user" | "bot";
  audioUrl?: string;
};

type ChatbotProps = {
  role: "normal" | "student";
};

const initialMessages: { [key: string]: Message[] } = {
  general: [
    {
      id: 1,
      text: "Hello! I'm your Finance Assistant. How can I help you with your finances today?",
      sender: "bot",
    },
  ],
  budget: [
    {
      id: 1,
      text: "Welcome to the Budgeting tab. Ask me about creating a budget, tracking expenses, or analyzing your spending.",
      sender: "bot",
    },
  ],
  investment: [
    {
      id: 1,
      text: "Welcome to the Investment tab. I can provide information on stocks, bonds, and other investment vehicles. What are you interested in?",
      sender: "bot",
    },
  ],
  loan: [
    {
      id: 1,
      text: "Welcome to the Loan Assistance tab. I can help you understand different types of loans, interest rates, and repayment plans.",
      sender: "bot",
    },
  ],
};

export function Chatbot({ role }: ChatbotProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, activeTab]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: text,
      sender: "user",
    };

    setMessages((prev) => ({
      ...prev,
      [activeTab]: [...prev[activeTab], userMessage],
    }));
    setInput("");
    setIsLoading(true);

    try {
      let botResponse: Message;
      let responseData: any;
      let responseText: string | string[];

      if (text.toLowerCase().includes("budget plan")) {
        responseData = await chatbotSuggestsBudgetPlan({ monthlyIncome: 5000, monthlyExpenses: 3500 });
        responseText = responseData.budgetPlan;
      } else if (text.toLowerCase().includes("savings tips")) {
        responseData = await getSavingsTips({ userInput: text });
        responseText = responseData.savingsTips;
      } else {
        responseData = await getFinancialAdvice({ userInput: text });
        responseText = responseData.advice;
      }

      botResponse = { id: Date.now() + 1, text: responseText, sender: "bot" };
      
      setMessages((prev) => ({
        ...prev,
        [activeTab]: [...prev[activeTab], botResponse],
      }));

      // Generate audio
      const audioText = Array.isArray(responseText) ? responseText.join(' ') : responseText;
      const audioData = await textToSpeech(audioText);
      
      setMessages((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].map(msg => msg.id === botResponse.id ? { ...msg, audioUrl: audioData.media } : msg)
      }));

    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorResponse: Message = {
        id: Date.now() + 1,
        text: "Sorry, I'm having trouble connecting. Please try again later.",
        sender: "bot",
      };
      setMessages((prev) => ({
        ...prev,
        [activeTab]: [...prev[activeTab], errorResponse],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayAudio = (message: Message) => {
    if (audioRef.current && audioPlaying === message.id) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setAudioPlaying(null);
    } else if (message.audioUrl) {
        if(audioRef.current) {
            audioRef.current.src = message.audioUrl;
            audioRef.current.play();
            setAudioPlaying(message.id);
        }
    }
  }

  const quickSuggestions = [
    { text: "Create a Budget Plan", icon: HelpCircle },
    { text: "Give me some Savings Tips", icon: Lightbulb },
    { text: "Help with Investments", icon: LineChart, normalOnly: true },
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Bot /> Finance Assistant
        </CardTitle>
        <CardDescription>
          Your AI-powered guide to financial wisdom.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
            {role === "normal" && (
              <>
                <TabsTrigger value="investment">Investment</TabsTrigger>
                <TabsTrigger value="loan">Loan</TabsTrigger>
              </>
            )}
          </TabsList>
          <div className="mt-4 rounded-md border">
            <ScrollArea className="h-[400px] w-full p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages[activeTab]?.map((message) => (
                  <div key={message.id} className={cn("flex items-start gap-3", message.sender === 'user' ? 'justify-end' : '')}>
                     {message.sender === 'bot' && <AvatarForBot />}
                    <div className={cn("max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 relative group", message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                       {Array.isArray(message.text) ? (
                            <ul className="list-disc space-y-2 pl-5">
                                {message.text.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        ) : (
                            <p className="text-sm">{message.text}</p>
                        )}
                        {message.sender === 'bot' && message.audioUrl && (
                            <Button
                                size="icon"
                                variant="ghost"
                                className="absolute -bottom-4 -right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => handlePlayAudio(message)}
                            >
                                {audioPlaying === message.id ? <Loader className="h-4 w-4 animate-spin" /> : <Volume2 className="h-4 w-4" />}
                            </Button>
                        )}
                    </div>
                    {message.sender === 'user' && <AvatarForUser />}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <AvatarForBot />
                    <div className="bg-muted rounded-lg px-4 py-3 flex items-center">
                        <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="border-t p-4 space-y-4">
                 <div className="flex flex-wrap gap-2">
                    {quickSuggestions.map((suggestion, i) => 
                        (!suggestion.normalOnly || role === 'normal') && (
                        <Button key={i} variant="outline" size="sm" onClick={() => handleSendMessage(suggestion.text)}>
                            <suggestion.icon className="mr-2 h-4 w-4" />
                            {suggestion.text}
                        </Button>
                        )
                    )}
                </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Mic className="h-5 w-5" />
                  <span className="sr-only">Use voice</span>
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  disabled={isLoading}
                />
                <Button onClick={() => handleSendMessage()} disabled={isLoading}>
                  <Send className="h-5 w-5" />
                  <span className="sr-only">Send</span>
                </Button>
              </div>
            </div>
          </div>
        </Tabs>
      </CardContent>
       <audio ref={audioRef} onEnded={() => setAudioPlaying(null)} className="hidden" />
    </Card>
  );
}


const AvatarForBot = () => (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
        <Bot className="h-5 w-5" />
    </div>
)

const AvatarForUser = () => (
    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground flex-shrink-0">
        <User className="h-5 w-5" />
    </div>
)
