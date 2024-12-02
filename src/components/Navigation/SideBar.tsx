"use client";

import { Flex, Icon, Image, Stack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { GrTransaction } from "react-icons/gr";

export const backOfficeCommonUrl = "/social-welfare/adoption-process";

const SideBar = () => {
  const NavItem = (props: any) => {
    const { icon, navUrl, children, ...rest } = props;
    const pathname = usePathname();
    const isActive = (path?: string): boolean => {
      if (path === pathname) return true;
      return false;
    };

    return (
      <Link href={navUrl ? `${navUrl}` : "#"}>
        <Flex
          align="center"
          px="4"
          rounded="none"
          py="3"
          cursor="pointer"
          borderRadius={isActive(navUrl) ? "md" : ""}
          color={isActive(navUrl) ? "white" : "#1E1E1E"}
          bg={isActive(navUrl) ? "#ff6600" : "inherit"}
          borderBottom={isActive(navUrl) ? "none" : `1px solid rgba(0,0,0,.3)`}
          _hover={{
            bg: "#ff6600",
            color: "white",
            rounded: "md",
          }}
          role="group"
          fontWeight="semibold"
          transition=".15s ease"
          {...rest}
        >
          {icon && (
            <Icon
              mr="15px"
              boxSize="25px"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    );
  };
  return (
    <Stack
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="100vh"
      w="20%"
      bg="white"
      py="30px"
      px="20px"
      borderRightWidth="0.4px"
      borderColor="rgba(0,0,0,0.10)"
    >
      <Image boxSize="80px" objectFit="cover" src="/assets/camel.png" />

      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="#1E1E1E"
        aria-label="Main Navigation"
        gap="10px"
      >
        <NavItem icon={GrTransaction} navUrl={`/transactions`}>
          Transaction
        </NavItem>
      </Flex>
      {/* <ButtonGroup>
        <IoLogOutOutline />
        Log out
      </ButtonGroup> */}
    </Stack>
  );
};
export default SideBar;
