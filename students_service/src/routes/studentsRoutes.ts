import express from 'express';

import { getStudents, createStudent, getStudent, deleteStudent, updateStudent, addBook, removeBook } from '../controllers/studentControllers';
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


router.
    route('/:studentID/addBook')
    .patch(addBook);

router.
    route('/:studentID/removeBook')
    .patch(removeBook);

export default router;