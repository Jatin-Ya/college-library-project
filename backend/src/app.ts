import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import booksRouter from './routes/booksRouter';
import studentsRouter from './routes/studentsRoutes';


const app: express.Application = express();

app.use(express.json());
app.use('/api/v1/books/', booksRouter);
app.use('/api/v1/students/', studentsRouter);

export default app;