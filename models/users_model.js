import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const uesrSchma = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  usertype:{
    type:String,
    required:true,
  },
  profile:{
    bio:{
      type:String,
    },
    skills:[{type:String}],
    resume:{type:String},
    company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'},
    profilePhoto:{type:String,default:''}
  }

},{timestamps:true});

// uesrSchma.methods.genrateToken = async function () {
//   try {
//     return jwt.sign(
//       {
//         userid: this._id.toString(),
//         email: this.email,
//       },
//       process.env.JWT_KEY,
//       {
//         expiresIn: "1h",
//       }
//     );
//     r
//   } catch (error) {
//     console.error(error);
//   }
// };

const User = mongoose.model("user", uesrSchma);

export default User;
