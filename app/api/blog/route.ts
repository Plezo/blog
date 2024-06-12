import { metadata } from "@/app/layout";
import { getBlogByID, saveBlog } from "@/data/blogs";
import { fetchObject, uploadMarkdownToS3 } from "@/lib/aws/s3";
import { NewBlog } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

const storeMetadata = async (newblog: NewBlog) => {
  try {
    const blog: NewBlog = {
      id: newblog.id,
      userid: newblog.userid,
      uri: newblog.uri,
      title: newblog.title,
      overview: newblog.overview,
      img: newblog.img,
    };

    await saveBlog(blog);
  } catch (error) {
    console.error("Error inserting metadata:", error);
    throw error;
  }
};

export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = new URL(req.url);
  const blogid = searchParams.get("blogid");
  //check if blog id is null/exist

  const blog = getBlogByID(blogid!);

  // .md is temp, fetchobject needs to work with diff file ext
  const blogcontent = fetchObject(blogid! + ".md");

  return NextResponse.json({
    metadata: blog,
    content: blogcontent,
  });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  if (!data.content) {
    return NextResponse.json({
      message: "Blog ID and content are required",
      status: 400,
    });
  }

  const blogid = crypto.randomUUID();
  const filename = `blogs/${blogid}.md`;

  try {
    const fileuri = await uploadMarkdownToS3(data.content, filename);
    await storeMetadata({
      id: blogid,
      userid: data.userid,
      uri: fileuri,
      title: data.title,
      overview: data.overview,
      img: data.img,
    });

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error saving blog:", error);

    return NextResponse.json({
      message: "Error saving blog",
      status: 500,
    });
  }
}
