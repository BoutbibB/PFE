import {User} from "../models/User.js";
import {Blacklist} from '../models/Blacklist.js';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

export const userVerification = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ status: false });

    const checkIfBlacklisted = await Blacklist.findOne({ token });
    if (checkIfBlacklisted) return res.status(401).json({ status: false });

    try {
        const data = await jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(data.id);
        if (user) {
            req.user = data;
            return res.json({ status: true, user: user.name });
        } else {
            return res.status(401).json({ status: false });
        }
    } catch (err) {
        return res.status(401).json({ status: false });
    }
};
