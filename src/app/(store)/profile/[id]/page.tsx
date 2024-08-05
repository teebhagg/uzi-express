"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import { useGet } from "@/utils/hooks/useFetch";
import { useParams } from "next/navigation";
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
import { toast } from "@/components/ui/use-toast";
import { Prisma } from "@prisma/client";
import { UserWithIncludes } from "@/lib/prisma";
import { EditIcon, X } from "lucide-react";
import { Switch } from "@/components/ui/switch"
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/utils/hooks/redux-hooks";
import { setUser } from "@/utils/redux/features/user-slice";


const userSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name is required" })
      .max(100, { message: "Name is too long" }),
    email: z.string().email({ message: "Invalid email" }),
    phone: z.string().max(10, { message: "Phone number is too long" }),
    oldPassword: z.string().optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  });

export default function Component() {
  const params = useParams();
  const dispatch = useDispatch();
  // const user = useAppSelector((state) => state.user);
  const { data: session, status, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const {
    data: userData,
    error,
    loading,
  } = useGet<UserWithIncludes>(`/api/user/${params.id}`);

  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  };

  let schema = isPasswordChange
    ? userSchema
        .extend({
          oldPassword: z.string().min(1, { message: "Old password is required" }),
          password: z.string().min(1, { message: "Password is required" }),
          confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
        })
    : userSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (userData) {
      form.reset({
        name: userData.name ?? "",
        email: userData.email ?? "",
        phone: userData.phone ?? "",
        oldPassword: "",
        password: "",
        confirmPassword: "",
      });
      dispatch(setUser(userData));
    }
  }, [userData, form]);

  const handleSubmit = async(data: z.infer<typeof schema>) => {
    const reqBody = isPasswordChange ? {
      name: data.name,
      email: data.email,
      phone: data.phone,
      oldPassword: data.oldPassword,
      password: data.password,
      confirmPassword: data.confirmPassword,
    } : {
      name: data.name,
      email: data.email,
      phone: data.phone,
    }
    setIsLoading(true);
    // Call API
    const res = await fetch(`/api/user/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });
    if (!res.ok) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    const updatedUser = (await res.json()) as UserWithIncludes;
    await update({ ...session?.user, name: updatedUser.name, picture: updatedUser.image, email: updatedUser.email });
    dispatch(setUser(updatedUser));
    toast({
      title: "Success",
      description: "Profile updated successfully",
    });
    setIsLoading(false);
    setIsEditing(false);
  };

  if (status === "loading" || loading) return <p>Loading...</p>;

  const user = session?.user;

  const nameAbb = (name?: string | null | null): string => {
    if (!name) return "";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`;
    }
    return name[0];
  };

  return (
    <div className="flex flex-col bg-background">
      <header className="border-b bg-background px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
              <AvatarFallback> {nameAbb(user?.name)} </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-semibold">{user?.name}</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <Button
            variant={isEditing ? "secondary" : "default"}
            onClick={() => setIsEditing(!isEditing)}
            size="icon"
            className="rounded-full">
            {isEditing ? (
              <X className="h-4 w-4" />
            ) : (
              <EditIcon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </header>
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex-1 p-4 sm:p-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex my-6 space-x-5">
              <span className="text-sm text-muted-foreground">Change Password</span>
              <Switch onCheckedChange={() => setIsPasswordChange(!isPasswordChange)} />
            </div>
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="oldPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Old Password</FormLabel>
                      <FormControl>
                        <Input disabled={!isPasswordChange} type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input disabled={!isPasswordChange} type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input disabled={!isPasswordChange} type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button type="submit" disabled={isLoading}>
                { isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="flex-1 p-4 sm:p-6">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label>Name</Label>
              <p>{user?.name}</p>
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <p>{user?.email}</p>
            </div>
            <div className="grid gap-2">
              <Label>Phone</Label>
              <p>{userData?.phone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
