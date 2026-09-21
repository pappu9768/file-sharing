import { S3Client } from "@aws-sdk/client-s3";
import { configDotenv } from "dotenv";
configDotenv()
const b2 = new S3Client({
    region:'us-east-1',

    endpoint:process.env.endpoint,

    credentials:{
        accessKeyId: process.env.keyID,
        secretAccessKey: process.env.applicationKey
    },
})

export default b2;

