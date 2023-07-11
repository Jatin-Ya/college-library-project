import {
  Button,
  Divider,
  Flex,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IBook, fetchBooks } from "../../api/bookService";
import BookListItem from "./BookListItem";
import Header from "./Header";
import { useRecoilState, useRecoilValue } from "recoil";
import { bookState } from "../../atoms/bookState";
import { IStudent, fetchStudents } from "../../api/studentService";
import { studentState } from "../../atoms/studentState";

type BookListProps = {
  searchFilter: string;
};

const BookList: React.FC<BookListProps> = ({ searchFilter }) => {
  const [students, setStudents] = useRecoilState<IStudent[]>(studentState);
  const [books, setBooks] = useRecoilState<IBook[]>(bookState);
  const filterBooks = (book: IBook) => {
    return (
      book.code.toLowerCase().startsWith(searchFilter) ||
      book.title.toLowerCase().startsWith(searchFilter) ||
      book.author.toLowerCase().startsWith(searchFilter)
    );
  };
  useEffect(() => {
    const load = async () => {
      const studentData = await fetchStudents();
      const bookData = await fetchBooks();
      if (studentData) setStudents(studentData);
      if (bookData) setBooks(bookData);
    };
    load();
  }, []);
  return (
    <Flex maxW="1080px" w="100%" align="center" flexDir="column">
      <Header />
      <Stack
        flexDir="column"
        divider={<StackDivider borderColor="gray.20000" />}
        spacing="0px"
        mt="60px"
        w="100%"
      >
        {books &&
          books
            .filter(filterBooks)
            .map((book, index) => (
              <BookListItem
                book={book}
                theme={index & 1 ? "dark" : "light"}
                key={book.code}
              />
            ))}
      </Stack>
    </Flex>
  );
};

export default BookList;
