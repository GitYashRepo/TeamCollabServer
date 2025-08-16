import { Router } from "express";
import { Signup, Login, Logout } from "../AppController/Auth";

const router = Router();

/**
 * @route POST /auth/signup
 * @desc Create a new user
*/
router.post("/signup", Signup);

/**
 * @route POST /auth/login
 * @desc Login a user
*/
router.post("/login", Login);

/**
 * @route POST /auth/logout
 * @desc Logout a user || (blacklists current token)
*/
router.post("/logout", Logout);

export default router;
