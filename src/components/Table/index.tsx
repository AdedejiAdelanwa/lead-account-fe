import { Flex, Spinner } from "@chakra-ui/react";

import { TableProps } from "./model";
import { Pagination } from "../Navigation/Pagination";

const Table = ({
  columns,
  dataSource,
  isLoading = false,
  isPaginated = false,
  currentPage,
  totalPages,
  handlePageChange,
}: TableProps) => {
  return (
    <div className="flex flex-col items-center">
      <table className="w-full overflow-x-hidden text-sm text-left text-gray-500 ">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {columns.length > 0 ? (
              columns.map((column) => (
                <th key={column.key} className={"px-6 py-3"}>
                  <div className={"flex items-center justify-between"}>
                    {column.title}
                  </div>
                </th>
              ))
            ) : (
              <></>
            )}
          </tr>
        </thead>

        <tbody>
          {isLoading && <Spinner />}

          {dataSource?.map((data) => (
            <tr className="bg-white border-b  hover:bg-gray-50 " key={data.key}>
              {columns.length ? (
                columns.map((column, index) => (
                  <td key={index} className={"px-6 py-3"}>
                    {data[column.dataIndex]}
                  </td>
                ))
              ) : (
                <></>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {isPaginated && (
        <Flex w="full" justifyContent="end">
          <Pagination
            currentPage={currentPage ?? 1}
            totalPages={totalPages ?? 0}
            handlePageChange={handlePageChange ?? function () {}}
          />
        </Flex>
      )}
    </div>
  );
};

export default Table;
