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
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

interface NewTransferProps {
  addOpen: boolean;
  onCloseAddDrawer: () => void;
  fetchAccountDetails: () => void;
  fetchTrx: () => void;
}

const NewTransfer = ({
  addOpen,
  onCloseAddDrawer,
  fetchAccountDetails,
  fetchTrx,
}: NewTransferProps) => {
  const [transferInfo, setTransferInfo] = useState({
    recipient: "",
    amount: "",
  });
  const [isTransfering, setIsTransfering] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTransferInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const fundAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsTransfering(true);
      await axiosInstance.post(`/transactions/transfer`, {
        recipient: transferInfo.recipient,
        amount: parseInt(transferInfo.amount),
      });
      toast.success(`Transfer to ${transferInfo.recipient} was successfully`);
      setTransferInfo({ recipient: "", amount: "" });
      onCloseAddDrawer();
      fetchAccountDetails();
      fetchTrx();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsTransfering(false);
    }
  };
  return (
    <AppDrawer title="Tranfer Fund" isOpen={addOpen} onClose={onCloseAddDrawer}>
      <form aria-label="Tranfer Fund" onSubmit={fundAccount}>
        <FormControl isRequired>
          <FormLabel htmlFor="recipient">Recipient Account No.</FormLabel>
          <Input
            id="recipient"
            name="recipient"
            value={transferInfo.recipient}
            onChange={handleChange}
            border="1px solid #222"
            type="tel"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="amount">Amount</FormLabel>
          <Input
            id="amount"
            name="amount"
            value={transferInfo.amount}
            onChange={handleChange}
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
            {isTransfering ? <Spinner /> : "Transfer"}
          </Button>
        </Flex>
      </form>
    </AppDrawer>
  );
};

export default NewTransfer;
