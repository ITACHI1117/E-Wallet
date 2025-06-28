"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("landing");
    }, 3000);
  }, []);
  return (
    <div className="relative h-screen bg-gradient-to-b from-blue-500 to-blue-600 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo Container */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg">
            {/* Navigation/Arrow Icon */}
            <svg
              className="w-10 h-10 text-blue-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2L13.41 3.41L8.83 8H20V10H8.83L13.41 14.59L12 16L4 8L12 2Z"
                transform="rotate(45 12 12)"
              />
            </svg>
          </div>
        </div>

        {/* App Name */}
        <h1 className="text-white text-2xl font-semibold tracking-wide">
          NACOS Pay
        </h1>
      </div>
    </div>
  );
}
