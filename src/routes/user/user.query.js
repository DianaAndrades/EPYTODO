import dbConn from './../../config/db.js';
import { INITIAL_RESPONSE, RESPONSE_MESSAGES, STATUS_CODES } from "../../utils/constants.js";
import { deleteUserById, deleteUserTodos, getTodosByUserId, getUserByEmail, getUserById } from "../../utils/queries.js";
import { generateErrorMessage } from '../../utils/index.js';

export const getLoggedInUser = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const query = getUserById;
    const { userId } = req;

    try {
        const [rows] = await dbConn.promise().execute(query, [userId]);

        response.status = STATUS_CODES.OK;
        response.msg = rows[0];
    } catch (err) {
        console.error(generateErrorMessage('user.query.js', 'getLoggedInUser', err));
    }

    res.status(response.status).send(response.msg);
};

export const getLoggedInUserTodos = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const query = getTodosByUserId;
    const { userId } = req;

    try {
        const [rows] = await dbConn.promise().execute(query, [userId]);

        response.status = STATUS_CODES.OK;
        response.msg = rows;
    } catch (err) {
        console.error(generateErrorMessage('user.query.js', 'getLoggedInUser', err));
    }

    res.status(response.status).send(response.msg);
};

export const getByAttr = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const { attr } = req.params;
    const isId = !isNaN(Number(attr));
    const query = isId ? getUserById : getUserByEmail;

    try {
        const [rows] = await dbConn.promise().execute(query, [attr]);

        response.status = rows.length > 0 ? STATUS_CODES.OK : STATUS_CODES.NOT_FOUND;
        response.msg = rows.length > 0 ? rows[0] : { msg: RESPONSE_MESSAGES.NOT_FOUND };
    } catch (err) {
        console.error(generateErrorMessage('user.query.js', 'getByAttr', err));
    }

    res.status(response.status).send(response.msg);
};

export const updateUser = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const attrList = ['email', 'password', 'created_at', 'firstname', 'name'];
    const { id } = req.params;
    const isId = !isNaN(Number(id));

    const attrValuePair = attrList.reduce((prev, curr) => {
        if (req.body[curr]) {
            return {
                ...prev,
                [curr]: curr === 'password' ? bcrypt.hashSync(req.body[curr]) : req.body[curr],
            };
        }
        return prev;
    }, {});

    const query = `UPDATE user SET ${Object.entries(attrValuePair)
        .map(([key, value]) => `${key} = '${value}'`).join(', ')} WHERE id = ?;`;

    try {
        if (isId) {
            if (Object.keys(attrValuePair).length === 0) {
                response.status = STATUS_CODES.BAD_REQUEST;
                response.msg = { msg: RESPONSE_MESSAGES.BAD_PARAMETER };
    
                throw new Error('No valid parameters detected');
            }
    
            await dbConn.promise().execute(query, [id]);
            const query2 = getUserById;
            const [rows] = await dbConn.promise().execute(query2, [id]);
    
            response.status = rows.length !== 0 ? STATUS_CODES.OK : STATUS_CODES.NOT_FOUND;
            response.msg = rows.length !== 0 ? rows[0] : { msg: RESPONSE_MESSAGES.NOT_FOUND };
        } else {
            response.status = STATUS_CODES.BAD_REQUEST;
            response.msg = { msg: RESPONSE_MESSAGES.BAD_PARAMETER };
        }
    } catch (err) {
        console.error(generateErrorMessage('user.query.js', 'update', err));
    }

    res.status(response.status).send(response.msg);
};

export const deleteUser = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const deleteTodosQuery = deleteUserTodos;
    const query = deleteUserById;
    const { id } = req.params;
    const isId = !isNaN(Number(id));

    try {
        if (isId) {
            await dbConn.promise().execute(deleteTodosQuery, [id]);
    
            const [res] = await dbConn.promise().execute(query, [id]);
    
            response.status =  res.affectedRows === 1 ? STATUS_CODES.OK : STATUS_CODES.NOT_FOUND;
            response.msg = res.affectedRows === 1 ? { msg: RESPONSE_MESSAGES.DELETED(id) } : { msg: RESPONSE_MESSAGES.NOT_FOUND };
        } else {
            response.status = STATUS_CODES.BAD_REQUEST;
            response.msg = { msg: RESPONSE_MESSAGES.BAD_PARAMETER };
        }
    } catch (err) {
        console.error(generateErrorMessage('user.query.js', 'deleteUser', err));
    }

    res.status(response.status).send(response.msg);
};