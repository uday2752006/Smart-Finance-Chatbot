'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  useUser,
  useFirestore,
  useDoc,
  updateDocumentNonBlocking,
  useMemoFirebase,
} from '@/firebase';
import { doc } from 'firebase/firestore';

const profileSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const userDocRef = useMemoFirebase(
    () => (user ? doc(firestore, 'users', user.uid) : null),
    [firestore, user]
  );
  const { data: userData } = useDoc<{
    fullName: string;
    email: string;
    role: string;
  }>(userDocRef);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: '',
      email: '',
    },
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        fullName: userData.fullName,
        email: userData.email,
      });
    }
  }, [userData, form]);

  const onSubmit = (values: ProfileFormValues) => {
    if (userDocRef) {
      updateDocumentNonBlocking(userDocRef, values);
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      });
    }
  };
  
  const userInitial = userData?.role === 'student' ? 'S' : 'U';

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Profile</CardTitle>
            <CardDescription>
              Manage your account settings and profile information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/avatars/01.png" alt="@user" />
                <AvatarFallback>{userInitial}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{userData?.fullName}</h2>
                <p className="text-sm text-muted-foreground">
                  {userData?.email}
                </p>
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
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
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                          readOnly
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit">Update Profile</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
