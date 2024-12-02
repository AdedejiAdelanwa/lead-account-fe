"use client";

import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { axiosInstance } from "./axiosInstance";

interface AuthProps {
  children: ReactNode;
}

const AuthGuard = ({ children }: AuthProps) => {
  const cookie = JSON.parse(getCookie("authUser") || "{}");
  const router = useRouter();

  useEffect(() => {
    if (!cookie) {
      router.push("/login");
    }
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${cookie.token}`;
  }, [cookie, router]);

  return <>{children} </>;
};
export default AuthGuard;
