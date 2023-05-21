import * as signupService from '../services/signupService.js';
import * as userService from '../services/userService.js';

async function signup(req, res) {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            'message': 'Name, email and password are required.'
        });
    };

    const unavailableEmail = await userService.getUserByEmail(email);
    if(unavailableEmail) {
        return res.sendStatus(409);
    };

    try {
        const newUser = await signupService.createUser(name, email, password);

        const newUserValidation = newUser.validateSync();
        if(newUserValidation) {
            return res.status(422).json({
                message: newUserValidation.errors
            });
        };

        const hashedPassword = await signupService.hashPassword(password);
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