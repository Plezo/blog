import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const uploadToS3 = async (file: File) => {
  const filecontent = Buffer.from(await file.arrayBuffer());
  const contentType = file.type || "application/octet-stream";

  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: file.name,
    Body: filecontent,
    ContentType: contentType,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    return `s3://${process.env.S3_BUCKET_NAME}/${file.name}`;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

const streamToString = (stream: Readable) => {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
};

export const fetchObject = async (key: string) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: key,
  };

  const { Body } = await s3Client.send(new GetObjectCommand(params));
  const bodyString = await streamToString(Body as Readable);

  return {
    Key: key,
    Body: bodyString,
  };
};
