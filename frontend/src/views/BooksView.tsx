import { Flex } from "@chakra-ui/react";
import React from "react";
import BookList from "../components/BookList/BookList";
import { IBook, dummyBooks } from "../api/bookService";
import BookListItem from "../components/BookList/BookListItem";
import AddBookButton from "../components/AddButton/AddBookButton";
import { bookState } from "../atoms/bookState";
import { useRecoilValue } from "recoil";
import AppBar from "../components/Appbar/Appbar";

const BooksView: React.FC = () => {
  return (
    <Flex
      overflow="auto"
      bgColor="gray.100"
      flex="1"
      h="100%"
      w="100%"
      flexDir="column"
      pt="80px"
      align="center"
    >
      <AppBar view="books" />
      <BookList />
      <AddBookButton />
      <Flex h="250px">Footer</Flex>
    </Flex>
  );
};

export default BooksView;
