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
  student: IStudent;
};

const IssueBookButton: React.FC<IssueBookButtonProps> = ({ student }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const updateBooks = useSetRecoilState(bookState);
  const updateStudents = useSetRecoilState(studentState);
  const books = useRecoilValue<IBook[]>(bookState);
  const [searchFilter, setSearchFilter] = useState<string>("");

  const filterBooks = (book: IBook) => {
    return (
      book.issuedTo === null &&
      (book.code.toLowerCase().startsWith(searchFilter) ||
        book.title.toLowerCase().startsWith(searchFilter) ||
        book.author.toLowerCase().startsWith(searchFilter))
    );
  };
  const updateSearchFilter: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setSearchFilter(e.target.value.toLowerCase());
  };
  const onOpen = () => {
    setOpen(true);
    setSelectedBook(null);
  };
  const onClose = () => {
    setOpen(false);
    setSelectedBook(null);
    setSearchFilter("");
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      if (!selectedBook) return;
      if (await issueBook(selectedBook, student)) {
        const newStudent: IStudent = {
          ...student,
          books: [...student.books, selectedBook],
        };
        updateStudents((students) =>
          students.map((_student) =>
            _student.studentID === student.studentID ? newStudent : _student
          )
        );
      }
      //todo

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
                  {books.filter(filterBooks).map((book) => (
                    <IssueBookListItem
                      key={book.code}
                      book={book}
                      setBook={setSelectedBook}
                      isSelected={selectedBook?.code === book.code}
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
              isDisabled={!selectedBook || isLoading}
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
