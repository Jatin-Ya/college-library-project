import { Stack, Text, Flex, Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IBook } from "../../api/bookService";
import ReturnBookButton from "./ReturnBookButton";
import { IStudent } from "../../api/studentService";

type IssuedBookProps = {
  book: IBook;
  student: IStudent;
};

const IssuedBook: React.FC<IssuedBookProps> = ({ book, student }) => {
  return (
    <Flex
      border="2px solid"
      borderColor="primary.400"
      borderRadius="7px"
      p="5px 10px"
      mt="10px"
      flex="1"
      justify="space-between"
      align="center"
    >
      <Flex flexDir="column">
        <Text as="span" variant="content-base" color="gray.500" fontSize="14pt">
          #{book.code.toUpperCase()}
        </Text>
        <Text variant="content-head.300">{book.title} </Text>
        <Text fontSize="13pt">
          by{" "}
          <Text as="span" variant="content-head.300">
            {book.author}
          </Text>
        </Text>
      </Flex>

      <ReturnBookButton book={book} student={student} />
    </Flex>
  );
};

export default IssuedBook;
