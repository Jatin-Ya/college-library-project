import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineBook } from "react-icons/ai";
import { IBook, issueBook, updateBook } from "../../api/bookService";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { bookState } from "../../atoms/bookState";
import { IStudent, updateStudent } from "../../api/studentService";
import { studentState } from "../../atoms/studentState";
import { BiSearch } from "react-icons/bi";
import IssueBookListItem from "./IssueBookListItem";

type IssueBookButtonProps = {
  book: IBook;
};

const IssueBookButton: React.FC<IssueBookButtonProps> = ({ book }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null);
  const updateBooks = useSetRecoilState(bookState);
  const updateStudents = useSetRecoilState(studentState);
  const students = useRecoilValue<IStudent[]>(studentState);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const filterStudents = (student: IStudent) => {
    return (
      student.studentID.toLowerCase().startsWith(searchFilter) ||
      student.name.toLowerCase().startsWith(searchFilter) ||
      student.email.toLowerCase().startsWith(searchFilter) ||
      student.phone.toLowerCase().startsWith(searchFilter)
    );
  };
  const updateSearchFilter: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchFilter(e.target.value.toLowerCase());
  };
  const onOpen = () => {
    setOpen(true);
    setSelectedStudent(null);
  };
  const onClose = () => {
    setOpen(false);
    setSelectedStudent(null);
    setSearchFilter("");
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (!selectedStudent) return;
      if (await issueBook(book, selectedStudent))
        updateBooks((books) => {
          return books.map((_book) =>
            _book.code === book.code
              ? { ..._book, issuedTo: selectedStudent }
              : _book
          );
        });
      setOpen(false);
    } catch (err) {
      console.log("failed to call api");
    }
    setLoading(false);
  };
  return (
    <>
      <Button
        variant="ghost"
        colorScheme="primary"
        size="sm"
        onClick={onOpen}
        leftIcon={<AiOutlineBook size="16pt" />}
      >
        Issue Book
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent ml="10px" mr="10px">
          <ModalHeader>Issue Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="10px" p="0px 20px">
              <Flex flexGrow={1} maxWidth={{ lg: "650px" }} align="center">
                <InputGroup colorScheme="white">
                  <InputLeftElement pointerEvents="none">
                    <BiSearch color="brand.500" />
                  </InputLeftElement>
                  <Input
                    _hover={{ bgColor: "white" }}
                    _focusVisible={{ outline: "none" }}
                    _focus={{ bgColor: "white" }}
                    type="text"
                    placeholder={"Search Students"}
                    bgColor="gray.200"
                    value={searchFilter}
                    onChange={updateSearchFilter}
                  />
                </InputGroup>
              </Flex>
              <Flex flexDir="column">
                <Text variant="content-head.300">To</Text>
                <Flex flexDir="column" h="300px" overflow="auto">
                  {students.filter(filterStudents).map((student) => (
                    <IssueBookListItem
                      key={student.studentID}
                      student={student}
                      setStudent={setSelectedStudent}
                      isSelected={
                        selectedStudent?.studentID === student.studentID
                      }
                    />
                  ))}
                </Flex>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="primary" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              isDisabled={!selectedStudent || isLoading}
              onClick={handleConfirm}
            >
              {isLoading && <Spinner size="sm" mr="8px" />}
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default IssueBookButton;
