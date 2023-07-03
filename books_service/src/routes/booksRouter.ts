import express from 'express';
import { getBooks, createBook, getBook, deleteBook, updateBook } from '../controllers/booksController';

const booksRouter = express.Router();

booksRouter.
    route('/')
    .get(getBooks)
    .post(createBook);

booksRouter.
    route('/:code')
    .get(getBook)
    .delete(deleteBook)
    .patch(updateBook);


export default booksRouter;