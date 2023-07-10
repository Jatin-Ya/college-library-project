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
import { useSetRecoilState } from "recoil";
import { IStudent, deleteStudent } from "../../api/studentService";
import { studentState } from "../../atoms/studentState";

type DeleteStudentProps = {
  student: IStudent;
};

const DeleteStudentButton: React.FC<DeleteStudentProps> = ({ student }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setLoading] = useState<boolean>(false);
  const updateStudents = useSetRecoilState(studentState);
  const handleConfirm = async () => {
    setLoading(true);
    if (await deleteStudent(student))
      updateStudents((students) =>
        students.filter((_student) => _student.studentID !== student.studentID)
      );
    onClose();
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
          <ModalHeader>Delete Student</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete{' "'}
            <Text as="span" fontWeight="500">
              {student.name}
            </Text>
            {'" '}
            from the library? This action will also remove all books from the
            student's issued list.
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

export default DeleteStudentButton;
