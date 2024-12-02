import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Spinner,
} from "@chakra-ui/react";

import { TableProps } from "./model";
import { Pagination } from "../Navigation/Pagination";

const TableComp = ({
  columns,
  dataSource,
  isLoading = false,
  isPaginated = false,
  currentPage,
  totalPages,
  handlePageChange,
}: TableProps) => {
  return (
    <TableContainer alignItems="center">
      <Table variant="striped" colorScheme="gray">
        <Thead fontSize="18px" color="gray.700" bg="gray.50">
          <Tr>
            {columns.length > 0 &&
              columns.map((column, i) => (
                <Th key={column.title} px={6} py={3}>
                  {column.title}
                </Th>
              ))}
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Spinner />
          ) : (
            dataSource?.map((data) => (
              <Tr key={data.key} bg="white" _hover={{ bg: "gray.50" }}>
                {columns.length &&
                  columns.map((column, index) => (
                    <Td key={`${column}- ${index}`}>
                      {" "}
                      {data[column.dataIndex]}
                    </Td>
                  ))}
              </Tr>
            ))
          )}
        </Tbody>
        <Tfoot>
          <Tr display="flex" justifyContent="end">
            {isPaginated && (
              <Pagination
                currentPage={currentPage ?? 1}
                totalPages={totalPages ?? 0}
                handlePageChange={handlePageChange ?? function () {}}
              />
            )}
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
