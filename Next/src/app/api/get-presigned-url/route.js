// app/api/get-presigned-url/route.js
import { NextResponse } from 'next/server';
import { S3 } from 'aws-sdk';

console.log("BALLS");

const s3 = new S3({
  region: 'your-region',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function GET(request) {
  console.log("Im in get");

  const url = new URL(request.url);
  const filename = url.searchParams.get('filename');
  // const filename = "bob.jpeg";
  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: filename,
    Expires: 60, // URL expiration time in seconds
    ContentType: 'image/jpeg', // Adjust based on the file type
  };

  try {
    const presignedUrl = s3.getSignedUrl('putObject', params);
    return NextResponse.json({ url: presignedUrl });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
  }
}
