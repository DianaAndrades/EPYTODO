import { INITIAL_RESPONSE, RESPONSE_MESSAGES, STATUS_CODES } from "../../utils/constants.js";
import { findByEmail, insertUser } from "../../utils/queries.js";
import bcrypt from 'bcryptjs';
import dbConn from '../../config/db.js';
import jwt from 'jsonwebtoken';
import { generateErrorMessage } from "../../utils/index.js";

const TOKEN_SECRET = process.env.SECRET;

const isAlreadyRegistered = async (email) => {
    const query = findByEmail;

    try {
        const [rows] = await dbConn.promise().execute(query, [email]);
        return [rows.length > 0, rows[0]];
    } catch (err) {
        throw new Error(generateErrorMessage('auth.query.js', 'isAlreadyRegistered', err));
    }
};

export const register = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const { email, name, firstname, password } = req.body;
    let goodParams = true;

    if (!email || !name || !firstname || !password) {
        response.status = STATUS_CODES.BAD_REQUEST;
        response.msg = { msg: RESPONSE_MESSAGES.BAD_PARAMETER };
        goodParams = false;
    }
    try {
        if (goodParams) {
            const [isRegistered] = await isAlreadyRegistered(email);
            if (isRegistered) {
                response.status = STATUS_CODES.BAD_REQUEST;
                response.msg = { msg: RESPONSE_MESSAGES.ACCOUNT_ALREADY_EXISTS };
            } else {
                const query = insertUser;
                const hashedPassword = bcrypt.hashSync(password);
                const [rows] = await dbConn.promise().execute(query, [email, name, firstname, hashedPassword]);
        
                response.msg = { token: jwt.sign({ id: rows.insertId }, TOKEN_SECRET) };
                response.status = STATUS_CODES.CREATED;
            }
        }
    } catch (err) {
        console.error(generateErrorMessage('auth.query.js', 'register', err));
    }

    res.status(response.status).send(response.msg);
};

const existsWithEmailAndPassword = async (email, password) => {
    try {
        const [isRegistered, userCredentials] = await isAlreadyRegistered(email);

        if (!isRegistered) {
            return [false, undefined];
        }
        return [await bcrypt.compare(password, userCredentials.password), userCredentials.id];
    } catch (err) {
        throw new Error(generateErrorMessage('auth.query.js', 'existsWithEmailAndPassword', err));
    }
}

export const login = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const { email, password } = req.body;
    let goodParams = true;

    if (!email || !password) {
        response.status = STATUS_CODES.BAD_REQUEST;
        response.msg = { msg: RESPONSE_MESSAGES.BAD_PARAMETER };
        goodParams = false;
    }
    try {
        if (goodParams) {
            const [exists, id] = await existsWithEmailAndPassword(email, password);
    
            if (!exists || !id) {
                response.msg = { msg: RESPONSE_MESSAGES.INVALID_CREDENTIALS };
                response.status = STATUS_CODES.BAD_REQUEST;
            } else {
                response.msg = { token: jwt.sign({ id }, TOKEN_SECRET) };
                response.status = STATUS_CODES.OK;
            }
        }
    } catch (err) {
        console.error(generateErrorMessage('auth.query.js', 'login', err));
    }

    res.status(response.status).send(response.msg);
};