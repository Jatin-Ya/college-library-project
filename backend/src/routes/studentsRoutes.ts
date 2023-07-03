import express from 'express';

import { getStudents, createStudent, getStudent, deleteStudent, updateStudent } from '../controllers/studentControllers';
// import { getStudents} from '../controllers/studentControllers';

const router = express.Router();

router.
    route('/')
    .get(getStudents)
    .post(createStudent);

router.
    route('/:studentID')
    .get(getStudent)
    .delete(deleteStudent)
    .patch(updateStudent);


export default router;