import { atom } from "recoil";
import { IStudent, dummyStudents } from "../api/studentService";

export const studentState = atom<IStudent[]>({
  key: "Student",
  default: [],
});
