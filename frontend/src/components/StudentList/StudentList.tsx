import {
  Button,
  Divider,
  Flex,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Header from "./Header";
import { useRecoilState, useRecoilValue } from "recoil";
import { IStudent, fetchStudents } from "../../api/studentService";
import { studentState } from "../../atoms/studentState";
import StudentListItem from "./StudentListItem";

const StudentList: React.FC = () => {
  const [students, setStudents] = useRecoilState<IStudent[]>(studentState);
  useEffect(() => {
    const load = async () => {
      const students = await fetchStudents();
      if (students) setStudents(students);
    };
    load();
  }, []);
  return (
    <Flex maxW="1080px" w="100%" align="center" flexDir="column">
      <Header />
      <Stack
        flexDir="column"
        divider={<StackDivider borderColor="gray.20000" />}
        spacing="0px"
        mt="60px"
        w="100%"
      >
        {students &&
          students.map((student, index) => (
            <StudentListItem
              student={student}
              theme={index & 1 ? "dark" : "light"}
              key={student.studentID}
            />
          ))}
      </Stack>
    </Flex>
  );
};

export default StudentList;
