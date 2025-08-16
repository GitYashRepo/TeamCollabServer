import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";
import { blacklistToken } from "../Middleware/Auth.js";

/**
 * @route POST /auth/signup
 * @desc Create a new user
*/
const Signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    if (!name || !email || !password) return res.status(400).json({ message: "name, email, password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash, role: role === "admin" ? "admin" : "user" });

    return res.status(201).json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    return res.status(500).json({ message: "Signup failed", error: String(err) });
  }
};

/**
 * @route POST /auth/login
 * @desc Login a user
*/
const Login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id.toString(), email: user.email, role: user.role }, process.env.JWT_SECRET || "", { expiresIn: "7d" });
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    return res.status(500).json({ message: "Login failed", error: String(err) });
  }
};

/**
 * @route POST /auth/logout
 * @desc Logout a user || (blacklists current token)
*/
const Logout = (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
  if (!token) return res.status(400).json({ message: "No token provided" });
  blacklistToken(token);
  return res.json({ message: "Logged out" });
};

export {
  Signup,
  Login,
  Logout
}
