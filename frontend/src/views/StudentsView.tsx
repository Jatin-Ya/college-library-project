import { Flex } from "@chakra-ui/react";
import React from "react";
import AppBar from "../components/Appbar/Appbar";
import StudentList from "../components/StudentList/StudentList";
import AddStudentButton from "../components/AddButton/AddStudentButton";

const StudentsView: React.FC = () => {
  return (
    <Flex
      overflow="auto"
      bgColor="gray.100"
      flex="1"
      h="100%"
      w="100%"
      flexDir="column"
      pt="80px"
      align="center"
    >
      <AppBar view="students" />
      <StudentList />
      <AddStudentButton />
      <Flex h="250px">Footer</Flex>
    </Flex>
  );
};

export default StudentsView;
