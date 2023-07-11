import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import BookList from "../components/BookList/BookList";
import { IBook, dummyBooks } from "../api/bookService";
import BookListItem from "../components/BookList/BookListItem";
import AddBookButton from "../components/AddButton/AddBookButton";
import { bookState } from "../atoms/bookState";
import { useRecoilValue } from "recoil";
import AppBar from "../components/Appbar/Appbar";
import NavButton from "../components/Appbar/NavButton";

const BooksView: React.FC = () => {
  const [searchFilter, setSearchFilter] = useState<string>("");
  return (
    <Flex
      overflow="auto"
      bgColor="gray.100"
      flex="1"
      h="100vh"
      w="100%"
      flexDir="column"
      pt="80px"
      align="center"
    >
      <AppBar
        view="books"
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <BookList searchFilter={searchFilter} />
      <AddBookButton />
      <Flex minH="200px"></Flex>
    </Flex>
  );
};

export default BooksView;
