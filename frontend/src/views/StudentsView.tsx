import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import AppBar from "../components/Appbar/Appbar";
import StudentList from "../components/StudentList/StudentList";
import AddStudentButton from "../components/AddButton/AddStudentButton";
import NavButton from "../components/Appbar/NavButton";

const StudentsView: React.FC = () => {
  const [searchFilter, setSearchFilter] = useState<string>("");
  return (
    <Flex
      overflow="auto"
      bgColor="gray.100"
      flex="1"
      h="100vh"
      w="100%"
      flexDir="column"
      pt="80px"
      align="center"
    >
      <AppBar
        view="students"
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <StudentList searchFilter={searchFilter} />
      <AddStudentButton />
      <Flex minH="200px"></Flex>
    </Flex>
  );
};

export default StudentsView;
