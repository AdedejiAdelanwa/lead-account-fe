import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  bgColor?: string;
}

export const IconBox = ({ children, bgColor }: Props) => {
  return (
    <Flex
      boxSize="54px"
      bg={bgColor}
      justifyContent="center"
      alignItems="center"
      borderRadius="50%"
      mr="15px"
    >
      {children}
    </Flex>
  );
};
