"use client";

import { ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/actions/Button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/data-display/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/overlays/DropdownMenu";
import { useAuth } from "@/modules/auth/hooks";
import { redirect } from "next/navigation";

const initialsFromName = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");

export function UserProfileMenu() {
  const { user, logout } = useAuth();
  const handleSignOut = async () => {
    await logout(redirect);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            className="h-10 gap-2 px-1.5 sm:px-2"
            aria-label={`Open user menu for ${user?.name}`}
          />
        }
      >
        <Avatar>
          <AvatarImage src={user?.avatarUrl} alt={user?.name} />
          <AvatarFallback>{initialsFromName(user?.name ?? "")}</AvatarFallback>
        </Avatar>
        <span className="hidden max-w-32 truncate text-sm font-medium md:block">
          {user?.name}
        </span>
        <ChevronDown
          aria-hidden="true"
          className="hidden size-4 text-muted-foreground sm:block"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        <div>
          <div className="flex flex-col items-center gap-2 px-4 py-4 text-center">
            <Avatar size="lg" className="size-14">
              <AvatarImage src={user?.avatarUrl} alt={user?.name} />
              <AvatarFallback>
                {initialsFromName(user?.name ?? "")}
              </AvatarFallback>
            </Avatar>
            <div className="grid justify-items-center gap-1">
              <p className="font-medium leading-none">{user?.name}</p>
              <p className="mt-1 break-all text-sm text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            variant="destructive"
            className="w-full"
          >
            <LogOut aria-hidden="true" />
            Sign out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
