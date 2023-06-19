import {
    register,
    login,
} from './../routes/auth/auth.query.js';

import {
    getLoggedInUser,
    getLoggedInUserTodos,
    getByAttr,
    updateUser,
    deleteUser,
} from "../routes/user/user.query.js";

import {
    getAllTodos,
    getTodosById,
    createTodos,
    updateTodos,
    deleteTodos,
} from "../routes/todos/todos.query.js";

export const authRoutes = [
    ['post', '/register', register],
    ['post', '/login', login],
];

export const userRoutes = [
    ['get', '', getLoggedInUser],
    ['get', '/todos', getLoggedInUserTodos],
    ['get', '/:attr', getByAttr],
    ['put', '/:id', updateUser],
    ['delete', '/:id', deleteUser],
];

export const todoRoutes = [
    ['get', '', getAllTodos],
    ['get', '/:id', getTodosById],
    ['post', '', createTodos],
    ['put', '/:id', updateTodos],
    ['delete', '/:id', deleteTodos],
];