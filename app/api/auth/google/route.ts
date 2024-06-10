import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ message: "Code is missing" }, { status: 400 });
  }

  try {
    //Exchange code for tokens
    const { data } = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Get user info
    const { id_token, access_token } = data;
    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    // Create JWT
    const token = jwt.sign(
      {
        sub: userInfo.data.sub,
        email: userInfo.data.email,
        name: userInfo.data.name,
      },
      JWT_SECRET!,
      { expiresIn: "1h" }
    );

    const cookie = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    const response = NextResponse.redirect(new URL("/", req.url));
    response.headers.set("Set-Cookies", cookie);
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Authentication failed", error: error.message },
      { status: 500 }
    );
  }
}
