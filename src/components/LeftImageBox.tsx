import React from "react";
import { VStack } from "@chakra-ui/react";

interface LeftImageBoxProps {
  children: React.ReactNode;
}

export default function LeftImageBox({
  children,
}: Readonly<LeftImageBoxProps>) {
  //const { children } = props;

  return (
    <VStack
      w={["0%", "40%"]}
      h="100%"
      justifyContent="center"
      bg={`rgba(255,255,255,.4)`}
    >
      {children}
    </VStack>
  );
}
