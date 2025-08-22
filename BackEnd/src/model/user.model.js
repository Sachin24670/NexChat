import mongoose from "mongoose"

const userScheme = new mongoose.Schema(
    {
        email:{
            type:String,
            require:true,
            unigue:true
        },
        fullName:{
            type:String,
            require:true
        },
        password:{
            type:String,
            require:true,
            minlength: 6
        },profilePic:{
            type:String,
            default:""
        }
    },
    {timestamps: true}
)

const User = mongoose.model("User" , userScheme)

export default User