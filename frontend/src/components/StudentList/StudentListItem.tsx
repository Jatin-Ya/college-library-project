import React, { useState } from "react";
import { IBook } from "../../api/bookService";
import { Button, Container, Flex, Text } from "@chakra-ui/react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Book from "../Book/Book";
import { IStudent } from "../../api/studentService";
import Student from "../Student/Student";

type BookListItemProps = {
  student: IStudent;
  theme: "dark" | "light";
};
const StudentListItem: React.FC<BookListItemProps> = ({ student, theme }) => {
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
            {student.studentID.toUpperCase()}
          </Text>
          <Text
            w="30%"
            color="gray.700"
            fontWeight="600"
            isTruncated
            textAlign="center"
          >
            {student.name}
          </Text>

          <Text
            w="20%"
            color="gray.700"
            isTruncated
            textAlign="center"
            display={{ base: "none", md: "unset" }}
          >
            {student.books.length}
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
      <Student student={student} isVisible={isExpanded} />
    </Flex>
  );
};

export default StudentListItem;
