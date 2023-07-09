import { Flex, Tab, TabIndicator, TabList, Tabs } from "@chakra-ui/react";
import React from "react";

const Navigator: React.FC = () => {
  return (
    <Flex w={{ base: "unset", md: "240px" }} justify="center">
      <Tabs
        position="relative"
        variant="unstyled"
        display={{ base: "none", md: "unset" }}
      >
        <TabList>
          <Tab _selected={{ color: "primary.50", fontSize: "14pt" }} mr="5px">
            Books
          </Tab>
          <Tab _selected={{ color: "primary.50", fontSize: "14pt" }}>
            Students
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="primary.100"
          borderRadius="1px"
        />
      </Tabs>
    </Flex>
  );
};

export default Navigator;
