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

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "@/utils/axiosInstance";
import BgImageComponent from "@/components/BackgroundImage";
import { AppSelect } from "@/components/Form/Select";
import { getCookie, setCookie } from "cookies-next";

export default function Register() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    password: "",
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsCreating(true);
      const response = await axiosInstance.post(`/auth/register`, newUser);
      setNewUser({
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        email: "",
        password: "",
      });
      setCookie("authUser", response.data);
      const authUser = JSON.parse(getCookie("authUser") || "{}");
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${authUser.token}`;
      router.push("/transactions");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <BgImageComponent imageUrl="/assets/black-youngman.jpg">
      <Flex h="auto" w="75%" overflow="hidden" borderRadius="sm">
        <LeftImageBox>
          <Image width="250" height="300" src="/assets/camel.png" alt="" />
        </LeftImageBox>
        <RightFormBox>
          <Box w="100%">
            <Heading fontSize="34px" mb="20px">
              Create account
            </Heading>
            <Text fontSize="16px">
              Enter your details below to create an account.
            </Text>
          </Box>
          <form
            onSubmit={createUser}
            style={{
              width: "100%",
              marginTop: "20px",
              backgroundColor: "inherit",
              marginBottom: "20px",
            }}
          >
            <SimpleGrid w="100%" columns={[1, 2]} spacingX={4} spacingY={6}>
              <FormControl isRequired>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  value={newUser.firstName}
                  onChange={handleChange}
                  id="firstName"
                  name="firstName"
                  border="1px solid #222"
                  type="text"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  name="lastName"
                  value={newUser.lastName}
                  onChange={handleChange}
                  border="1px solid #222"
                  type="text"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleChange}
                  border="1px solid #222"
                  type="email"
                />
              </FormControl>
              <AppSelect
                value={newUser.gender}
                name="gender"
                label="Gender"
                options={[
                  { name: "Male", value: "male" },
                  { name: "Female", value: "female" },
                ]}
                onChange={handleChange}
              />
              <FormControl isRequired>
                <FormLabel htmlFor="dob">Date of Birth</FormLabel>
                <Input
                  id="dob"
                  name="dob"
                  value={newUser.dob}
                  border="1px solid #222"
                  type="date"
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  name="password"
                  value={newUser.password}
                  border="1px solid #222"
                  type="password"
                  onChange={handleChange}
                />
              </FormControl>
            </SimpleGrid>

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
              {isCreating ? <Spinner /> : "Create"}
            </Button>
          </form>
          <Link href="/login" className="text-[12px] underline">
            Got Account? Login
          </Link>
        </RightFormBox>
      </Flex>
    </BgImageComponent>
  );
}
