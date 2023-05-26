import { User } from "../schemas/User.js";
import bcrypt from 'bcrypt';

async function createUser(name, email, password) {
    const newUser = new User({name, email, password});
    return newUser;
};

async function hashPassword(password) {
    return bcrypt.hash(password, 12);
}

export { createUser, hashPassword }