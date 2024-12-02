import { Stack, Text } from "@chakra-ui/react";

interface Props {
  title: string;
  quantity: string | number | null;
}

export const CardText = ({ title, quantity }: Props) => {
  return (
    <Stack gap="0px" textAlign="left">
      <Text fontSize="14px" fontWeight="thin" color="GrayText">
        {title}
      </Text>
      <Text fontSize="22px" fontWeight="bold">
        {quantity}
      </Text>
    </Stack>
  );
};
