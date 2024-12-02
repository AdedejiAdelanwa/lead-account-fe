"use client";
import SideBar from "@/components/Navigation/SideBar";
import TopNav from "@/components/Navigation/TopNav";
import { axiosInstance } from "@/utils/axiosInstance";
import AuthGuard from "@/utils/useAuth";
import { Box, Flex } from "@chakra-ui/react";
import { getCookie, hasCookie } from "cookies-next";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // useEffect(() => {
  //   if (hasCookie("authUser")) {
  //     const authUser = JSON.parse(getCookie("authUser") || "{}");
  //     axiosInstance.defaults.headers.common[
  //       "Authorization"
  //     ] = `Bearer ${authUser.token}`;
  //   }
  // }, []);
  return (
    <AuthGuard>
      <Box pos="relative" w="100%" h="100%">
        <TopNav />
        <Flex>
          <SideBar />
          {children}
        </Flex>
      </Box>
      <ToastContainer />
    </AuthGuard>
  );
}
