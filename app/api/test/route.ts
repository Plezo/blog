import { getAllBlogs } from "@/data/blogs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const blogs = await getAllBlogs();

  return NextResponse.json(blogs);
}
