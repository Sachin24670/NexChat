import User from "../model/User.model.js";
import { generateToken } from "../utils/token.util.js";
import bcrypt from "bcrypt";
import {renameSync, unlinkSync} from "fs"

export const signup = async (req, res) => {
  const { email, firstName, lastName, password, profilePic } = req.body;
  try {
    if (!email || !password || !firstName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must me greater than 6 characters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      profilePic,
      password: hashedPassword,
    });

    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);

      res.status(201).json({
        success:true,
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      });
    } else {
      return res.status(400).json({ message: "Something went Wrong" });
    }
  } catch (error) {
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    generateToken(user._id, res);
    res.status(200).json({
      user: {
        ...user._doc,
        password: null,
      },
    });
  } catch (error) {
    console.log(`Internal Error ${error}`);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

export const logout = async(req,res)=>{
  try {
    res.cookie("jwt_token","",{maxAge:0})
    res.status(200).json({ message: "Successfully logout" });

  } catch (error) {
     console.log("Internal Server Error");
  }
}

export const getUserInfo = async (req, res) => {
  try {
    const userData = await User.findById(req.userId)
    if(!userData){
      return res.status(200).json({message:"Invalid Credentials"})
    }
    return res.status(200).json({
        UserId:userData._id,
        email:userData.email,
        firstName:userData.firstName,
        lastName:userData.lastName,
        profileSetup : userData.profileSetup,
        profileImage: userData.profileImage
    });
  } catch (error) {
    console.log(`Internal Error ${error}`);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userID = req.userId;
    const {firstName, lastName} = req.body
    if (!firstName || !lastName) {
      return res.status(400).json({ message: "Enter First and Last name" });
    }
    const userData = await User.findByIdAndUpdate(userID ,{
      firstName, lastName, profileSetup:true},
      {new:true, runValidators:true}
    )


    return res.status(200).json({
      UserId: userData._id,
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      profileSetup: userData.profileSetup,
    });
  } catch (error) {
    console.log(`Internal Error ${error}`);
    res.status(500).json({ message: `Internal Server Error` });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const currDate = Date.now();
    const filename = "uploads/profiles/"+currDate + req.file.originalname;

    renameSync(req.file.path, filename);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      { profileImage: filename },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      profileImage: updatedUser.profileImage,
    });
  } catch (error) {
    console.error(`Internal Error: ${error}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeProfileImage = async (req, res) => {
  try {
    const userID = req.userId;
    const user = await User.findById(userID)
    if(!user){
      return res.status(400).json("User not found")
    }
    if(user){
      unlinkSync(user.profileImage)
    }

    user.profileImage = null
    await user.save()

    return res.status(200).json({
      success:true,
      message:"Profile image Deleted Successfully"
    });
  } catch (error) {
    console.log(`Internal Error ${error}`);
    res.status(500).json({ message: `Internal Server Error` });
  }
};