"use client";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="mx-auto max-w-sm bg-primary">
        <CardHeader>
          <CardTitle className="text-2xl text-foreground">
            Welcome back.
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label className="text-foreground " htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                className="bg-primary text-foreground"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label className="text-foreground" htmlFor="password">
                  Password
                </Label>
                <a
                  href="/"
                  className="ml-auto inline-block text-sm text-foreground hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                className="bg-primary text-foreground"
                id="password"
                type="password"
                required
              />
            </div>
            <Button
              variant="outline"
              type="submit"
              className="w-full text-foreground border-background bg-accent hover:bg-accent/80"
            >
              <MdOutlineEmail className="h-5 w-5 mr-2" />
              Login
            </Button>
            <div className="flex justify-center ">
              <Separator className="my-0 w-4/5 bg-foreground" />
            </div>
            <Button
              variant="outline"
              className="w-full text-foreground bg-accent border-background hover:bg-accent/80"
              onClick={handleLogin}
            >
              <FaGoogle className="h-5 w-5 mr-2" />
              Login with Google
            </Button>
            <Button
              variant="outline"
              className="w-full text-foreground bg-accent border-background hover:bg-accent/80"
              onClick={handleLogin}
            >
              <FaGithub className="h-5 w-5 mr-2" />
              Login with Github
            </Button>
          </div>
          <div className="mt-4 text-center text-sm text-foreground">
            No account?{" "}
            <a href="/" className="text-accent hover:underline">
              Create one
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
