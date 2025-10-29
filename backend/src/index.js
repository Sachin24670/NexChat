import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import {connectDB} from "./lib/db.js"
import authRoutes from "./routes/auth.route.js"
import cors from "cors"
import contactsRoutes from "./routes/contact.route.js"


dotenv.config()
const app = express()

app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","POST","PUT","PATCH","DELETE"],
    credentials:true
}))

app.use("/uploads/profiles",express.static("uploads/profiles"))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth" , authRoutes)
app.use("api/contacts",contactsRoutes)


const PORT = process.env.PORT
app.listen(PORT , ()=>{
    console.log(`Runnig on Port ${PORT}`)
    connectDB()
})