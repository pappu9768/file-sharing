import express from 'express';
import { configDotenv } from 'dotenv';
import connectDb from './src/config/DB.js'
// import { testB2 } from './src/utills/toB2.js';
import cors from 'cors';
import uploadRoutes from './src/routes/upload.routes.js';
configDotenv()

const app = express();

// app.use(express.json());
app.use(cors({
    origin:'http://localhost:5173'
}))
await connectDb()
app.use('/api/v1',uploadRoutes);


const port = process.env.PORT || 3000
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

// export default app