"use client";
import { logoutUser } from "@/firebase/auth";
import { useUser } from "@/queries/user.queries";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // redirect to login screen if not logged in
  // this is a temporary solution, we will use a better auth solution later
  const router = useRouter();
  const { data, isSuccess, isPending, isError, error } = useUser();

  // useEffect(() => {
  //   if (isError || data == null || undefined) {
  //     router.push("/auth/login");
  //   }
  // }, [isError, data, router]);

  return <>{children}</>;
};
