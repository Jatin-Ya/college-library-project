import React from "react";
import { IBook } from "../../api/bookService";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";

type BookListItemProps = {
  book: IBook;
  theme: "dark" | "light";
};
const BookListItem: React.FC<BookListItemProps> = ({ book, theme }) => {
  return (
    <Flex
      h="80px"
      bgColor="white"
      align="center"
      pr="20px"
      backgroundColor={theme === "dark" ? "primary.50" : "white"}
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
        rightIcon={<BsChevronDown />}
        fontWeight="400"
        color="gray.500"
      >
        Details
      </Button>
    </Flex>
  );
};

export default BookListItem;
