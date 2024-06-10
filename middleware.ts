import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./lib/utils";

export async function middleware(req: NextRequest): Promise<NextResponse> {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    await verifyJWT(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/"], // Paths to protect
};
