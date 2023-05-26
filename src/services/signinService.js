import { Session } from "../schemas/Session.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

async function comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

function createToken(user) {
    const newToken = jwt.sign({'UserInfo': user}, process.env.JWT_SECRET_KEY);
    return newToken;
}

async function createSession(token, userId) {
    const newSession = new Session({token, userId});
    return newSession;
};

export { comparePasswords, createToken, createSession }