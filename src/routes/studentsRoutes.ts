import express from 'express';

import { getStudents, createStudent, getStudent, deleteStudent, updateStudent } from '../controllers/studentControllers.js';
// import { getStudents} from '../controllers/studentControllers';

const router = express.Router();

router.
    route('/')
    .get(getStudents)
    .post(createStudent);

router.
    route('/:id')
    .get(getStudent)
    .delete(deleteStudent)
    .patch(updateStudent);

export default router;