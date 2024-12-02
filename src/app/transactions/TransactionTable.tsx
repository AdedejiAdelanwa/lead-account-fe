"use client";

import {
  ITableColumn,
  ITableData,
  ITransaction,
  transactionTableColumns,
} from "@/components/Table/model";
import TableComp from "@/components/Table/NewTable";
import { Badge } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface Props {
  transactions: ITransaction[];
  isPaginated: boolean;
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  handlePageChange: (arg: number) => any;
}

const TransactionTable = ({
  transactions,
  isLoading,
  isPaginated,
  currentPage,
  totalPages,
  handlePageChange,
}: Props) => {
  const [columns, setColumns] = useState<ITableColumn[]>([]);

  useEffect(() => {
    setColumns(transactionTableColumns);
  }, []);

  const dataSource: ITableData[] = transactions?.map(
    (row: any, index: number) => {
      return {
        uid: row.id,
        key: index,
        ref: row.ref,
        trxType:
          row.type === "credit" ? (
            <Badge colorScheme="green">{row.type}</Badge>
          ) : (
            <Badge colorScheme="red">{row.type}</Badge>
          ),
        amount: row.amount,
        sender:
          row.type === "debit" ? "self" : row.sender?.number || "self funded",
        receiver: row.type === "debit" ? row.recipient?.number : "self",
        date: row.createdAt.split("T")[0],
      };
    }
  );
  return (
    <TableComp
      isLoading={isLoading}
      columns={columns}
      dataSource={dataSource}
      isPaginated={isPaginated}
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  );
};
export default TransactionTable;
