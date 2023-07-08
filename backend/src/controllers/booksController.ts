import { RequestHandler } from 'express';
import axios from 'axios';

import { BookDocument } from './Types';
import { Types } from 'mongoose';

export const getBooks: RequestHandler<{}, { books?: BookDocument[], message: string }, {}, {
    title?: string;
    author?: string,
    description?: string,
    code?: string,
}> = async (req, res) => {
    const params = new URLSearchParams({
        ...req.query,
    });

    console.log(params.toString());

    const url = `${process.env.books_service}/api/v1/books?${params.toString()}`;

    try {
        const sres = await axios.get(url);
        const books = sres.data.data;
        if (!books) throw new Error("No books found");
        res.status(200).json({ books, message: "Books retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const createBook: RequestHandler<{}, { message: string, book?: BookDocument & { _id: Types.ObjectId } }, BookDocument, {}> = async (req, res) => {
    try {
        const sres = await axios.post(`${process.env.books_service}/api/v1/books`, req.body);
        const book = sres.data.data;
        // if (!book) throw new Error("Book not found");
        res.status(201).json({ book, message: "Book created successfully" });
    } catch (err: any) {
        res.status(409).json({ message: err.message });
    }
}

export const getBook: RequestHandler<{ code: string }, { book?: BookDocument, message: string }, {}, {}> = async (req, res) => {
    try {
        const { code } = req.params;
        const sres = await axios.get(`${process.env.books_service}/api/v1/books/${code}`);
        const book = sres.data.data;
        if (!book) throw new Error("Book not found");
        res.status(200).json({ book, message: "Book retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteBook: RequestHandler<{ code: string }, { message: string }, {}, {}> = async (req, res) => {
    const { code } = req.params;
    try {
        const sres = await axios.delete(`${process.env.books_service}/api/v1/books/${code}`);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const updateBook: RequestHandler<{ code: string }, { message: string, book?: BookDocument }, Partial<BookDocument>, {}> = async (req, res) => {
    const { code } = req.params;
    try {
        const sres = await axios.patch(`${process.env.books_service}/api/v1/books/${code}`, req.body);
        const book = sres.data.data;
        if (!book) throw new Error("Book not found");
        res.status(200).json({ book, message: "Book updated successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const issueBook: RequestHandler<{ code: string }, { message: string, book?: BookDocument }, { studentID: string }, {}> = async (req, res) => {
    const { code } = req.params;
    const { studentID } = req.body;
    try {
        const {data} = await axios.get(`${process.env.students_service}/api/v1/students/${studentID}`);
        // console.log(data);
        if (!data) throw new Error("Student not found");
        const sres = await axios.patch(`${process.env.books_service}/api/v1/books/${code}`, { issuedTo:data.data._id });
        const book = sres.data.data;
        if (!book) throw new Error("Book not found");
        const sres2 = await axios.patch(`${process.env.students_service}/api/v1/students/${studentID}/addBook`, { bookID: book._id });
        const student = sres2.data.data;
        if (!student) throw new Error("Student not found");
        res.status(200).json({ book, message: "Book issued successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const returnBook: RequestHandler<{ code: string }, { message: string, book?: BookDocument }, {}, {}> = async (req, res) => {
    const { code } = req.params;
    try {
        const {data} = await axios.get(`${process.env.books_service}/api/v1/books/${code}`);
        const student = data.data.issuedTo;
        if (!student) throw new Error("Book is not issued");
        const sres = await axios.patch(`${process.env.books_service}/api/v1/books/${code}`, { issuedTo:null });
        const book = sres.data.data;
        if (!book) throw new Error("Book not found");
        const sres2 = await axios.patch(`${process.env.students_service}/api/v1/students/${student.studentID}/removeBook`, { bookID: book._id });
        res.status(200).json({ book, message: "Book returned successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}