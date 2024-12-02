import { Button, Flex, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (arg: number) => any;
}
export const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProps) => {
  const renderPageNumbers = () => {
    const pageNumbers: ReactNode[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Flex
          key={i}
          as="button"
          _active={{ bg: "green", color: "white" }}
          onClick={() => {
            handlePageChange(i);
          }}
          alignItems="center"
          justifyContent="space-around"
          px={3}
          py={1}
          bg={currentPage === i ? "#0A6AF0" : "white"}
          color={currentPage === i ? "white" : "gray.700"}
          _dark={{
            color: "white",
            bg: "gray.800",
          }}
          //_active={}
          // opacity={props.disabled && 0.6}
          // _hover={!props.disabled && activeStyle}
          // cursor={props.disabled && "not-allowed"}
          // {...(props.active && activeStyle)}
          // borderLeft="2px solid rgba(235, 235, 235,.8)"
        >
          {i}
        </Flex>
      );
    }
    return pageNumbers;
  };

  return (
    <Flex
      bg="white"
      //p={2}
      mt={4}
      //w="40%"
      alignItems="center"
      justifyContent="end"
      border="2px solid rgba(235, 235, 235,.8)"
      borderRadius="md"
      overflow="hidden"
    >
      <Flex>
        <Button
          isDisabled={totalPages < 2}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {renderPageNumbers()}
        <Button
          isDisabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Flex>
    </Flex>
  );
};
