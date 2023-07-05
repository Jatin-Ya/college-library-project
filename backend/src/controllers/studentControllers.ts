import { RequestHandler } from 'express';
import axios from 'axios';

import { StudentDocument } from './Types';
import { Types } from 'mongoose';

export const getStudents: RequestHandler<{}, { students?: StudentDocument[], message: string }, {}, {
    name?: string;
    studentID?: string,
    email?: string,
    phone?: string,
}> = async (req, res) => {
    const params = new URLSearchParams({
        ...req.query,
    });

    const url = `${process.env.students_service}/api/v1/students?${params.toString()}`;

    try {
        const sres = await axios.get(url);
        const students = sres.data.data;
        if (!students) throw new Error("No students found");
        res.status(200).json({ students, message: "Students details retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const createStudent: RequestHandler<{}, { message: string, student?: StudentDocument & { _id: Types.ObjectId } }, StudentDocument, {}> = async (req, res) => {
    try{
        const sres = await axios.post(`${process.env.students_service}/api/v1/students`, req.body);
        const student = sres.data.data;
        res.status(201).json({ student, message: "Student created successfully" });
    }
    catch(err: any){
        res.status(409).json({ message: err.message });
    }
}

export const getStudent: RequestHandler<{ studentID: string }, { student?: StudentDocument, message: string }, {}, {}> = async (req, res) => {
    const { studentID } = req.params;
    try {
        const sres = await axios.get(`${process.env.students_service}/api/v1/students/${studentID}`);
        const student = sres.data.data;
        if (!student) throw new Error("Student not found");
        res.status(200).json({ student, message: "Student details retrieved successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const deleteStudent: RequestHandler<{ studentID: string }, { message: string }, {}, {}> = async (req, res) => {
    const { studentID } = req.params;
    try {
        const sres = await axios.delete(`${process.env.students_service}/api/v1/students/${studentID}`);
        const student = sres.data;
        if (!student) throw new Error("Student not found");
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}

export const updateStudent: RequestHandler<{ studentID: string }, { message: string, student?: StudentDocument }, Partial<StudentDocument>, {}> = async (req, res) => {
    try {
        const { studentID } = req.params;
        const sres = await axios.patch(`${process.env.students_service}/api/v1/students/${studentID}`, req.body);
        const student = sres.data.data;
        if (!student) throw new Error("Student not found");
        res.status(200).json({ student, message: "Student updated successfully" });
    } catch (err: any) {
        res.status(404).json({ message: err.message });
    }
}