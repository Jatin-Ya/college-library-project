import {
  Button,
  Flex,
  Input,
  InputGroup,
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
import { AiOutlineEdit } from "react-icons/ai";
import { IBook, updateBook } from "../../api/bookService";
import { useSetRecoilState } from "recoil";
import { bookState } from "../../atoms/bookState";

type EditBookButtonProps = {
  book: IBook;
};

const EditBookButton: React.FC<EditBookButtonProps> = ({ book }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [bookInput, setBookInput] = useState<IBook>(book);
  const updateBooks = useSetRecoilState(bookState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const updateCode: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setBookInput({ ...bookInput, code: e.target.value });
  };
  const updateTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setBookInput({ ...bookInput, title: e.target.value });
  };
  const updateDescription: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setBookInput({ ...bookInput, description: e.target.value });
  };
  const updateAuthor: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setBookInput({ ...bookInput, author: e.target.value });
  };
  const handleConfirm = async () => {
    setLoading(true);
    try {
      await updateBook(bookInput);
      updateBooks((books) => {
        return books.map((_book) =>
          _book.code === book.code ? bookInput : _book
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
      <Button variant="ghost" colorScheme="primary" size="sm" onClick={onOpen}>
        <AiOutlineEdit size="20pt" />
        Edit
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent ml="10px" mr="10px">
          <ModalHeader>Edit Book</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="20px">
              <Flex flexDir="column" m="0px 20px">
                <Text color="gray.500">Code No.</Text>
                <Input
                  disabled
                  placeholder="e.g. AB69F3"
                  value={bookInput.code}
                  onChange={updateCode}
                />
              </Flex>

              <Flex flexDir="column" m="0px 20px">
                <Text color="gray.500">Title</Text>
                <Input
                  placeholder="e.g. A Song of Ice and Fire"
                  value={bookInput.title}
                  onChange={updateTitle}
                />
              </Flex>

              <Flex flexDir="column" m="0px 20px">
                <Text color="gray.500">Author</Text>
                <Input
                  placeholder="e.g. George R.R. Martin"
                  value={bookInput.author}
                  onChange={updateAuthor}
                />
              </Flex>

              <Flex flexDir="column" m="0px 20px">
                <Text color="gray.500">Description</Text>
                <Textarea
                  placeholder={
                    'e.g. "A Song of Ice and Fire" is a gripping fantasy series by George R.R. Martin. Set in Westeros and Essos, it follows noble houses vying for the Iron Throne amidst political intrigue and supernatural threats. With complex characters, unpredictable plot twists, and gritty realism, it has gained a massive following and inspired the TV series "Game of Thrones".'
                  }
                  value={bookInput.description}
                  onChange={updateDescription}
                />
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="primary" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="ghost"
              onClick={handleConfirm}
              isDisabled={
                isLoading ||
                bookInput.code === "" ||
                bookInput.title === "" ||
                bookInput.description === "" ||
                bookInput.author === ""
              }
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

export default EditBookButton;
