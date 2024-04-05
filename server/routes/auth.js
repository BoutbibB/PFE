import express from "express";
const router = express.Router();
import { Signup, Login, logout } from "../controllers/AuthController.js"
import { userVerification } from "../middlewares/AuthMiddleware.js";

router.post("/signup", Signup);
router.post('/login', Login);
router.post('/',userVerification);
router.post('/logout', logout);

export {router}