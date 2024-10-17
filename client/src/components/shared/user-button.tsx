import { useCurrentUser } from "@/hooks/use-currentuser";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { Icons } from "./icons";
import { logout } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/zustand";

export const UserButton = () => {
  const { user, refetch } = useCurrentUser();
  const { openModal } = useModalStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    refetch();
    router.push("/");
  };

  return (
    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
      {user ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"ghost"} className="size-8 rounded-full">
                <Avatar className="size-8 ">
                  <AvatarImage src={user?.profilePicture || ""} />
                  <AvatarFallback>{user?.name?.charAt(0) || ""}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="flex flex-col items-start">
                <div className="text-sm font-medium">{user?.name || ""}</div>
                <div className="text-muted-foreground font-medium">
                  {user?.email || ""}
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={"/dashboard"}>
                  <Icons.dashboard className="mr-2 size-4" />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/dashboard/settings"}>
                  <Icons.settings className="mr-2 size-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <Icons.logout className="mr-2 size-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button onClick={() => openModal("connectAccountModal")}>
            Sign In
          </Button>
        </>
      )}
    </div>
  );
};
