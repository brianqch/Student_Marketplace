// File: app/api/presigned/route.js

import { NextResponse } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function GET(request) {
  const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
  const s3BucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

  if (!accessKeyId || !secretAccessKey || !s3BucketName) {
    return new Response(null, { status: 500 });
  }

  const searchParams = new URL(request.url).searchParams;
  const fileName = searchParams.get('fileName');
  const contentType = searchParams.get('contentType');
  const timestamp = searchParams.get('timestamp');

  if (!fileName || !contentType) {
    return new Response(null, { status: 400 });
  }

  const client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  const command = new PutObjectCommand({
    Bucket: s3BucketName,
    Key: `items-images/${timestamp}_${fileName}`,
    ContentType: contentType,
  });

  try {
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
    return NextResponse.json({ signedUrl });
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    return new Response(null, { status: 500 });
  }
}


