import jwt from "jsonwebtoken"

export const generateToken = (userID , res)=>{
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    })

    res.cookie("jwt_token",token,{
        maxAge: 7 * 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure:process.env.NODE_ENV !== "development",
        sameSite : "None"
    })

    return token
}