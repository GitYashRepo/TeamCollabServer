import jwt from "jsonwebtoken";

// In-memory blacklist for demo purposes (consider Redis for production)
const tokenBlacklist = new Set();

export const blacklistToken = (token) => tokenBlacklist.add(token);

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;

  if (!token) return res.status(401).json({ message: "Authorization token missing" });
  if (tokenBlacklist.has(token)) return res.status(401).json({ message: "Token is blacklisted (logged out)" });

  try {
    const secret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
