import express from 'express';
import { getBooks, createBook, getBook, deleteBook, updateBook, issueBook,returnBook } from '../controllers/booksController';

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

booksRouter.
    route('/:code/issue')
    .patch(issueBook);

booksRouter.
    route('/:code/return')
    .patch(returnBook);


export default booksRouter;