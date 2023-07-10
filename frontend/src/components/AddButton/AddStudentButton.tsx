import {
  Button,
  Flex,
  Input,
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
import { AiOutlinePlus } from "react-icons/ai";
import { useSetRecoilState } from "recoil";
import { IStudent, addStudent } from "../../api/studentService";
import { studentState } from "../../atoms/studentState";

const initialInput: IStudent = {
  studentID: "",
  name: "",
  email: "",
  phone: "",
  books: [],
};

const AddStudentButton: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [studentInput, setStudentInput] = useState<IStudent>(initialInput);
  const updateStudents = useSetRecoilState(studentState);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  const updateStudentID: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setStudentInput({ ...studentInput, studentID: e.target.value });
  };
  const updateName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setStudentInput({ ...studentInput, name: e.target.value });
  };
  const updateEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setStudentInput({ ...studentInput, email: e.target.value });
  };
  const updatePhone: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setStudentInput({ ...studentInput, phone: e.target.value });
  };
  const handleConfirm = async () => {
    setLoading(true);
    try {
      const newStudent = await addStudent(studentInput);
      if (newStudent)
        updateStudents((students) => {
          return [...students, newStudent];
        });
      setOpen(false);
    } catch (err) {
      console.log("failed to call api");
    }
    setLoading(false);
  };
  return (
    <>
      <Flex
        position="fixed"
        bottom="20px"
        right="20px"
        h="80px"
        w="80px"
        borderRadius="40px"
        bgColor="primary.500"
        justify="center"
        align="center"
        m="10px"
        _hover={{ bgColor: "primary.600" }}
        onClick={onOpen}
      >
        <AiOutlinePlus size="24pt" color="white" />
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        isCentered
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent ml="10px" mr="10px">
          <ModalHeader>Add New Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="20px">
              <Flex flexDir="column" m="0px 20px">
                <Text color="gray.500">Student ID</Text>
                <Input
                  placeholder="e.g. AB69F3"
                  value={studentInput.studentID}
                  onChange={updateStudentID}
                />
              </Flex>

              <Flex flexDir="column" m="0px 20px">
                <Text color="gray.500">Name</Text>
                <Input
                  placeholder="e.g. John Doe"
                  value={studentInput.name}
                  onChange={updateName}
                />
              </Flex>

              <Flex flexDir="column" m="0px 20px">
                <Text color="gray.500">Email</Text>
                <Input
                  placeholder="e.g. abcxyz@gmail.com"
                  value={studentInput.email}
                  onChange={updateEmail}
                />
              </Flex>
              <Flex flexDir="column" m="0px 20px">
                <Text color="gray.500">Contact No.</Text>
                <Input
                  placeholder="e.g. 9182736455"
                  value={studentInput.phone}
                  onChange={updatePhone}
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
                studentInput.studentID === "" ||
                studentInput.name === "" ||
                studentInput.email === "" ||
                studentInput.phone === ""
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

export default AddStudentButton;
