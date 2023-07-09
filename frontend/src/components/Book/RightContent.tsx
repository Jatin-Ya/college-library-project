import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { IStudent } from "../../api/studentService";
import { Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import Actions from "./Actions";

type RightContentProps = {
  student: IStudent | null;
};

const RightContent: React.FC<RightContentProps> = ({ student }) => {
  return (
    <Flex flex="1" flexDir="column">
      <Flex m="20px" align="center" justify="space-between">
        <Flex>
          <Text variant="content-head.500" pr="15px">
            Status:
          </Text>
          <Text variant="content-head.500">
            {!student ? "Available" : "Issued"}
          </Text>
        </Flex>
        <Actions />
      </Flex>
      {student && (
        <Flex flex="1" p="20px" flexDir="column">
          <Flex align="center" justify="space-between">
            <Text variant="content-head.300">Issued To:</Text>
            <IconButton
              aria-label="redirect"
              size="xs"
              variant="solid"
              colorScheme="primary"
              icon={<FiArrowUpRight size="12pt" />}
            />
          </Flex>
          <Stack
            border="2px solid"
            borderColor="primary.400"
            borderRadius="7px"
            m="10px 0px"
            p="5px 10px"
            spacing="5px"
          >
            <Flex flexDir="row">
              <Text variant="content-head.500">{student?.name}</Text>
              <Text variant="content-head.500" color="gray.500" ml="10px">
                {"#"}
                {student?.id.toUpperCase()}
              </Text>
            </Flex>
            <Text variant="content-head.300">{student?.email}</Text>
            <Text variant="content-head.300">
              {"Contact No.:  "}
              {student?.phoneNumber}
            </Text>
          </Stack>
        </Flex>
      )}
    </Flex>
  );
};

export default RightContent;
