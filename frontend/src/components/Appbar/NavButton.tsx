import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineBook, AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type NavButtonProps = {
  view: "books" | "students";
};

const NavButton: React.FC<NavButtonProps> = ({ view }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    console.log("lol");
    if (view === "books") navigate("/students");
    else navigate("/books");
  };
  return (
    <Button display={{ base: "unset", md: "none" }} onClick={handleClick}>
      {view === "students" ? (
        <AiOutlineBook size="16pt" />
      ) : (
        <AiOutlineUser size="16pt" />
      )}
    </Button>
  );
};

export default NavButton;
