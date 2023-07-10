import axios from "axios";
import { IBook } from "./bookService";

export interface IStudent {
  studentID: string;
  name: string;
  email: string;
  phone: string;
  books: IBook[];
}

type FetchStudentsResponse = {
  students: IStudent[];
  message?: string;
};

type AddStudentResponse = {
  student: IStudent;
  message?: string;
};

type DeleteStudentResponse = {
  message: string;
};
type UpdateStudentResponse = {
  data?: IBook;
  message: string;
};

const apiURL = "https://college-library-api.onrender.com/api/v1/students";

export const fetchStudents = async () => {
  console.log("students data loaded");
  try {
    const { data } = await axios.get<FetchStudentsResponse>(apiURL);
    const students = data.students;
    console.log(students);
    return students;
  } catch (err) {
    console.log("failed to fetch students from api");
  }
};

export const addStudent = async (student: IStudent) => {
  try {
    const { data } = await axios.post<AddStudentResponse>(apiURL, student);
    if (data.student) return data.student;
    else console.log("failed to add student");
  } catch (err) {
    console.log("failed to add student");
  }
};

export const deleteStudent = async (student: IStudent) => {
  const deleteURL = apiURL + "/" + student.studentID;
  try {
    const { data } = await axios.delete<DeleteStudentResponse>(deleteURL);
    if (data.message === "Student deleted successfully") return true;
  } catch (err) {
    console.log("failed to call api");
  }
  return false;
};

export const updateStudent = async (student: IStudent) => {
  const updateURL = apiURL + "/" + student.studentID;
  try {
    const { data } = await axios.patch<UpdateStudentResponse>(
      updateURL,
      student
    );
    if (data.message === "Student updated successfully") return data.data;
  } catch (err) {
    console.log("failed to call api");
  }
};

export const dummyStudents: IStudent[] = [
  {
    studentID: "fe435g",
    name: "Indrayudh Ghosh",
    email: "indrayudhghosh2003@gmail.com",
    phone: "2645395876",
    books: [],
  },
  {
    studentID: "jii47f",
    name: "Tushar Joshi",
    email: "tusharjoshi@gmail.com",
    phone: "4857635472",
    books: [],
  },
  {
    studentID: "tki4sf",
    name: "Jatin Yadav",
    email: "jatinyadav@gmail.com",
    phone: "6877635472",
    books: [],
  },
];
