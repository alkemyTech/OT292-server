/* import {S3Client, PutObjectCommand, ListObjectsCommand} from '@aws-sdk/client-s3' */
const S3 = require('aws-sdk/clients/s3');
const fs = require('fs');
require('dotenv').config();

const credentialws: any = {
  accessKeyId: process.env.AWS_PUBLIC_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};
const client = new S3({
  region: process.env.AWS_BUCKET_REGION,
  credentials: credentialws,
});

async function uploadFile(file: any) {
  // upload`${imageTimestamp}.${prueba.extension}`

  const stream = fs.createReadStream(file.path);
  const paramsUplad = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: file.filename,
    Body: stream,
  };
  // const command = new PutObjectCommand(paramsUplad)

  const result = client.upload(paramsUplad).promise();
  return result;
}
export default uploadFile;
