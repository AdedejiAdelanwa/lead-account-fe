"use client";

import AppDrawer from "@/components/Overlay/Drawer";
import { axiosInstance } from "@/utils/axiosInstance";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface FundAccountProps {
  addOpen: boolean;
  onCloseAddDrawer: () => void;
  fetchAccountDetails: () => void;
  fetchTrx: () => void;
}

const FundAccount = ({
  addOpen,
  onCloseAddDrawer,
  fetchAccountDetails,
  fetchTrx,
}: FundAccountProps) => {
  const [amount, setAmount] = useState<string>("");
  const [isFunding, setIsFunding] = useState<boolean>(false);

  const fundAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsFunding(true);
      await axiosInstance.post(`/transactions/fund`, {
        amount: parseInt(amount),
      });
      toast.success("Account funded successfully");
      setAmount("");
      onCloseAddDrawer();
      fetchAccountDetails();
      fetchTrx();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsFunding(false);
    }
  };
  return (
    <AppDrawer title="Fund Account" isOpen={addOpen} onClose={onCloseAddDrawer}>
      <form aria-label="Fund Account" onSubmit={fundAccount}>
        <FormControl isRequired>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <Input
            id="amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            border="1px solid #222"
            type="number"
          />
        </FormControl>
        <Flex mt="20px" justifyContent="space-between">
          <Button w="40%" type="button" onClick={onCloseAddDrawer}>
            Cancel
          </Button>
          <Button
            w="40%"
            type="submit"
            bg="#ff6600"
            color="white"
            fontSize="14px"
          >
            {isFunding ? <Spinner /> : "Fund"}
          </Button>
        </Flex>
      </form>
    </AppDrawer>
  );
};

export default FundAccount;
