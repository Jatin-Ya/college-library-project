import {RequsetHandler} from 'express';

import {Student} from '../models/studentModel.js';

export const getStudents: RequsetHandler = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json({ students });
    } catch (err: unknown) {
        res.status(404).json({ message: err });
    }
}