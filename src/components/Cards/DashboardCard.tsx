import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
interface CardProps {
  children: ReactNode;
}
export const DashboardCard = ({ children }: CardProps) => {
  return (
    <Flex
      borderRadius="md"
      border="1px solid"
      bg="white"
      borderColor="rgba(0,0,0,0.10)"
      p="15px"
      minW="350px"
      minH="120px"
      alignItems="center"
      boxShadow="md"
    >
      {children}
    </Flex>
  );
};
