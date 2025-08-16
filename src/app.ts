import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./config/db";
dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT || "4040", 10);

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, Team Collaboration Tool');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
