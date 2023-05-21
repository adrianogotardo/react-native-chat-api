import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { decodeToken } from './middlewares/decodeToken';
import { connectDatabase } from './config/database';
import * as signupController from '../controllers/signupController';


const app = express();
app.use(express.json());
app.use(cors());

connectDatabase();

const router = express.Router();

router.post("/signup", signupController.signup);

const PORT = process.env.PORT | 5000;
mongoose.connection.once('open', () => {
    console.log("Connected do MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});