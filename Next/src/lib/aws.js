import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Configure AWS SDK
const s3 = new S3Client({
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_REGION, // e.g., 'us-west-2'    
});

export default s3;
