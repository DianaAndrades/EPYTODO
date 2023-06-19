export const insertUser = 'INSERT INTO user (email, name, firstname, password) VALUES (?, ?, ?, ?)';
export const findByEmail = 'SELECT id, email, password FROM user WHERE email = ?';
export const getUserById = 'SELECT * FROM user WHERE id = ?';
export const getTodosByUserId = 'SELECT * FROM todo WHERE user_id = ?';
export const getUserByEmail = 'SELECT * FROM user WHERE email = ?';
export const deleteUserTodos = 'DELETE FROM todo WHERE user_id = ?';
export const deleteUserById = 'DELETE FROM user WHERE id = ?';

export const getTodos = 'SELECT * FROM todo';
export const getTodoById = 'SELECT * FROM todo WHERE id = ?';
export const insertTodo = 'INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)';
export const deleteTodo = 'DELETE FROM todo WHERE id = ?';