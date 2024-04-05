import { User } from "../models/User.js"
import { createSecretToken } from "../util/SecretToken.js";
import bcrypt from "bcrypt" 
import { Blacklist} from '../models/Blacklist.js';

export async function logout(req, res) {
    try {
        const authHeader = req.headers['cookie'];
        if (!authHeader) return res.sendStatus(204); 

        const cookie = authHeader.split('=')[1];
        const accessToken = cookie.split(';')[0];

        const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken });
        if (checkIfBlacklisted) return res.sendStatus(204);

        const newBlacklist = new Blacklist({ token: accessToken });
        await newBlacklist.save();

        res.setHeader('Clear-Site-Data', '"cookies"');
        res.status(200).json({ message: 'You are logged out!' });
        console.log("User logged out!")
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
}


export const Signup = async (req, res, next) => {
  try {
    const { email, password, name, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, name, createdAt });
    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.status(401).json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.status(401).json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.status(401).json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true });
     console.log("Login successful");
     next()
  } catch (error) {
    console.error(error);
  }
}
