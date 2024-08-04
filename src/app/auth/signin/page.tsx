"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import SignInForm from "@/components/sections/auth/signin-form"
import SignUpForm from "@/components/sections/auth/signup-form"

export default function Component() {
  const [isSignIn, setIsSignIn] = useState(true)
  const imgUrl = "https://plus.unsplash.com/premium_photo-1661964205360-b0621b5a9366?q=80&w=2638&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <div className="w-full md:w-1/2 bg-muted">
        <img
          src={imgUrl}
          width={1920}
          height={1080}
          alt="Image"
          className="h-[30vh] md:h-full w-full object-cover"
        />
      </div>
      <div className="flex w-full md:w-1/2 flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
              {isSignIn ? "Sign in to your account" : "Create a new account"}
            </h2>
          <div className="mt-8 space-y-6">
            {/* <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {!isSignIn && (
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" type="text" required />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" autoComplete="email" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {isSignIn ? "Sign in" : "Sign up"}
              </Button>
            </form> */}
            {isSignIn ? <SignInForm /> : <SignUpForm />}
          </div>
          <div>
          <p className="flex justify-center items-center gap-1 mt-2 text-center text-sm text-muted-foreground">
              <p>{isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}</p>
              <Button
                variant={"link"}
                className="font-medium text-primary"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? "Sign up" : "Sign in"}
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}