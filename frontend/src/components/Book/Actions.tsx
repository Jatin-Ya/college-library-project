import {
  Button,
  Flex,
  HStack,
  IconButton,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";

const Actions: React.FC = () => {
  return (
    <HStack spacing="1px">
      <Button variant="ghost" colorScheme="primary" size="sm">
        <AiOutlineEdit size="20pt" />
        Edit
      </Button>

      <Button variant="ghost" colorScheme="red" size="sm">
        <MdOutlineDelete size="20pt" />
        Delete
      </Button>
    </HStack>
  );
};

export default Actions;
