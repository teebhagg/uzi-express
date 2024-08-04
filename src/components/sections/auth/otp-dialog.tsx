"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { redirect, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/redux/features/user-slice";
import useTimeoutCounter from "@/utils/hooks/useCountdown";
import { useCountdown } from "usehooks-ts";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

interface Props {
  email: string;
  password: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OTPDialog({ email, password, open, onOpenChange }: Props) {
  const router = useRouter()
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  // const { secondsLeft, resetTimer } = useTimeoutCounter({initialSeconds: 600});
  const [count] = useCountdown({countStart: 600});
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  console.log(count)

  const onSubmit = async(data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    
    try {
      const verify = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          otp: data.pin,
        }),
      })

      if (!verify.ok) {
        const errorMessage = await verify.json();
        console.log(errorMessage)
        throw new Error(errorMessage.message ?? "Failed to verify OTP code");
      }

      const res = await signIn('credentials', { email, password, redirect: false });

      if (res?.error) {
        console.log(res.error)
        throw new Error(res.error);
      }
      onOpenChange(false);
      const userRes = await fetch(`/api/user/${email}`);
      const user = await userRes.json();
      dispatch(setUser(user));
      // redirect('/profile');
      router.push('/profile');
    } catch (error: any) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Verification failed!",
        description: error.message,
      });
    }
    form.reset();
    setIsLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="w-min">
        <AlertDialogHeader className="mx-auto space-y-8">
          <AlertDialogTitle className="text-center">Enter the OTP Code</AlertDialogTitle>
          <AlertDialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>One-Time Password</FormLabel>
                      <FormControl className="mx-auto">
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription className="text-center space-y-3">
                        <p>
                          Please enter the one-time password sent to your email.
                        </p>
                        <p>If you do not receive the email, please check your spam folder.</p>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AlertDialogFooter>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Loading..." : "Submit"}
                  </Button>
                </AlertDialogFooter>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
