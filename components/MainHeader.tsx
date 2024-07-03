"use client";
import { useUser } from "@/hooks/useUser";
import { Separator } from "./ui/separator";
import axios from "axios";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

export default function MainHeader() {
  const user = useUser();
  const handleSignOut = async () => {
    try {
      await axios.get("/api/auth/logout");
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to sign out", error);
    }
  };
  return (
    <header className="flex flex-col ">
      <div className="flex flex-row py-2 px-6">
        <div className="flex flex-row w-1/2 gap-4 items-center">
          <a href="/">
            <h1 className="text-xl font-bold font-foreground">BlogWiz</h1>
          </a>
          <input
            type="search"
            placeholder="Search..."
            className=" bg-background2 p-2  rounded-2xl focus:outline-none"
          />
        </div>
        <div className="flex justify-end w-1/2 gap-4 items-center">
          <a href="/blogs" className="text-foreground hover:underline">
            Write
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {user && (
                <div className="flex gap-4 items-center">
                  <Image
                    className="rounded-full"
                    src={user?.img}
                    width={32}
                    height={32}
                    alt="User Profile"
                  />
                </div>
              )}
              {!user && <span>Loading...</span>}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button onClick={handleSignOut}>Sign Out</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator className="opacity-25" />
    </header>
  );
}
