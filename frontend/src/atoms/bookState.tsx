import { atom } from "recoil";
import { IBook, dummyBooks } from "../api/bookService";

export const bookState = atom<IBook[]>({
  key: "Book",
  default: dummyBooks,
});
