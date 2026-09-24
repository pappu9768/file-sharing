import { PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from 'crypto'
import { toB2 } from "../utills/toB2.js";
import uploadModel from "../models/upload.model.js"
export const uploadFileToB2 = async (req, res) => {
    try {

        //checking is file provided or not
        const getFile = req.file;
        if(!getFile){
            return res.status(400).json({
                message:"File is required",
                success:false
            })
        }
        // console.log(getFile)

        //only unique file is allowed 
        //we can look it
        //await uploadModel.find()
        // if(getFile.originalname){
        //     return res.status(400).json({
        //         message:"File name is alredy exist"
        //     })
        // }

        
        //generating unique id for every file upload
        const transfer = crypto.randomBytes(6).toString("hex");

        //creating key and storing it to database
        const key = `transfers/${transfer}/${getFile.originalname}`;

        //using b2 function
        await toB2(getFile,key)

        //expiry date of one day
        const expiryDate = new Date(
            Date.now() + 24*60*60*1000
        )

        const uploadedSaveFile = await uploadModel.create({
            transferId:transfer,
            originalName: getFile.originalname,
            storageKey:key,
            mimetype:getFile.mimetype,
            size:getFile.size,
            expiryAt:expiryDate,
            maxDownloads:req.body.maxDownloads

        })
        return res.status(200).json({
            message: "Ready to download",
            success: true,
            uploadedSaveFile
        })
    } catch (error) {
        console.log("Error:", error);
        return res.status(400).json({
            message: "Internal server error",
            success: false,
            error
        })
    }
}