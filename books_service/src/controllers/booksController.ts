import { RequestHandler } from 'express';

import Book, { BookDocument } from '../models/bookModel';
import { Types } from 'mongoose';

export const getBooks: RequestHandler<{}, { data?: BookDocument[], message: string }, {}, {
    title?: string;
    author?: string,
    description?: string,
    code?: string,
}> = async (req, res) => {
    try {
        const books = await Book.find(req.query).populate('issuedTo');
        if (!books) throw new Error("No books found");
        res.status(200).json({ data: books, message: "Books retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const createBook: RequestHandler<{}, { message: string, data?: BookDocument & { _id: Types.ObjectId } }, BookDocument, {}> = async (req, res) => {
    const book = req.body;
    const newBook = new Book(book);
    try {
        await newBook.save();
        res.status(201).json({ data: newBook, message: "Book created successfully" });
    } catch (err: any) {
        res.status(409).json({ message: err.message });
    }
}

export const getBook: RequestHandler<{ id: string }, { data?: BookDocument, message: string }, {}, {}> = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id).populate('issuedTo');
        if (!book) throw new Error("Book not found");

        res.status(200).json({ data: book, message: "Book retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteBook: RequestHandler<{ id: string }, { message: string }, {}, {}> = async (req, res) => {
    const { id } = req.params;
    try {
        const book = Book.findByIdAndRemove(id);
        if (!book) throw new Error("Book not found");
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const updateBook: RequestHandler<{ id: string }, { message: string, data?: BookDocument }, Partial<BookDocument>, {}> = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!book) throw new Error("Book not found");
        res.status(200).json({ data: book, message: "Book updated successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

// export const issueBook: RequestHandler<{ id: string }, { message: string, data?: BookDocument }, { studentID: string }, {}> = async (req, res) => {
//     const { id } = req.params;
//     const { studentID } = req.body;
//     try {
//         const book = await Book.findByIdAndUpdate(id, { issuedTo: studentID }, { new: true });
//         if (!book) throw new Error("Book not found");
//         res.status(200).json({ data: book, message: "Book issued successfully" });
//     } catch (err: any) {
//         res.status(404).json({ message: err.message });
//     }
// }