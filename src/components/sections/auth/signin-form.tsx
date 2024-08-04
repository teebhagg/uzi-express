'use client';

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/utils/redux/features/user-slice";
import { OTPDialog } from "./otp-dialog";

const schema = z.object({
  // name: z.string().min(3),
  email: z.string().min(3).email(),
  password: z.string().min(1),
  // confirmPassword: z.string().min(6),
});

const defaultValues = {
  // name: '',
  email: "",
  // password: '',
};

export default function SignInForm() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(true);
    const dispatch = useDispatch();
    const router = useRouter();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = async(values: z.infer<typeof schema>) => {
    setIsLoading(true);
        const userRes = await fetch(`/api/user/${values.email}`);

        if (!userRes.ok) {
            toast({
                variant: "destructive",
                title: "Sign in failed!",
                description: "This user does not exist. Please sign up first.",
            });
            console.log(await userRes.json());
            setIsLoading(false);
            return;
        }

        // const signRes = await fetch(`/api/user/signin`, {
        //     method: "POST",
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //       email: values.email,
        //       password: values.password,
        //     }),
        //   });
      
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/profile",
      });

      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Error!",
          description: res.error,
        });
        setIsLoading(false);
        return;
      }
      toast({
        variant: "default",
        title: "Success!",
        description: "Sign in successful.",
      })
      const user = await userRes.json();
      dispatch(setUser(user));
    setIsLoading(false);
  };

  // Handle Google sign in
  const handleSocialLogin = async() => {
    const res = await signIn("google", { callbackUrl: "/profile", redirect: true });

    console.log(res);

    if (!res || res?.error) {
        toast({
            variant: "destructive",
            title: "Error!",
            description: "Sign in failed.",
        });
        return;
    }

    toast({
        variant: "default",
        title: "Success!",
        description: "Sign in successful.",
    })

  }

  return (
    <div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        </div>
        <div className="pt-8">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
        <Separator className="my-6" />
        <div className="">
          <Button type="button" variant="outline" onClick={handleSocialLogin} className="w-full">
            <div className="flex items-center space-x-3">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="2.8em"
                  viewBox="0 0 256 262">
                  <path
                    fill="#4285f4"
                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                  />
                  <path
                    fill="#34a853"
                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                  />
                  <path
                    fill="#fbbc05"
                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                  />
                  <path
                    fill="#eb4335"
                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                  />
                </svg>
              </div>
              <span>Sign In with Google</span>
            </div>
          </Button>
        </div>
      </form>
    </Form>
    {/* <OTPDialog email={form.getValues("email")} password="" open={openDialog} onOpenChange={setOpenDialog} /> */}
    </div>
  );
}
