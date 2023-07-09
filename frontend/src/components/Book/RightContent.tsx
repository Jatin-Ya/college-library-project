import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { IStudent } from "../../api/studentService";
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";
import DeleteBookButton from "../DeleteButton/DeleteBookButton";
import { bookState } from "../../atoms/bookState";
import { IBook } from "../../api/bookService";
import EditBookButton from "../EditButton/EditBookButton";

type RightContentProps = {
  book: IBook;
};

const RightContent: React.FC<RightContentProps> = ({ book }) => {
  return (
    <Flex flex="1" flexDir="column">
      <Flex m="20px" align="center" justify="space-between">
        <Flex>
          <Text variant="content-head.500" pr="15px">
            Status:
          </Text>
          <Text variant="content-head.500">
            {!book.issuedTo ? "Available" : "Issued"}
          </Text>
        </Flex>
        <HStack spacing="1px">
          <EditBookButton book={book} />

          <DeleteBookButton book={book} />
        </HStack>
      </Flex>
      {book.issuedTo && (
        <Flex flex="1" p="20px" flexDir="column">
          <Flex align="center" justify="space-between">
            <Text variant="content-head.300">Issued To:</Text>
            <IconButton
              aria-label="redirect"
              size="xs"
              variant="solid"
              colorScheme="primary"
              icon={<FiArrowUpRight size="12pt" />}
            />
          </Flex>
          <Stack
            border="2px solid"
            borderColor="primary.400"
            borderRadius="7px"
            m="10px 0px"
            p="5px 10px"
            spacing="5px"
          >
            <Flex flexDir="row">
              <Text variant="content-head.500">{book.issuedTo.name}</Text>
              <Text variant="content-head.500" color="gray.500" ml="10px">
                {"#"}
                {book.issuedTo.id.toUpperCase()}
              </Text>
            </Flex>
            <Text variant="content-head.300">{book.issuedTo.email}</Text>
            <Text variant="content-head.300">
              {"Contact No.:  "}
              {book.issuedTo.phoneNumber}
            </Text>
          </Stack>
        </Flex>
      )}
    </Flex>
  );
};

export default RightContent;
