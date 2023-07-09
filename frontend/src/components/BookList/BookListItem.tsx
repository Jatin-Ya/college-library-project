import React, { useState } from "react";
import { IBook } from "../../api/bookService";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Book from "../Book/Book";

type BookListItemProps = {
  book: IBook;
  theme: "dark" | "light";
};
const BookListItem: React.FC<BookListItemProps> = ({ book, theme }) => {
  const [isExpanded, setExpanded] = useState<boolean>(false);
  const handleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <Flex flexDir="column">
      <Flex
        h="80px"
        bgColor="white"
        align="center"
        pr="20px"
        backgroundColor={theme === "dark" ? "primary.50" : "white"}
        onClick={handleExpand}
      >
        <Flex justify="space-evenly" flex="1">
          <Text w="20%" color="gray.500" textAlign="center">
            {book.code.toUpperCase()}
          </Text>
          <Text
            w="30%"
            color="gray.700"
            fontWeight="600"
            isTruncated
            textAlign="center"
          >
            {book.title}
          </Text>

          <Text w="20%" color="gray.700" isTruncated textAlign="center">
            {book.issuedTo === null ? "Available" : "Issued"}
          </Text>
        </Flex>

        <Button
          colorScheme="primary"
          variant="ghost"
          display={{ base: "none", md: "unset" }}
          rightIcon={isExpanded ? <BsChevronUp /> : <BsChevronDown />}
          fontWeight="400"
          color="gray.500"
          onClick={handleExpand}
        >
          {isExpanded ? "Hide" : "Details"}
        </Button>
      </Flex>
      <Book book={book} isVisible={isExpanded} />
    </Flex>
  );
};

export default BookListItem;
