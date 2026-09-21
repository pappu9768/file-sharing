import express from 'express';
import { multerStorage } from '../middlewares/multer.js';
import { uploadFileToB2 } from '../controllers/upload.controller.js';
import { downloadFile } from '../controllers/download.controller.js';

const uploadRoutes = express.Router();

uploadRoutes.post('/upload',multerStorage.single("file"),uploadFileToB2)

uploadRoutes.get('/download/:transferId',downloadFile)
export default uploadRoutes