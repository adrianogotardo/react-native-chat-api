import { userSchema } from "../../schemas/User";
import bcrypt from 'bcrypt';

async function createUser(name, email, password) {
    const newUser = new userSchema({name, email, password});
    return newUser;
};

async function hashPassword(password) {
    return bcrypt.hash(password, 12);
}

export { createUser, hashPassword }