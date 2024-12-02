"use client";

import {
  Button,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiChevronDown } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";
import { useEffect, useState } from "react";

const TopNav = () => {
  const [authUser, setAuthUser] = useState<any>({});

  useEffect(() => {
    if (hasCookie("authUser")) {
      setAuthUser(JSON.parse(getCookie("authUser") || "{}"));
    }
  }, []);

  const logout = () => {
    deleteCookie("authUser");
    if (!hasCookie("authUser")) {
      window.location.replace("/login");
    }
  };
  return (
    <HStack
      h="10vh"
      bg="white"
      borderBottomWidth="0.4px"
      borderColor="rgba(0,0,0,0.10)"
      justifyContent="end"
      px="30px"
    >
      <Flex w="15%" alignItems="center" justifyContent="space-around">
        <IoMdNotificationsOutline size={25} />

        <Menu>
          <MenuButton
            py="1px"
            bg="#F2F7FF"
            color="#2B41E8"
            fontSize="12px"
            fontWeight="normal"
            as={Button}
            rightIcon={<FiChevronDown />}
          >
            {authUser?.firstName}
          </MenuButton>
          <MenuList fontSize="14px">
            <MenuItem color="red" onClick={() => logout()}>
              <IoLogOutOutline />
              Log out
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </HStack>
  );
};
export default TopNav;
