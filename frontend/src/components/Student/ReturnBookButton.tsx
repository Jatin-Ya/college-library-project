import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { IBook, deleteBook, returnBook } from "../../api/bookService";
import { bookState } from "../../atoms/bookState";
import { useSetRecoilState } from "recoil";
import { studentState } from "../../atoms/studentState";
import { IStudent } from "../../api/studentService";

type ReturnBookProps = {
  book: IBook;
  student: IStudent;
};

const ReturnBookButton: React.FC<ReturnBookProps> = ({ book, student }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState<boolean>(false);
  const updateStudents = useSetRecoilState(studentState);
  const handleConfirm = async () => {
    setLoading(true);
    if (await returnBook(book)) {
      const newStudent: IStudent = {
        ...student,
        books: student.books.filter((_book) => _book.code !== book.code),
      };
      updateStudents((students) =>
        students.map((_student) =>
          _student.studentID === student.studentID ? newStudent : _student
        )
      );
    }

    onClose();
    setLoading(false);
  };
  return (
    <>
      <Button variant="ghost" colorScheme="red" size="sm" onClick={onOpen}>
        Return Book
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Return Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to return{' "'}
            <Text as="span" fontWeight="500">
              {book.title}
            </Text>
            {'" '}
            from student{" "}
            <Text as="span" fontWeight="500">
              {book.issuedTo?.name}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="primary"
              mr={3}
              onClick={onClose}
              isDisabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={handleConfirm}
              isDisabled={isLoading}
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

export default ReturnBookButton;
