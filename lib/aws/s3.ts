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

export const uploadMarkdownToS3 = async (
  fileContent: string,
  fileName: string
) => {
  const uploadParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
    Body: fileContent,
    ContentType: "text/markdown",
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(uploadParams));
    // return data.Location;
    return `s3://${process.env.S3_BUCKET_NAME}/${fileName}`;
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
