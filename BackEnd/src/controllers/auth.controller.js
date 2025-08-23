import User from "../model/user.model.js"
import { generateToken } from "../utils/token.util.js";
import bcrypt from "bcrypt"
import cloudinary from "../lib/cloudinary.js";

export const signup = async(req,res)=>{
    const { email, fullName, password, profilePic } = req.body;
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must me greater than 6 characters"})
        }
        
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User already exist"})
        }

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password ,salt)
         const newUser = new User({
            fullName,
            email,
            profilePic,
            password:hashedPassword
         })

         if(newUser){
            await newUser.save()
            generateToken(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            })
         }else{
            return res.status(400).json({message: "Something went Wrong"})
         }
        

    } catch (error) {
        res.status(400).json({message:"Internal Server Error"})
    }
}

export const login = async(req, res) => {
  const {email,password} = req.body
  try {
    const user = await User.findOne({email}) 

    if(!user){
        return res.status(400).json({message:"Invalid Credentials"})
    }

    const isPasswordCorrect = await bcrypt.compare(password , user.password)

    if(!isPasswordCorrect){
                return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id,res)
    res.status(200).json({user:{
        ...user._doc,
        password:null
    }})
  } catch (error) {
    console.log(`Internal Error ${error}`)
    res.status(500).json({message:`Internal Server Error`})
  }
};

export const logout = async(req, res) => {
    try {
        await res.cookie("jwt_token", "",{maxAge:0});
        res.status(200).json({message:"Successfully logout"})
    } catch (error) {
        console.log("Internal Server Error")
    }
};

export const updateProfile = async(req,res)=>{
    try {
        const {profilePic} = req.body
        const userID = req.user._id

        if(!profilePic){
                        res
                          .status(400)
                          .json({ message: "Profile Picture is required" });
            
            const uploadRes = await cloudinary.uploader.upload(profilePic)
            const updatedUser = await User.findById(userID,{profilePic:uploadRes.secure_url},{new:true})

                        res
                          .status(200)
                          .json({updatedUser});

        }
    } catch (error) {
        console.log(`Error in updating the profile ${error}`)
        res.status(500).json({message:"Internal server error"})
    }
}

export const checkAuth = (req,res)=>{
    try {
        res.status(200).json({success:true , user:req.user})
    } catch (error) {
        console.log("Error in checkAuth controller ", error.message)
        res.status(500).json({message:"Internal Server Error"})

    }
}