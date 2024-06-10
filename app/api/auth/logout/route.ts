import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
  const cookie = serialize("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
    path: "/",
    sameSite: "lax",
  });

  const response = NextResponse.redirect(new URL("/login", req.url));
  response.headers.set("Set-Cookie", cookie);

  return response;
}
