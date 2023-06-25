import express from 'express'
import booksRouter from './routes/booksRouter';

const app: express.Application = express();

app.use(express.json());
app.use('/api/v1/books/', booksRouter);

export default app;