import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import { BiSearch } from "react-icons/bi";

type SearchInputProps = {
  searchFilter: string;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
};

const SearchInput: React.FC<SearchInputProps> = ({
  searchFilter,
  setSearchFilter,
}) => {
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
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value.toLowerCase())}
        />
      </InputGroup>
    </Flex>
  );
};

export default SearchInput;
