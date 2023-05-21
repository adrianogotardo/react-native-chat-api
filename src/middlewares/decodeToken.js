import jwt from 'jsonwebtoken';

function decodeToken(req, res, next) {
    if(!req.headers.authorization) return res.sendStatus(401);

    const token = req.headers.authorization.split(' ', [1]);

    const secretKey = process.env.JWT_SECRET_KEY;

    jwt.verify(token, secretKey, (error, decodedInfo) => {
        if(error) return res.sendStatus(403);
        req.user = decodedInfo.userInfo;
    });
};

export { decodeToken }