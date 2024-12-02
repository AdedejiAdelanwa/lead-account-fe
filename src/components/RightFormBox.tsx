import { Box } from "@chakra-ui/react";
import React from "react";
interface RightFormBoxProps {
  children: React.ReactNode;
}

const RightFormBox: React.FC<RightFormBoxProps> = ({ children }) => {
  return (
    <Box w={["100%", "60%"]} bg="#ffffff" p="50px">
      {" "}
      {children}
    </Box>
  );
};

export default RightFormBox;
