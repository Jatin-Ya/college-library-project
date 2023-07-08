import { IBook } from "./bookService";

export interface IStudent {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  books: IBook[];
}
