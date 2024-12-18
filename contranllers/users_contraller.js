import User from "../models/users_model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ==============================================+

//         + signup logic +

// ==============================================+
export const signup = async (req, res) => {
  try {
    const { name, mobile, email, password, usertype } = req.body;
    if (!name || !mobile || !email || !password || !usertype) {
      return res.status(400).json({ message: "something is missing" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "user already exists" });
    }
    const hasPassword = await bcrypt.hash(password, 10);
    const creatuser = new User({
      name,
      mobile,
      email,
      password: hasPassword,
      usertype,
    });
    await creatuser.save();
    res.status(200).json({
      message: "user created successfull",
      // token: await creatuser.genrateToken(),
      userid: creatuser._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "intern server error" ,error});
  }
};

// ==============================================+

//         + login logic +

// ==============================================+

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }
    const tokendata={userId:user._id}
    // console.log(tokendata );
    
    const token= jwt.sign(tokendata,process.env.JWT_KEY,{expiresIn:"1d"})
   
    res.status(201).cookie("token",token,{maxAge: 1 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",}).json({message:`welcome back ${user.name} ! `,user})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

// ==============================================+

//         + update profile logic +

// ==============================================+

export const updateprofile = (req, res) => {
  try {
    const { name, email, mobile, skills, bio } = req.body;
    if (!name || !email || !mobile || !skills || !bio) {
      res.status(400).json({ message: "something is missing" });
    }
    const skillsArr = skills.split(",");
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};



// ==============================================+

//         + loguot  logic +

// ==============================================+


export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .clearCookie("token", {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict",
        path: "/",
      })
      .json({ message: "Logged out successfully!" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
