import { Flex, Box, Button, Container, Text } from "@chakra-ui/react";
import React from "react";
import SearchInput from "./SearchInput";
import Navigator from "./Navigator";
import { View } from "../../types";
import NavButton from "./NavButton";

type AppBarProps = {
  view: View;
  searchFilter: string;
  setSearchFilter: React.Dispatch<React.SetStateAction<string>>;
};

const AppBar: React.FC<AppBarProps> = ({
  view,
  searchFilter,
  setSearchFilter,
}) => {
  return (
    <>
      <Flex
        h="80px"
        bgColor="primary.500"
        align="center"
        p="0px 20px"
        position="fixed"
        overflow="hidden"
        top="0px"
        w="100%"
        zIndex="100"
        justify="space-between"
      >
        <Text
          color="gray.800"
          fontSize="22pt"
          fontWeight="600"
          display={{ base: "none", md: "unset" }}
          w="240px"
        >
          Library Portal
        </Text>
        <SearchInput
          searchFilter={searchFilter}
          setSearchFilter={setSearchFilter}
        />
        <NavButton view={view} />
        <Navigator view={view} />
      </Flex>
    </>
  );
};

export default AppBar;
