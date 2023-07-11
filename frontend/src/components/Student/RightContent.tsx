import React from "react";
import { IStudent } from "../../api/studentService";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import DeleteStudentButton from "../DeleteButton/DeleteStudentButton";
import EditStudentButton from "../EditButton/EditStudentsButton";
import IssuedBook from "./IssuedBook";
import IssueBookButton from "./IssueBookButton";

type RightContentProps = {
  student: IStudent;
};

const RightContent: React.FC<RightContentProps> = ({ student }) => {
  return (
    <Flex
      flex="1"
      flexDir="column"
      maxW={{ md: "unset", lg: "500px" }}
      minW="300px"
      justify="space-between"
    >
      <Flex flexDir="column">
        <Flex m="20px" align="center" justify="space-between">
          <Flex>
            <Text variant="content-head.500" pr="15px">
              Books Issued:
            </Text>
            <Text variant="content-head.500">{student.books.length}</Text>
          </Flex>
          <HStack spacing="1px">
            <EditStudentButton student={student} />
            <DeleteStudentButton student={student} />
          </HStack>
        </Flex>
        {student.books.length > 0 && (
          <Flex m="20px" mt="0px" flexDir="column">
            <Text variant="content-head.500">Book List</Text>
            {student.books.map((_book) => (
              <IssuedBook book={_book} student={student} key={_book.code} />
            ))}
          </Flex>
        )}
      </Flex>

      <Flex justify="flex-end" m="20px" mt="0px">
        <IssueBookButton student={student} />
      </Flex>
    </Flex>
  );
};

export default RightContent;
