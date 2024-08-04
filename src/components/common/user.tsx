"use client";

import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserWithIncludes } from "@/lib/prisma";
import { useAppSelector } from "@/utils/hooks/redux-hooks";
import { useFetch, useGet } from "@/utils/hooks/useFetch";
import { resetUser, setUser } from "@/utils/redux/features/user-slice";
import { signOut, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { UserIcon } from "lucide-react";

export default function UserAvatar() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);
  const userId = session?.user?.id;
  const {
    data,
    error: userError,
    loading: userLoading,
  } = useFetch<UserWithIncludes>(`/api/user/${userId}`);
  const router = useRouter();
  const windowUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data, dispatch]);

  const abbName = (name?: string | null | null): string => {
    if (!name) return "";
    if (name === "Anonymous") return "AN";
    return name
      .split(" ")
      .map((name) => name[0])
      .join("");
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/", redirect: windowUrl.includes("profile") ? true : false });
    dispatch(resetUser());
  };

  return (
    <>
      {session ? <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {userLoading ? (
            <Skeleton className="h-9 w-9 rounded-full" />
          ) : (
            <Avatar className="h-9 w-9 cursor-pointer">
              <AvatarImage src={user?.image ?? ""} alt={user?.name ?? ""} />
              <AvatarFallback>{abbName(user?.name)}</AvatarFallback>
              <span className="sr-only">Toggle user menu</span>
            </Avatar>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => router.push("/profile")}>
            My Account
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> : <Button variant={"outline"} size={"icon"} className="rounded-full" onClick={() => router.push("/auth/signin")}>
        <UserIcon className="h-5 w-5" />
        </Button>}
    </>
  );
}
