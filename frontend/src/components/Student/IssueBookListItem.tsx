import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IStudent } from "../../api/studentService";
import { IBook } from "../../api/bookService";

type IssueBookListItemProps = {
  book: IBook;
  setBook: React.Dispatch<React.SetStateAction<IBook | null>>;
  isSelected: boolean;
};

const IssueBookListItem: React.FC<IssueBookListItemProps> = ({
  book,
  setBook,
  isSelected,
}) => {
  return (
    <Flex
      bgColor={isSelected ? "primary.200" : "white"}
      minH="80px"
      onClick={() => setBook(book)}
      flexDir="column"
      p="5px 10px"
    >
      <Text variant="content-head.300">
        {book.title}{" "}
        <Text as="span" variant="content-base" color="gray.500">
          #{book.code.toUpperCase()}
        </Text>
      </Text>
      <Text>
        By{" "}
        <Text as="span" variant="content-head.300">
          {book.author}
        </Text>
      </Text>
    </Flex>
  );
};

export default IssueBookListItem;
