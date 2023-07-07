import { Flex } from "@chakra-ui/react";
import React from "react";
import BookList from "../components/BookList/BookList";
import { dummyBooks } from "../api/bookService";
import BookListItem from "../components/BookList/BookListItem";

const BooksView: React.FC = () => {
  return (
    <Flex
      bgColor="gray.100"
      flex="1"
      h="100%"
      w="100%"
      flexDir="column"
      pt="80px"
      align="center"
    >
      <BookList books={dummyBooks} />
    </Flex>
  );
};

export default BooksView;
