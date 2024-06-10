import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

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
