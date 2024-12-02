"use client";

import LeftImageBox from "@/components/LeftImageBox";
import RightFormBox from "@/components/RightFormBox";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "@/utils/axiosInstance";
import BgImageComponent from "@/components/BackgroundImage";
import { AppSelect } from "@/components/Form/Select";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const requestAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsAuthenticating(true);
      const response = await axiosInstance.post(`/auth/login`, user);

      setUser({
        email: "",
        password: "",
      });
      if (response.status === 201) {
        setCookie("authUser", response.data);
        const authUser = JSON.parse(getCookie("authUser") || "{}");
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${authUser.token}`;
      }

      router.push("/transactions");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <BgImageComponent imageUrl="/assets/black-youngman.jpg">
      <Flex h="auto" w="75%" overflow="hidden" borderRadius="sm">
        <LeftImageBox>
          <Image width="250" height="300" src="/assets/camel.png" alt="Logo" />
        </LeftImageBox>
        <RightFormBox>
          <Box w="100%">
            <Heading fontSize="34px" mb="20px">
              Login
            </Heading>
            <Text fontSize="16px">Enter your email and password below.</Text>
          </Box>
          <form
            onSubmit={requestAuth}
            style={{
              width: "100%",
              marginTop: "20px",
              backgroundColor: "inherit",
              marginBottom: "20px",
            }}
          >
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                border="1px solid #222"
                type="email"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                name="password"
                value={user.password}
                border="1px solid #222"
                type="password"
                onChange={handleChange}
              />
            </FormControl>

            <Button
              type="submit"
              w="100%"
              bg="#ff6600"
              color="white"
              mt="30px"
              size="md"
              fontWeight="normal"
              _hover={{
                bg: "white",
                color: "#ff6600",
                boxShadow: "md",
                transform: "translateY(-1px)",
              }}
            >
              {isAuthenticating ? <Spinner /> : "Login"}
            </Button>
          </form>
          <Link href="/" className="text-[12px] underline">
            New User? Register
          </Link>
        </RightFormBox>
      </Flex>
    </BgImageComponent>
  );
}
