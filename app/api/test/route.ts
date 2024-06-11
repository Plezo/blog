import { getAllBlogs } from "@/data/blogs";
import { fetchObject } from "@/lib/aws/s3";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  // const blogs = await getAllBlogs();

  const blog = await fetchObject(
    "blogs/0793961a-9701-49db-b74d-aa782bb865b8.md"
  );

  return NextResponse.json(blog);
}
