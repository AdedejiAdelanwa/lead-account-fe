"use client";

import { DashboardCard } from "@/components/Cards/DashboardCard";
import { IconBox } from "@/components/IconBox";
import { MainContent } from "@/components/Layout/MainContent";
import { axiosInstance } from "@/utils/axiosInstance";
import {
  Box,
  Button,
  Flex,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { TbDetails } from "react-icons/tb";
import { CiWallet } from "react-icons/ci";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CardText } from "@/components/Cards/Cardtext";
import { IoMdAdd } from "react-icons/io";
import FundAccount from "./FundAccount";
import { GrTransaction } from "react-icons/gr";
import NewTransfer from "./Transfer";
import TransactionTable from "./TransactionTable";
import { ITransaction } from "@/components/Table/model";

interface IUserAccount {
  id: string | null;
  number: string | null;
  balance: number | null;
}

const Transactions = () => {
  const [accountDetails, setAccountDetails] = useState<IUserAccount>({
    id: null,
    number: null,
    balance: null,
  });
  const [trx, setTrx] = useState<ITransaction[]>([]);
  const [isFetchingDetails, setIsFetchingDetails] = useState<boolean>(false);
  const [isFetchingTrx, setIsFetchingTrx] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const pageSize = 10;
  const fundAccountModal = useDisclosure();
  const transferModal = useDisclosure();

  const requestAccountDetails = async () => {
    try {
      setIsFetchingDetails(true);
      const response = await axiosInstance.get("transactions/accounts");

      setAccountDetails(response.data[0]);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsFetchingDetails(false);
    }
  };

  const requestUserTransactions = useCallback(async () => {
    try {
      setIsFetchingTrx(true);

      const queryParams: {
        offset: number;
        limit: number;
        startDate?: Date;
        endDate?: Date;
      } = {
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize,
      };

      if (typeof startDate !== "undefined") queryParams.startDate = startDate;
      if (typeof endDate !== "undefined") queryParams.startDate = endDate;

      const response = await axiosInstance.get("/transactions/transactions", {
        params: queryParams,
      });
      console.log("response", response);
      setTrx(response.data.items);
      setTotalPages(Math.ceil(response.data.totalCount / pageSize));
    } catch (error) {
    } finally {
      setIsFetchingTrx(false);
    }
  }, [pageNumber]);

  const handlePageChange = (currentPage: number) => {
    if (currentPage >= 1 && currentPage <= totalPages) {
      setPageNumber(currentPage);
    }
  };
  useEffect(() => {
    requestAccountDetails();
    requestUserTransactions();
  }, []);
  return (
    <MainContent>
      <Flex justifyContent="space-between" mt="30px" overflowX="auto">
        {isFetchingDetails ? (
          <Spinner />
        ) : (
          <DashboardCard>
            <IconBox bgColor="rgba(227,230,255,.55)">
              <TbDetails color="#2B41E8" size="24px" />
            </IconBox>
            <CardText
              title="Account Number"
              quantity={accountDetails?.number}
            />
          </DashboardCard>
        )}
        {isFetchingDetails ? (
          <Spinner />
        ) : (
          <DashboardCard>
            <IconBox bgColor="rgba(227,230,255,.55)">
              <CiWallet color="#ff6600" size="24px" />
            </IconBox>
            <CardText
              title="Account Balance (₦)"
              quantity={accountDetails?.balance}
            />
          </DashboardCard>
        )}
      </Flex>

      <Flex
        h="60px"
        alignItems="center"
        mt="10px"
        justifyContent="space-between"
      >
        <Button
          color="#ff6600"
          bg="white"
          border="1px solid #ff6600"
          borderRadius="md"
          fontSize="14px"
          onClick={fundAccountModal.onOpen}
        >
          <IoMdAdd size={20} /> Fund Account
        </Button>
        <Button
          bg="#ff6600"
          color="white"
          fontSize="14px"
          borderRadius="md"
          onClick={transferModal.onOpen}
        >
          <GrTransaction size={20} style={{ marginRight: "10px" }} />
          Transfer
        </Button>
        <FundAccount
          addOpen={fundAccountModal.isOpen}
          onCloseAddDrawer={fundAccountModal.onClose}
          fetchAccountDetails={requestAccountDetails}
          fetchTrx={requestUserTransactions}
        />
        <NewTransfer
          addOpen={transferModal.isOpen}
          onCloseAddDrawer={transferModal.onClose}
          fetchAccountDetails={requestAccountDetails}
          fetchTrx={requestUserTransactions}
        />
      </Flex>

      <TransactionTable
        transactions={trx}
        isLoading={isFetchingTrx}
        isPaginated={true}
        currentPage={pageNumber}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </MainContent>
  );
};
export default Transactions;
