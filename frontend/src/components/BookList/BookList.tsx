import {
  Button,
  Divider,
  Flex,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IBook } from "../../api/bookService";
import BookListItem from "./BookListItem";
import Header from "./Header";

type BookListProps = {
  books: IBook[];
};
const BookList: React.FC<BookListProps> = ({ books }) => {
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
        {books.map((book, index) => (
          <BookListItem book={book} theme={index & 1 ? "dark" : "light"} />
        ))}
      </Stack>
    </Flex>
  );
};

export default BookList;
