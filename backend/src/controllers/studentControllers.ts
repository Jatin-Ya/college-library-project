import { RequestHandler } from 'express';
import axios from 'axios';

import Student, { StudentDocument } from '../models/studentModel';
import { Types } from 'mongoose';

export const getStudents: RequestHandler<{}, { data?: StudentDocument[], message: string }, {}, {
    name?: string;
    studentID?: string,
    email?: string,
    phone?: string,
}> = async (req, res) => {
    const params = new URLSearchParams({
        ...req.query,
    });

    const url = `http://students_service:8040/students?${params.toString()}`;

    try {
        const sres = await axios.get(url);
        const books = sres.data;
        if (!books) throw new Error("No books found");
        res.status(200).json({ data: books, message: "Students details retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const createStudent: RequestHandler<{}, { message: string, data?: StudentDocument & { _id: Types.ObjectId } }, StudentDocument, {}> = async (req, res) => {
    try{
        const sres = await axios.post('http://students_service:8040/students', req.body);
        const student = sres.data;
        res.status(201).json({ data: student, message: "Student created successfully" });
    }
    catch(err: any){
        res.status(409).json({ message: err.message });
    }
}

export const getStudent: RequestHandler<{ id: string }, { data?: StudentDocument, message: string }, {}, {}> = async (req, res) => {
    const { id } = req.params;
    try {
        const sres = await axios.get(`http://students_service:8040/students/${id}`);
        const student = sres.data;
        if (!student) throw new Error("Student not found");
        res.status(200).json({ data: student, message: "Student details retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteStudent: RequestHandler<{ id: string }, { message: string }, {}, {}> = async (req, res) => {
    const { id } = req.params;
    try {
        const sres = await axios.delete(`http://students_service:8040/students/${id}`);
        const student = sres.data;
        if (!student) throw new Error("Student not found");
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const updateStudent: RequestHandler<{ id: string }, { message: string, data?: StudentDocument }, Partial<StudentDocument>, {}> = async (req, res) => {
    try {
        const { id } = req.params;
        const sres = await axios.patch(`http://students_service:8040/students/${id}`, req.body);
        const student = sres.data;
        if (!student) throw new Error("Student not found");
        res.status(200).json({ data: student, message: "Student updated successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}