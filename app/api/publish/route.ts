import { saveBlog } from "@/data/blogs";
import { uploadToS3 } from "@/lib/aws/s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();

  if (!data.get("content")) {
    return NextResponse.json({
      message: "Blog Content is required",
      status: 400,
    });
  }

  try {
    const blogid = crypto.randomUUID();
    const blogfilename = `blogs/${blogid}.md`;

    const blogfile = new File([data.get("content")!], blogfilename, {
      type: "text/markdown",
    });

    const fileuri = await uploadToS3(blogfile);

    let imguri = undefined;
    if (data.get("imginput")) {
      const imginput: File = data.get("imginput") as File;

      const imgid = crypto.randomUUID();
      const imgfilename = `imgs/${imgid}.${imginput.name.split(".")[1]}`;

      // rename file to uuid
      const imgfile = new File([imginput], imgfilename, {
        type: imginput.type,
      });

      imguri = await uploadToS3(imgfile);
    }

    await saveBlog({
      id: blogid,
      userid: data.get("userid") as string,
      uri: fileuri,
      title: data.get("title") as string,
      overview: data.get("overview") as string,
      img: imguri,
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
