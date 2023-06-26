import { RequestHandler } from 'express';

import Student, { StudentDocument } from '../models/studentModel';
import { Types } from 'mongoose';

export const getStudents: RequestHandler<{}, { data?: StudentDocument[], message: string }, {}, {
    name?: string;
    studentID?: string,
    email?: string,
    phone?: string,
}> = async (req, res) => {
    try {
        const students = await Student.find(req.query).populate('books');
        if (!students) throw new Error("No students found");
        res.status(200).json({ data: students, message: "Students retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const createStudent: RequestHandler<{}, { message: string, data?: StudentDocument & { _id: Types.ObjectId } }, StudentDocument, {}> = async (req, res) => {
    const student = req.body;
    const newStudent = new Student(student);
    try {
        await newStudent.save();
        res.status(201).json({ data: newStudent, message: "Student created successfully" });
    } catch (err: any) {
        res.status(409).json({ message: err.message });
    }
}

export const getStudent: RequestHandler<{ id: string }, { data?: StudentDocument, message: string }, {}, {}> = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findById(id).populate('books');
        if (!student) throw new Error("Student not found");
        res.status(200).json({ data: student, message: "Student retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteStudent: RequestHandler<{ id: string }, { message: string }, {}, {}> = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndRemove(id);
        if (!student) throw new Error("Student not found");
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const updateStudent: RequestHandler<{id : string}, { message: string, data?: StudentDocument }, Partial<StudentDocument>, {}> = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedStudent) throw new Error("Student not found");
        res.status(200).json({ data: updatedStudent, message: "Student updated successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const addBook: RequestHandler<{id : string}, { message: string, data?: StudentDocument }, {bookID: string}, {}> = async (req, res) => {
    const { id } = req.params;
    const { bookID } = req.body;
    try {
        const student = await Student.findById(id);
        if (!student) throw new Error("Student not found");
        student.books.push(bookID);
        await student.save();
        res.status(200).json({ data: student, message: "Book added successfully" });
    }
    catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}