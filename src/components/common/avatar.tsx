import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"

  interface UserImgProps {
    fullName: string
    url?: string
  }

export const UserImg = ({fullName, url}: UserImgProps) => {
    const names = fullName.split(" ");
  return (
    <Avatar>
      <AvatarImage src={url ?? "https://github.com/shadcn.png"} alt="@shadcn" />
      <AvatarFallback>{names[0][0]}{names[1] ? names[1][0] : "CN"}</AvatarFallback>
    </Avatar>
  )
}
