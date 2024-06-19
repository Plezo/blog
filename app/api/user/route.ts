import { getBlogsByUser } from "@/data/blogs";
import { getUserByUsername } from "@/data/users";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");
  const getblogs = searchParams.get("getblogs");

  if (!username) {
    return NextResponse.json(
      {
        message: "Must provide username!",
      },
      { status: 400 }
    );
  }

  const user = await getUserByUsername(username!);

  let blogs = null;
  if (getblogs) {
    blogs = await getBlogsByUser(user.id);
  }

  return NextResponse.json({
    profile: user,
    blogs: blogs,
  });
}
