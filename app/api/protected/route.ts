import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET(req: NextRequest) {
  const cookie = req.headers.get("cookie");
  const cookies = parse(cookie || "");
  const token = cookies.token;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = verify(token, JWT_SECRET!);
    return NextResponse.json({ message: "Success", user: decoded });
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
