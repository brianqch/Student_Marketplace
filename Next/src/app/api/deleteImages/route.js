// File: app/api/delete-images/route.js

import { NextResponse } from 'next/server';
import { DeleteObjectsCommand, S3Client } from '@aws-sdk/client-s3';

export async function DELETE(request) {
  const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
  const s3BucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

  if (!accessKeyId || !secretAccessKey || !s3BucketName) {
    return new Response(null, { status: 500 });
  }

  try {
    const { imagesToDelete } = await request.json();

    if (!imagesToDelete || !Array.isArray(imagesToDelete)) {
      return new Response('Invalid request payload', { status: 400 });
    }

    const client = new S3Client({
      region: process.env.NEXT_PUBLIC_AWS_REGION,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // Convert URLs to S3 keys
    const imageKeys = imagesToDelete.map(url => {
      try {
        const urlObj = new URL(url);
        return urlObj.pathname.startsWith('/') ? urlObj.pathname.substring(1) : urlObj.pathname;
      } catch (error) {
        console.error('Error extracting key from URL:', error);
        return null;
      }
    }).filter(key => key !== null);

    if (imageKeys.length === 0) {
      return new Response('No valid image keys to delete', { status: 400 });
    }

    const deleteParams = {
      Bucket: s3BucketName,
      Delete: {
        Objects: imageKeys.map(key => ({ Key: key })),
      },
    };

    const command = new DeleteObjectsCommand(deleteParams);

    const { Deleted } = await client.send(command);
    console.log(`Successfully deleted ${Deleted.length} objects from S3 bucket.`);
    
    return NextResponse.json({ message: 'Deleted images', Deleted });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Internal server error', { status: 500 });
  }
}
