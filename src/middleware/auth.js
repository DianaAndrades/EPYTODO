import jwt from 'jsonwebtoken';
import { generateErrorMessage } from '../utils/index.js';
import { INITIAL_RESPONSE, RESPONSE_MESSAGES, STATUS_CODES } from '../utils/constants.js';

const authMiddleware = (req, res, next) => {
    const response = {
        ...INITIAL_RESPONSE,
    }
    const TOKEN_SECRET = process.env.SECRET;
    const tokenHeader = req.get('Authorization');
    const token = tokenHeader ? tokenHeader.split('Bearer ')[1] : undefined;

    try {
        if (!token) {
            response.msg = {msg: RESPONSE_MESSAGES.NO_TOKEN };
            response.status = STATUS_CODES.UNAUTHORIZED;
            throw new Error('No token');
        }
        const { id } = jwt.verify(token, TOKEN_SECRET);
        req.userId = id;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            response.msg = { msg: RESPONSE_MESSAGES.TOKEN_NOT_VALID };
            response.status = STATUS_CODES.UNAUTHORIZED;
        }
        console.error(generateErrorMessage('auth.js', 'authMiddleware', err));
        res.status(response.status).send(response.msg)
    }
}

export default authMiddleware;