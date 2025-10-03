"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
  role: z.enum(["normal", "student"]),
  rememberMe: z.boolean().optional(),
});

const signupSchema = z.object({
  fullName: z.string().min(1, { message: "Full name is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  role: z.enum(["normal", "student"]),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export function AuthForm() {
  const router = useRouter();
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();

  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "normal",
      rememberMe: false,
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "normal",
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      router.push(`/dashboard`);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    }
  };

  const handleSignup = async (values: SignupFormValues) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;
      if (user) {
        const userDocRef = doc(firestore, 'users', user.uid);
        await setDocumentNonBlocking(userDocRef, {
          fullName: values.fullName,
          email: values.email,
          role: values.role
        }, {});
        router.push(`/dashboard`);
      }
    } catch (error: any) {
       toast({
        variant: "destructive",
        title: "Sign Up Failed",
        description: error.message,
      });
    }
  };

  const checkPasswordStrength = (pass: string) => {
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (pass.match(/[a-z]+/)) strength += 25;
    if (pass.match(/[A-Z]+/)) strength += 25;
    if (pass.match(/[0-9]+/)) strength += 25;
    if (pass.match(/[$@#&!]+/)) strength += 25;
    setPasswordStrength(Math.min(100, strength));
    setPassword(pass);
  };

  return (
    <Card className="w-full">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <CardHeader>
            <CardTitle className="font-headline">Welcome Back</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Role selection is not needed for login */}
                <div className="flex items-center justify-between">
                  <FormField
                    control={loginForm.control}
                    name="rememberMe"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Remember me</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                   <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </TabsContent>
        <TabsContent value="signup">
          <CardHeader>
            <CardTitle className="font-headline">Create an Account</CardTitle>
            <CardDescription>
              Fill in the details below to create a new account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="name@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} onChange={(e) => {
                            field.onChange(e);
                            checkPasswordStrength(e.target.value);
                        }}/>
                      </FormControl>
                      {password && (
                        <div className="space-y-2 pt-1">
                            <Progress value={passwordStrength} className="h-2" />
                            <p className="text-xs text-muted-foreground">Password strength</p>
                        </div>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                  Sign Up
                </Button>
              </form>
            </Form>
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
