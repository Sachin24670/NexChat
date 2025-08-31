import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  firstName: {
    type: String,    
  },
  lastName: {
    type: String,
  },profileImage:{
    type:String
  },profileSetup:{
    type:Boolean,
    default:false
  }
});

// userSchema.pre("save" , async function (next){
//     this.password = await bcrypt.hash(this.password, 10)
// })

const User = mongoose.model("Users",userSchema)

export default User