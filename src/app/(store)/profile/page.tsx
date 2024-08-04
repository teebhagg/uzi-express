"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";
import { getServerSession, Session } from "next-auth";
import { useSession } from "next-auth/react";

// export const revalidate = 1;

export default function ProfileRedirect() {
  const router = useRouter();
  const { data, status } = useSession();
  // const {  } = getServerSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    redirect("/");
  }
  
  data && console.log(data);

  if (status === "authenticated" && data?.user) {
    // redirect(`/profile/${data.user.id}`);
    router.replace(`/profile/${data.user.id}`);
  }

  return <div>ProfileRedirect</div>;
}
