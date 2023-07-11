import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { IStudent } from "../../api/studentService";

type IssueBookListItemProps = {
  student: IStudent;
  setStudent: React.Dispatch<React.SetStateAction<IStudent | null>>;
  isSelected: boolean;
};

const IssueBookListItem: React.FC<IssueBookListItemProps> = ({
  student,
  setStudent,
  isSelected,
}) => {
  return (
    <Flex
      bgColor={isSelected ? "primary.200" : "white"}
      minH="80px"
      onClick={() => setStudent(student)}
      flexDir="column"
      p="5px 10px"
    >
      <Text variant="content-head.300">
        {student.name}{" "}
        <Text as="span" variant="content-base" color="gray.500">
          #{student.studentID.toUpperCase()}
        </Text>
      </Text>
      <Text>Books Issued: {student.books.length}</Text>
    </Flex>
  );
};

export default IssueBookListItem;
