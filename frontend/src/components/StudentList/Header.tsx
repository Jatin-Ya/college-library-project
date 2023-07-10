import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const Header: React.FC = () => {
  return (
    <Flex
      position="fixed"
      h="60px"
      bgColor="primary.100"
      maxW="1080px"
      w="100%"
      align="center"
      zIndex="50"
      pr="20px"
      borderBottom="1px solid"
      borderBottomColor="primary.500"
      dropShadow="lg"
    >
      <Flex flex="1" justify="space-evenly">
        <Text w="20%" textAlign="center" fontWeight="600" color="primary.900">
          Student ID.
        </Text>
        <Text w="30%" textAlign="center" fontWeight="600" color="primary.900">
          Name
        </Text>
        <Text
          w="20%"
          textAlign="center"
          fontWeight="600"
          color="primary.900"
          display={{ base: "none", md: "unset" }}
        >
          Books Issued
        </Text>
      </Flex>
      <Flex w="99px" display={{ base: "none", md: "unset" }} />
    </Flex>
  );
};

export default Header;
