import uploadModel from "../models/upload.model.js";
import getDownloadUrl from "../utills/getDownloadUrl.js";


export const downloadFile = async (req, res) => {
    try {

        const { transferId } = req.params;

        const transferFileIsexist = await uploadModel.findOne({ transferId });
        if (!transferFileIsexist) {
            return res.status(403).json({
                message: "No file found",
                success: false
            })
        }

        //checkis download count is exceeded or not
        const result = await uploadModel.findOneAndUpdate({
            transferId,
            //check expiry 
            expiryAt: { $gt: new Date() },
            $or: [
                { maxDownloads: null },
                { $expr: { $lt: ["$downloadCounts", "$maxDownloads"] } },
            ],
        },
            {
                $inc: { downloadCounts: 1 }
            },
            {
                returnDocument:"after"
            }
        )

        if (!result) {
            return res.status(403).json({
                message: "Transfer expired or download limit is reached",
                success: false
            })
        }
        // console.log(transferFileIsexist.storageKey)
        const getUrl = await getDownloadUrl(transferFileIsexist.storageKey,transferFileIsexist.originalName)

        return res.status(200).json({
            message: "URL",
            success: true,
            getUrl,
            count: result.maxDownloads === null ? null : Math.max(0, result.maxDownloads - result.downloadCounts)
        })



    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Internal server error in download file",
            success: false
        })
    }
}