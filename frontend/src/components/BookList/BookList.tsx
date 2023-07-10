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

const BookList: React.FC = () => {
  const [books, setBooks] = useRecoilState<IBook[]>(bookState);
  useEffect(() => {
    const load = async () => {
      const books = await fetchBooks();
      if (books) setBooks(books);
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
          books.map((book, index) => (
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
