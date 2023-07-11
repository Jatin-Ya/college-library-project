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

type ReturnBookProps = {
  book: IBook;
};

const ReturnBookButton: React.FC<ReturnBookProps> = ({ book }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState<boolean>(false);
  const updateBooks = useSetRecoilState(bookState);
  const handleConfirm = async () => {
    setLoading(true);
    if (await returnBook(book))
      updateBooks((books) =>
        books.map((_book) =>
          _book.code === book.code ? { ..._book, issuedTo: null } : _book
        )
      );
    onClose();
    setLoading(false);
  };
  return (
    <>
      <Button variant="ghost" colorScheme="red" size="sm" onClick={onOpen}>
        <MdOutlineDelete size="20pt" />
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
