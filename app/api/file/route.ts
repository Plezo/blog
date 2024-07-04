import { uploadToS3 } from "@/lib/aws/s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();

  if (!data.get("img")) {
    return NextResponse.json({
      message: "Image required",
      status: 400,
    });
  }

  try {
    const img: File = data.get("img") as File;

    const imgid = crypto.randomUUID();
    const imgfilename = `imgs/${imgid}.${img.name.split(".")[1]}`;

    const imgfile = new File([img], imgfilename, {
      type: img.type,
    });

    const imguri = await uploadToS3(imgfile);

    return NextResponse.json({
      imguri: imguri,
      status: 200,
    });
  } catch (error) {
    console.error("Error saving image:", error);

    return NextResponse.json({
      message: "Error saving image",
      status: 500,
    });
  }
}
