import dotenv from "dotenv";
dotenv.config();
import express from "express"
const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import expressSession from "express-session";

// MongoDB Connection
import connectToDb from "./Config/db";

// Routes
import indexRouter from './Routes/Index';
import TaskRouter from './Routes/Task';
import AuthRouter from './Routes/Auth';

// --- MIDDLEWARES ---
// ✅ Cookie parser FIRST
app.use(cookieParser());
// ✅ CORS
const corsOptions = {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// JSON & URL encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Express Session (after cookieParser, before passport)
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: "none",
    },
}));

// --- ROUTES ---
connectToDb();

app.use("/", indexRouter);
app.use("/tasks", TaskRouter);
app.use("/auth", AuthRouter);

// --- START SERVER ---
const port = process.env.PORT || 4040;

app.listen(port, () => {
    console.log(`🚀 Server started on http://localhost:${port}`);
});
