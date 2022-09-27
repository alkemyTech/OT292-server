import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
const fs = require('fs');
require('dotenv').config()

const credentialws: any = {
    accessKeyId: process.env.AWS_PUBLIC_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
}
const client = new S3Client({
region: process.env.AWS_BUCKET_REGION,
credentials: credentialws
})

async function uploadFile(file: any){
    //upload`${imageTimestamp}.${prueba.extension}`

    const stream = fs.createReadStream(file.path)
    const paramsUplad = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.filename,
        Body: stream
    }
    const command = new PutObjectCommand(paramsUplad)
   const result = await client.send(command)
   return result
}
export default uploadFile;