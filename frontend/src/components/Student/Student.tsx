import React from "react";
import { IBook } from "../../api/bookService";
import { Container, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { isVisible } from "@testing-library/user-event/dist/utils";
import { IStudent } from "../../api/studentService";
import RightContent from "./RightContent";

type StudentProps = {
  student: IStudent;
  isVisible: boolean;
};

const Student: React.FC<StudentProps> = ({ student, isVisible }) => {
  if (!isVisible) return <></>;
  return (
    <Flex
      minH="300px"
      bgColor="primary.200"
      m="10px 0px"
      flexDir={{ base: "column", md: "column", lg: "row" }}
      justify="space-between"
    >
      <Stack flexDir="column" p="20px" align="flex-start" spacing="10px">
        <Text variant="content-head.700">{student.name}</Text>
        <Text variant="content-head.500">
          Student ID:{" "}
          <Text variant="content-base.500" as="span">
            {student.studentID.toUpperCase()}
          </Text>
        </Text>
        <Text variant="content-head.500">
          Email:{" "}
          <Text variant="content-base.500" as="span">
            {student.email}
          </Text>
        </Text>
        <Text variant="content-head.500">
          Contact No.:{" "}
          <Text variant="content-base.500" as="span">
            {student.phone}
          </Text>
        </Text>
      </Stack>
      <RightContent student={student} />
    </Flex>
  );
};

export default Student;
