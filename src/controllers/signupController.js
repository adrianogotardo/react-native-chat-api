import { createUser, hashPassword } from '../services/signupService.js';
import { getUserByEmail } from '../services/userService.js';

async function signup(req, res) {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).send({message: 'Name, email and password are required'});
    };

    const unavailableEmail = await getUserByEmail(email);
    if(unavailableEmail) {
        return res.status(409).send({message: "Email already in use"});
    };

    try {
        const newUser = await createUser(name, email, password);

        const newUserValidation = newUser.validateSync();
        if(newUserValidation) {
            return res.status(422).json({
                message: newUserValidation.errors
            });
        };

        const hashedPassword = await hashPassword(password);
        newUser.password = hashedPassword;
        await newUser.save();
        res.status(201).json({
            success: `New user ${name} created!`
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export { signup }