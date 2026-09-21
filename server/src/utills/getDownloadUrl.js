import { GetObjectCommand } from "@aws-sdk/client-s3";
import b2 from "../config/b2.js";
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'
const getDownloadUrl = async(storageKey,filename) => {
    try {
        const getObj = new GetObjectCommand({
            Bucket:process.env.BucketName,
            Key:storageKey,
            ResponseContentDisposition:`attachment; filename=${filename}`
        });

        const getUrl = await getSignedUrl(
            b2,getObj,{
                expiresIn:300
            }
        )

        return getUrl

    } catch (error) {
       console.log(error)   
    }
}

export default getDownloadUrl