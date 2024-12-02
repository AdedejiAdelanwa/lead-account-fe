import { VStack, Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface Props {
  imageUrl: string;
  children: ReactNode;
}

export default function BgImageComponent(props: Props) {
  const { imageUrl, children } = props;
  return (
    <Box
      w="100%"
      h="100vh"
      bgImage={`url(${imageUrl})`}
      bgSize="cover"
      bgRepeat="no-repeat"
      bgPos="center"
    >
      <VStack h="100%" w="100%" bg={`rgba(0,0,0,.4)`} justifyContent="center">
        {children}
      </VStack>
    </Box>
  );
}
