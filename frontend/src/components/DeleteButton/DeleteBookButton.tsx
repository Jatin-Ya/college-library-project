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
import { IBook, deleteBook } from "../../api/bookService";
import { bookState } from "../../atoms/bookState";
import { useSetRecoilState } from "recoil";

type DeleteBookProps = {
  book: IBook;
};

const DeleteBookButton: React.FC<DeleteBookProps> = ({ book }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState<boolean>(false);
  const updateBooks = useSetRecoilState(bookState);
  const handleConfirm = async () => {
    setLoading(true);
    await deleteBook(book);
    updateBooks((books) => books.filter((_book) => _book.code !== book.code));
    onClose();
    try {
      //
    } catch (err) {
      console.log("failed to call api");
    }
    setLoading(false);
  };
  return (
    <>
      <Button variant="ghost" colorScheme="red" size="sm" onClick={onOpen}>
        <MdOutlineDelete size="20pt" />
        Delete
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete{' "'}
            <Text as="span" fontWeight="500">
              {book.title}
            </Text>
            {'" '}
            from the library? This action will also remove the book from any
            student who issued it.
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
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteBookButton;
