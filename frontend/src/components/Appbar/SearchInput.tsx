import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchInput: React.FC = () => {
  return (
    <Flex flexGrow={1} m="0px 20px" maxWidth={{ lg: "650px" }} align="center">
      <InputGroup colorScheme="white">
        <InputLeftElement pointerEvents="none">
          <BiSearch color="brand.500" />
        </InputLeftElement>
        <Input
          _hover={{ bgColor: "white" }}
          _focusVisible={{ outline: "none" }}
          _focus={{ bgColor: "white" }}
          type="text"
          placeholder={"Search"}
          bgColor="gray.200"
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
