import User from "../model/user.model.js"
import { generateToken } from "../utils/token.util.js";
import bcrypt from "bcrypt"

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

export const login = (req, res) => {
  res.send("login");
};

export const logout = (req, res) => {
  res.send("logout");
};