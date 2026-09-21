import { ListBucketsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import b2 from "../config/b2.js";
import "dotenv/config";



export const toB2 = async(file,key) => {
    try {
        const command = new PutObjectCommand({
            Bucket:process.env.BucketName,
            Key:key,
            Body:file.buffer,
            ContentType:file.mimetype
        })
        const res = await b2.send(command);
        console.log("file send to b2 successfully")


    } catch (error) {
        console.log("Got some error",error)
        
    }
}