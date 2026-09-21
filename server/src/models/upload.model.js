import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
    transferId:{
        type:String,
        required:true,
        unique:true,
        index:true
    },

    originalName:{
        type:String,
        required:true
    },
    storageKey:{
        type:String,
        required:true,
        unique:true
    },
    mimetype:{
        type: String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    downloadCounts:{
        type:Number,
        default:0
    },
    maxDownloads:{
        type:Number,
        default:null
    },

    expiryAt:{
        type:Date,
        required:true,
        index:true
    }
},{
    timestamps:true
});

const uploadModel = mongoose.model("Transfer",uploadSchema);

export default uploadModel