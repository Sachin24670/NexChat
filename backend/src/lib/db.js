import mongoose from "mongoose";

export const connectDB =async()=>{ 
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connection with MONGODB Successfull")
    } catch (error) {
        console.log(`MongoDB connection error ${error}`)
    }

}
