import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import { authRouter, todoRouter, userRouter } from './routes/index.js';

dotenv.config();

const PORT = process.env.SERVER_PORT;

const app = express();

app.use(bodyParser.json());

app.use('/todos', todoRouter);
app.use('/user', userRouter);
app.use('/users', userRouter);
app.use('/', authRouter);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
