import React from "react";
import { IStudent } from "../../api/studentService";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import DeleteStudentButton from "../DeleteButton/DeleteStudentButton";
import EditStudentButton from "../EditButton/EditStudentsButton";

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
    >
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
        <Flex m="20px" mt="0px">
          <Text variant="content-head.500">Book List</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default RightContent;
