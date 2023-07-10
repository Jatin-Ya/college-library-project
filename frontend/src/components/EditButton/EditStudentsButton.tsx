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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { IStudent, updateStudent } from "../../api/studentService";
import { useSetRecoilState } from "recoil";
import { studentState } from "../../atoms/studentState";

type EditStudentButtonProps = {
  student: IStudent;
};

const EditStudentButton: React.FC<EditStudentButtonProps> = ({ student }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [studentInput, setStudentInput] = useState<IStudent>(student);
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
      await updateStudent(studentInput);
      updateStudents((students) => {
        return students.map((_student) =>
          _student.studentID === student.studentID ? studentInput : _student
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
          <ModalHeader>Edit Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing="20px">
              <Flex flexDir="column" m="0px 20px">
                <Text color="gray.500">Student ID</Text>
                <Input
                  disabled
                  placeholder="e.g. S12345"
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
                  placeholder="e.g. john.doe@example.com"
                  value={studentInput.email}
                  onChange={updateEmail}
                />
              </Flex>

              <Flex flexDir="column" m="0px 20px">
                <Text color="gray.500">Phone</Text>
                <Input
                  placeholder="e.g. 123-456-7890"
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

export default EditStudentButton;
