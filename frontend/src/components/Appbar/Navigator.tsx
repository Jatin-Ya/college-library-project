import { Flex, Tab, TabIndicator, TabList, Tabs } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { View } from "../../types";

type NavigatorProps = {
  view: View;
};
const Navigator: React.FC<NavigatorProps> = ({ view }) => {
  const navigate = useNavigate();
  return (
    <Flex w={{ base: "unset", md: "240px" }} justify="center">
      <Tabs
        position="relative"
        variant="unstyled"
        display={{ base: "none", md: "unset" }}
        defaultIndex={view === "books" ? 0 : 1}
      >
        <TabList>
          <Tab
            _selected={{ color: "primary.50", fontSize: "14pt" }}
            mr="5px"
            onClick={() => navigate("/books")}
          >
            Books
          </Tab>
          <Tab
            _selected={{ color: "primary.50", fontSize: "14pt" }}
            onClick={() => navigate("/students")}
          >
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
