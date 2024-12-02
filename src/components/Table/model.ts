import { ReactNode } from "react";

export interface ITableColumn {
  title: string;
  dataIndex: string;
  key: string;
}

export class ITableData<T = any> {
  [key: string]: T | number | string | ReactNode;

  constructor(
    data: { [K in keyof ITableData<T>]?: ITableData<T>[K] } & Partial<
      ITableData<T>
    >
  ) {
    Object.assign(this, data);
  }
}

export interface TableProps {
  columns: ITableColumn[];
  dataSource: ITableData[];
  isLoading: boolean;
  isPaginated?: boolean;
  currentPage?: number;
  totalPages?: number;
  handlePageChange?: (arg: number) => any;
}

type Account = { id: string; number: number; balance: number };
type User = { id: string; number: string; bearerName: string };

export interface ITransaction {
  ref: string;
  amount: number;
  type: string;
  account: Account;
  sender: User;
  recipient: User;
  createdAt: string;
}

export const transactionTableColumns: ITableColumn[] = [
  {
    title: "Ref Number",
    dataIndex: "ref",
    key: "ref",
  },
  { title: "Type", dataIndex: "trxType", key: "trxType" },

  { title: "Sender", dataIndex: "sender", key: "sender" },
  { title: "Amount", dataIndex: "amount", key: "amount" },
  { title: "Receiver", dataIndex: "receiver", key: "receiver" },
  { title: "Date", dataIndex: "date", key: "date" },
];
