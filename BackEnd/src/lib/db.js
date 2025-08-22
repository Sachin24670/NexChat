import mongoose from "mongoose"

export const connectDB = async()=>{
    try{
        let conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongo DB connected successfully , ${conn.connection.host}`)
    }catch(error){
        console.log("Mongo Connection error : "+error)
    }

}
