import { IBook } from "./bookService";

export interface IStudent {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  books: IBook[];
}

export const dummyStudents: IStudent[] = [
  {
    id: "fe435g",
    name: "Indrayudh Ghosh",
    email: "indrayudhghosh2003@gmail.com",
    phoneNumber: "2645395876",
    books: [],
  },
  {
    id: "jii47f",
    name: "Tushar Joshi",
    email: "tusharjoshi@gmail.com",
    phoneNumber: "4857635472",
    books: [],
  },
  
];
