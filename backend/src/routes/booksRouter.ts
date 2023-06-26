import express from 'express';
import { getBooks, createBook, getBook, deleteBook, updateBook, issueBook } from '../controllers/booksController';

const booksRouter = express.Router();

booksRouter.
    route('/')
    .get(getBooks)
    .post(createBook);

booksRouter.
    route('/:id')
    .get(getBook)
    .delete(deleteBook)
    .patch(updateBook);

booksRouter.
    route('/:id/issue')
    .patch(issueBook);


export default booksRouter;