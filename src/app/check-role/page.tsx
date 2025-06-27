"use client";
import { useUser } from "@/queries/user.queries";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RoleLoadingSpinner = () => {
  const router = useRouter();
  const {
    data: userData,
    isSuccess: useSuccess,
    isPending: userPending,
    isError: userIsError,
    error: userError,
    refetch,
  } = useUser();

  useEffect(() => {
    if (useSuccess) {
      if (userData.userRole === "admin") {
        router.push("/admin/home");
      } else if (userData.userRole === "student") {
        router.push("/wallet/home");
      } else {
        router.push("login"); // fallback
      }
    }
  }, [useSuccess]);
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="text-center">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>

        {/* Text */}
        <p className="text-gray-600 font-medium">Checking role...</p>
      </div>
    </div>
  );
};

export default RoleLoadingSpinner;
