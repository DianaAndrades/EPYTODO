import { generateErrorMessage } from "../../utils/index.js";
import { INITIAL_RESPONSE, RESPONSE_MESSAGES, STATUS_CODES } from "../../utils/constants.js"
import { deleteTodo, getTodoById, getTodos, insertTodo } from "../../utils/queries.js";
import dbConn from './../../config/db.js';

export const getAllTodos = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const query = getTodos;

    try {
        const [rows] = await dbConn.promise().execute(query);

        response.status = STATUS_CODES.OK;
        response.msg = rows;
    } catch (err) {
        console.error(generateErrorMessage('todos.query.js', 'getAllTodos', err));
    }
    res.status(response.status).send(response.msg);
};

export const getTodosById = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const { id } = req.params;
    const isId = !isNaN(Number(id));
    const query = getTodoById;

    try {
        if (isId) {
            const [rows] = await dbConn.promise().execute(query, [id]);
            response.status = rows.length > 0 ? STATUS_CODES.OK : STATUS_CODES.NOT_FOUND;
            response.msg = rows.length > 0 ? rows[0] : { msg: RESPONSE_MESSAGES.NOT_FOUND };
        } else {
            response.status = STATUS_CODES.BAD_REQUEST;
            response.msg = { msg: RESPONSE_MESSAGES.BAD_PARAMETER };
        }
    } catch (err) {
        console.error(generateErrorMessage('todos.query.js', 'getTodosById', err));
    }
    res.status(response.status).send(response.msg);
};

export const createTodos = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const { title, description, due_time, user_id, status } = req.body;
    const query = insertTodo;
    let goodParams = true;

    if (!title || !description || !due_time || !user_id || !status) {
        response.status = STATUS_CODES.BAD_REQUEST;
        response.msg = { msg: RESPONSE_MESSAGES.BAD_PARAMETER };
        goodParams = false;
    }

    try {
        if (goodParams) {
            const [rows] = await dbConn.promise().execute(query, [title, description, due_time, user_id, status]);
            const insertedId = rows.insertId;
            const query2 = getTodoById;
            const [res] = await dbConn.promise().execute(query2, [insertedId]);

            response.status = STATUS_CODES.CREATED;
            response.msg = res[0];
        }
    } catch (err) {
        console.error(generateErrorMessage('todos.query.js', 'createTodos', err));
    }
    res.status(response.status).send(response.msg);
};

export const updateTodos = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const attrList = ['title', 'description', 'due_time', 'user_id', 'status'];
    const { id } = req.params;
    const isId = !isNaN(Number(id));
    const attrValuePair = attrList.reduce((prev, curr) => {
        if (req.body[curr]) {
            return {
                ...prev,
                [curr]: req.body[curr],
            };
        }
        return prev;
    }, {});

    const query = `UPDATE todo SET ${Object.entries(attrValuePair)
        .map(([key, value]) => `${key} = '${value}'`).join(', ')} WHERE id = ?;`;

    try {
        if (isId) {
            if (Object.keys(attrValuePair).length === 0) {
                response.status = STATUS_CODES.BAD_REQUEST;
                response.msg = { msg: RESPONSE_MESSAGES.BAD_PARAMETER };
    
                throw new Error('No valid parameters detected');
            }
            await dbConn.promise().execute(query, [id]);
            const query2 = getTodoById;
            const [rows] = await dbConn.promise().execute(query2, [id]);
    
            response.status = rows.length !== 0 ? STATUS_CODES.OK : STATUS_CODES.NOT_FOUND;
            response.msg = rows.length !== 0 ? rows[0] : { msg: RESPONSE_MESSAGES.NOT_FOUND };
        } else {
            response.status = STATUS_CODES.BAD_REQUEST;
            response.msg = { msg: RESPONSE_MESSAGES.BAD_PARAMETER };
        }
    } catch (err) {
        console.error(generateErrorMessage('todos.query.js', 'updateTodos', err));
    }

    res.status(response.status).send(response.msg);
};

export const deleteTodos = async (req, res) => {
    const response = {
        ...INITIAL_RESPONSE,
    };
    const query = deleteTodo;
    const { id } = req.params;
    const isId = !isNaN(Number(id));

    try {
        if (isId) {    
            const [res] = await dbConn.promise().execute(query, [id]);    
            response.status =  res.affectedRows === 1 ? STATUS_CODES.OK : STATUS_CODES.NOT_FOUND;
            response.msg = res.affectedRows === 1 ? { msg: RESPONSE_MESSAGES.DELETED(id) } : { msg: RESPONSE_MESSAGES.NOT_FOUND };
        } else {
            response.status = STATUS_CODES.BAD_REQUEST;
            response.msg = { msg: RESPONSE_MESSAGES.BAD_PARAMETER };
        }
    } catch (err) {
        console.error(generateErrorMessage('todos.query.js', 'deleteTodos', err));
    }

    res.status(response.status).send(response.msg);
};