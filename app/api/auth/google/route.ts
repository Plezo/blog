import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { serialize } from "cookie";
import { SignJWT } from "jose";
import { createUser, getUserByEmail } from "@/data/users";
import { objectToJWTPayload } from "@/lib/utils";
import axios from "axios";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return new NextResponse(JSON.stringify({ error: "No code provided" }), {
      status: 400,
    });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  try {
    const { tokens } = await oauth2Client.getToken(code!);
    oauth2Client.setCredentials(tokens);

    const res = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    );

    const googleUser = res.data;

    let user = await getUserByEmail(googleUser.email);

    if (!user) {
      user = await createUser({
        id: crypto.randomUUID(),
        email: googleUser.email,
        username: googleUser.given_name,
        img: googleUser.picture,
      });
    }

    console.log(user);

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const token = await new SignJWT(objectToJWTPayload(user))
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(secret);

    const cookie = serialize("token", token, {
      // httpOnly: true, // Remove HttpOnly to access in client-side
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
      sameSite: "lax",
    });

    const responseRedirect = NextResponse.redirect(new URL("/", req.url));
    responseRedirect.headers.set("Set-Cookie", cookie);

    return responseRedirect;
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Authentication failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
