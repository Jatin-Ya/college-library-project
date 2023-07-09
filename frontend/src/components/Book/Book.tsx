import React from "react";
import { IBook } from "../../api/bookService";
import { Container, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { isVisible } from "@testing-library/user-event/dist/utils";
import RightContent from "./RightContent";

type BookProps = {
  book: IBook;
  isVisible: boolean;
};

const Book: React.FC<BookProps> = ({ book, isVisible }) => {
  if (!isVisible) return <></>;
  return (
    <Flex
      minH="300px"
      bgColor="primary.200"
      m="10px 0px"
      flexDir={{ base: "column", md: "row" }}
    >
      <Stack flexDir="column" p="20px" align="flex-start">
        <Text variant="content-head.700">{book.title}</Text>
        <Text variant="content-base">{book.description}</Text>
      </Stack>
      <Divider orientation="vertical" />
      <RightContent student={book?.issuedTo} />
    </Flex>
  );
};

export default Book;
