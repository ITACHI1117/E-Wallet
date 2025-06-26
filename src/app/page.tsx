"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // redirect to login screen if not logged in
  // this is a temporary solution, we will use a better auth solution later
  const router = useRouter();
  useEffect(() => {
    router.push("/auth/login");
  });
  return;
}
