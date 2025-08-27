import User from "../model/User.model.js";
import { generateToken } from "../utils/token.util.js";
import bcrypt from "bcrypt";

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