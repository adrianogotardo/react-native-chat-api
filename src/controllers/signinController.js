import { comparePasswords, createToken, createSession } from '../services/signinService.js';
import { getUserByEmail } from '../services/userService.js';

async function signin(req, res) {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).send({message: 'Email and password are required'});
    };

    const user = await getUserByEmail(email);
    if(!user) {
        return res.status(409).send({message: "User not found"});
    };

    const correctPassword = await comparePasswords(password, user.password);
    if(!correctPassword) {
        return res.status(401).send({message: "Wrong password"});
    }

    try {
        const token = createToken(user);

        const newSession = await createSession(token, user._id);
        await newSession.save();

        res.status(201).json({
            success: 'New session created',
            token: token
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export { signin }