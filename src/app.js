import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { decodeToken } from './middlewares/decodeToken.js';
import { connectDatabase } from './config/database.js';
import * as signupController from './controllers/signupController.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

connectDatabase();

app.post("/signup", signupController.signup);

const PORT = process.env.PORT || 5000;
console.log(PORT);
mongoose.connection.once('open', () => {
    console.log("Connected do MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});