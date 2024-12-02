import { Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const MainContent = ({ children }: Props) => {
  return (
    <Stack
      pos="relative"
      w="80%"
      h="100%"
      //overflowY="auto"
      bg="white"
      left="20%"
      pt="20px"
      px="30px"
      pb="20px"
    >
      {children}
    </Stack>
  );
};
