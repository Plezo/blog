import { saveBlog } from "@/data/blogs";
import { uploadMarkdownToS3 } from "@/lib/aws/s3";
import { NewBlog } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

const storeMetadata = async (blogID: string, fileURL: string) => {
  try {
    const blog: NewBlog = {
      id: blogID,
      userid: "36b48138-18f1-4c80-9020-e2810325d9b1", // temp user id
      uri: fileURL,
    };

    await saveBlog(blog);
  } catch (error) {
    console.error("Error inserting metadata:", error);
    throw error;
  }
};

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  if (!data.content) {
    return NextResponse.json({
      message: "Blog ID and content are required",
      status: 400,
    });
  }

  const blogID = crypto.randomUUID();
  const fileName = `blogs/${blogID}.md`;

  try {
    const fileURI = await uploadMarkdownToS3(data.content, fileName);
    await storeMetadata(blogID, fileURI);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error saving blog:", error);

    return NextResponse.json({
      message: "Error saving blog",
      status: 500,
    });
  }
}
