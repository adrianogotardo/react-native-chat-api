import { userSchema } from "../../schemas/User";

async function getUserByEmail(email) {
    return userSchema.findOne({ email }).exec();
};

export { getUserByEmail }