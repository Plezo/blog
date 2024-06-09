import { saveBlog } from "@/data/blogs";
import { s3 } from "@/lib/aws";
import { NewBlog } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

const uploadMarkdownToS3 = async (content: string, fileName: string) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: content,
    ContentType: "text/markdown",
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const storeMetadata = async (blogID: string, fileURL: string) => {
  try {
    const blog: NewBlog = {
      id: blogID,
      userID: "36b48138-18f1-4c80-9020-e2810325d9b1",
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
    const fileUrl = await uploadMarkdownToS3(data.content, fileName);
    await storeMetadata(blogID, fileUrl);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error("Error saving blog:", error);

    return NextResponse.json({
      message: "Error saving blog",
      status: 500,
    });
  }
}
