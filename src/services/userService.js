import { User } from "../../schemas/User.js";

async function getUserByEmail(email) {
    return User.findOne({ email }).exec();
};

export { getUserByEmail }