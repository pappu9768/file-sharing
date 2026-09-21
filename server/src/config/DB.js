import mongoose from 'mongoose';


 const connectDb = async() => {
    try {
        const connection = await mongoose.connect(process.env.DATABASE_URL,{
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000
        });

        console.log(`Database connected: ${connection.connection.host}`)
    } catch (error) {
        console.log("Error found while connecting database",error)
        process.exit(1)
    }
}

export default connectDb;