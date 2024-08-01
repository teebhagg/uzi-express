import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CartWithIncludes, UserWithIncludes } from "@/lib/prisma";
import { useAppSelector } from "@/utils/hooks/redux-hooks";
import useFetch from "@/utils/hooks/useFetch";
import { setUser } from "@/utils/redux/features/user-slice";
import { useDispatch } from "react-redux";

export default function UserAvatar() {
  const { data: userData, error: userError, loading: userLoading } = useFetch<UserWithIncludes>("/api/user");
  const user = useAppSelector((state) => state.user);
  const dispatch = useDispatch();
  
  userData && dispatch(setUser(userData));

  const abbName = (name?: string | null | null): string => {
    if (!name) return "";
    if (name === "Anonymous") return "AN";
    return name
      .split(" ")
      .map((name) => name[0])
      .join("");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 cursor-pointer">
          <AvatarImage src={user?.image ?? ""} alt="@shadcn" />
          <AvatarFallback> {abbName(user?.name)} </AvatarFallback>
          <span className="sr-only">Toggle user menu</span>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>My Account</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
