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




// // File: app/api/presigned/route.ts

// import { NextResponse } from 'next/server';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// export async function GET(request) {
//   const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
//   const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
//   const s3BucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;

//   if (!accessKeyId || !secretAccessKey || !s3BucketName) {
//     return new Response('Missing AWS credentials', { status: 500 });
//   }

//   const searchParams = request.nextUrl.searchParams;
//   const fileName = searchParams.get('fileName');
//   const contentType = searchParams.get('contentType');

//   if (!fileName || !contentType) {
//     return new Response('Missing fileName or contentType', { status: 400 });
//   }

//   try {
//     const client = new S3Client({
//       region: process.env.NEXT_PUBLIC_AWS_REGION,
//       credentials: {
//         accessKeyId,
//         secretAccessKey,
//       },
//     });

//     const command = new PutObjectCommand({
//       Bucket: s3BucketName,
//       Key: fileName,
//       ContentType: contentType,
//     });

//     const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });

//     return NextResponse.json({ signedUrl });
//   } catch (error) {
//     console.error('Error generating presigned URL:', error);
//     return new Response('Error generating presigned URL', { status: 500 });
//   }
// }





// // // app/api/get-presigned-url/route.js
// // import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// // import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';


// // export default async function handler(req, res) {
// //   console.log("BALLS");


// //   const s3 = new S3Client({
// //     region: process.env.NEXT_PUBLIC_AWS_REGION,
// //     credentials: {
// //       accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
// //       secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
// //     },
// //   });


// //   const command = new PutObjectCommand({
// //     Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
// //     Key: req.query.file,
// //     fileType: req.query.fileType,
// //   });
// //   const url = await getSignedUrl(client, command, { expiresIn: 60 });

// //   res.status(200).json({
// //     url: url,
// //   });

// // }
// // // export async function GET(request) {
// // //   console.log("Im in get");

// // //   const url = new URL(request.url);
// // //   const filename = url.searchParams.get('filename');
// // //   // const filename = "bob.jpeg";
// // //   if (!filename) {
// // //     return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
// // //   }

// // //   const params = {
// // //     Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
// // //     Key: filename,
// // //     Expires: 60, // URL expiration time in seconds
// // //     ContentType: 'image/jpeg', // Adjust based on the file type
// // //   };

// // //   try {
// // //     const presignedUrl = s3.getSignedUrl('putObject', params);
// // //     return NextResponse.json({ url: presignedUrl });
// // //   } catch (error) {
// // //     return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
// // //   }
// // // }







// // // import { NextResponse } from 'next/server';
// // // import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// // // import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// // // // Initialize AWS S3 Client
// // // const s3Client = new S3Client({
// // //   region: process.env.NEXT_PUBLIC_AWS_REGION,
// // //   credentials: {
// // //     accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
// // //     secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
// // //   },
// // // });

// // // // GET Request Handler
// // // export async function GET(request) {
// // //   const url = new URL(request.url);
// // //   const filename = url.searchParams.get('filename');
// // //   const fileType = url.searchParams.get('fileType');

// // //   if (!filename || !fileType) {
// // //     return NextResponse.json({ error: 'Filename and fileType are required' }, { status: 400 });
// // //   }

// // //   const command = new PutObjectCommand({
// // //     Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
// // //     Key: filename,
// // //     ContentType: fileType, // Correct key for setting content type
// // //   });

// // //   try {
// // //     const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
// // //     return NextResponse.json({ url: presignedUrl });
// // //   } catch (error) {
// // //     console.error('Error generating presigned URL:', error);
// // //     return NextResponse.json({ error: 'Failed to generate presigned URL' }, { status: 500 });
// // //   }
// // // }
