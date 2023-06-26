import { RequestHandler, UR } from 'express';
import axios from 'axios';

import Book, { BookDocument } from '../models/bookModel';
import { Types } from 'mongoose';

export const getBooks: RequestHandler<{}, { data?: BookDocument[], message: string }, {}, {
    title?: string;
    author?: string,
    description?: string,
    code?: string,
}> = async (req, res) => {
    const params = new URLSearchParams({
        ...req.query,
    });

    const url = `http://books_service:8040/books?${params.toString()}`;

    try {
        const sres = await axios.get(url);
        const books = sres.data;
        if (!books) throw new Error("No books found");
        res.status(200).json({ data: books, message: "Books retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const createBook: RequestHandler<{}, { message: string, data?: BookDocument & { _id: Types.ObjectId } }, BookDocument, {}> = async (req, res) => {
    try {
        const sres = await axios.post('http://books_service:8040/books', req.body);
        const book = sres.data;
        // if (!book) throw new Error("Book not found");
        res.status(201).json({ data: book, message: "Book created successfully" });
    } catch (err: any) {
        res.status(409).json({ message: err.message });
    }
}

export const getBook: RequestHandler<{ id: string }, { data?: BookDocument, message: string }, {}, {}> = async (req, res) => {
    try {
        const { id } = req.params;
        const sres = await axios.get(`http://books_service:8040/books/${id}`);
        const book = sres.data;
        if (!book) throw new Error("Book not found");
        res.status(200).json({ data: book, message: "Book retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteBook: RequestHandler<{ id: string }, { message: string }, {}, {}> = async (req, res) => {
    const { id } = req.params;
    try {
        const sres = await axios.delete(`http://books_service:8040/books/${id}`);
        const book = sres.data;
        if (!book) throw new Error("Book not found");
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const updateBook: RequestHandler<{ id: string }, { message: string, data?: BookDocument }, Partial<BookDocument>, {}> = async (req, res) => {
    const { id } = req.params;
    try {
        const sres = await axios.patch(`http://books_service:8040/books/${id}`, req.body);
        const book = sres.data;
        if (!book) throw new Error("Book not found");
        res.status(200).json({ data: book, message: "Book updated successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const issueBook: RequestHandler<{ id: string }, { message: string, data?: BookDocument }, { studentID: string }, {}> = async (req, res) => {
    const { id } = req.params;
    const { studentID } = req.body;
    try {
        const sres = await axios.patch(`http://books_service:8040/books/${id}`, { studentID });
        const book = sres.data;
        if (!book) throw new Error("Book not found");
        const sres2 = await axios.patch(`http://students_service:8040/students/${studentID}/addBook`, { bookID: id });
        const student = sres2.data;
        if (!student) throw new Error("Student not found");
        res.status(200).json({ data: book, message: "Book issued successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}