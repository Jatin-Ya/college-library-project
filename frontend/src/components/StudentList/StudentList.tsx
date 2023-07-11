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
import { IBook, fetchBooks } from "../../api/bookService";
import { bookState } from "../../atoms/bookState";

type StudentListProps = {
  searchFilter: string;
};

const StudentList: React.FC<StudentListProps> = ({ searchFilter }) => {
  const [students, setStudents] = useRecoilState<IStudent[]>(studentState);
  const [books, setBooks] = useRecoilState<IBook[]>(bookState);
  const filterStudents = (student: IStudent) => {
    return (
      student.studentID.toLowerCase().startsWith(searchFilter) ||
      student.name.toLowerCase().startsWith(searchFilter) ||
      student.email.toLowerCase().startsWith(searchFilter) ||
      student.phone.toLowerCase().startsWith(searchFilter)
    );
  };
  useEffect(() => {
    const load = async () => {
      const studentData = await fetchStudents();
      const bookData = await fetchBooks();
      if (studentData) setStudents(studentData);
      if (bookData) setBooks(bookData);
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
          students
            .filter(filterStudents)
            .map((student, index) => (
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
