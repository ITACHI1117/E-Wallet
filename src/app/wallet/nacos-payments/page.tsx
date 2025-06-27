"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetAllEvents } from "@/queries/event.queries";
import EventList from "@/components/EventList";
import { useUser } from "@/queries/user.queries";
// Use proper store hook
import { toast } from "react-toastify";
import { useStoreUser } from "@/store/userStore";

// Types

interface PaymentRequest {
  id: string;
  name: string;
  avatar: string;
  amount: number;
  date: string;
  isPaid?: boolean;
}

interface RequestGroup {
  paymentType: string;
  requests: PaymentRequest[];
}

const NacosPayments = () => {
  const [requestGroups, setRequestGroups] = useState<RequestGroup[]>([
    {
      paymentType: "NACOS",
      requests: [
        {
          id: "1",
          name: "Nacos",
          avatar: "/api/placeholder/40/40",
          amount: 3000,
          date: "Oct 20",
          isPaid: false,
        },
      ],
    },
    {
      paymentType: "Events",
      requests: [
        {
          id: "5",
          name: "Dinner party",
          avatar: "/api/placeholder/40/40",
          amount: 2000,
          date: "Sep 25",
          isPaid: false,
        },
        {
          id: "6",
          name: "Movie Night",
          avatar: "/api/placeholder/40/40",
          amount: 5000,
          date: "Sep 22",
          isPaid: false,
        },
        {
          id: "7",
          name: "Educational Workshop",
          avatar: "/api/placeholder/40/40",
          amount: 1500,
          date: "Sep 18",
          isPaid: false,
        },
        {
          id: "8",
          name: "Concert",
          avatar: "/api/placeholder/40/40",
          amount: 15000,
          date: "Sep 15",
          isPaid: false,
        },
      ],
    },
  ]);

  const router = useRouter();

  // Use proper store hook
  const user = useStoreUser();

  const {
    data: getAllEventData,
    isSuccess: getAllEventSuccess,
    isError: getAllEventError,
    isPending: getAllEventPending,
    error,
    refetch,
  } = useGetAllEvents();

  const { data: userData, isSuccess: isUserSuccess } = useUser();

  const calculateTotalAmount = () => {
    return requestGroups.reduce((total, group) => {
      return (
        total +
        group.requests.reduce((groupTotal, request) => {
          return groupTotal + (request.isPaid ? 0 : request.amount);
        }, 0)
      );
    }, 0);
  };

  const handleSendAllPayments = () => {
    // Mark all requests as paid
    setRequestGroups((prevGroups) =>
      prevGroups.map((group) => ({
        ...group,
        requests: group.requests.map((request) => ({
          ...request,
          isPaid: true,
        })),
      }))
    );
  };

  useEffect(() => {
    refetch();
    console.log("User from store:", user);

    if (isUserSuccess && userData) {
      console.log("User data from API:", userData);
    }

    if (getAllEventSuccess && getAllEventData) {
      console.log("Event data:", getAllEventData);
    }

    if (getAllEventError && error) {
      console.log("Event error:", error);
    }
  }, [
    refetch,
    isUserSuccess,
    user,
    userData,
    getAllEventSuccess,
    getAllEventData,
    getAllEventError,
    error,
  ]);

  // FIXED: Proper navigation with validation
  const handleSendPay = (id: string, createdBy: string, price: number) => {
    console.log("handleSendPay called with:", { id, createdBy, price, user });

    // Validate required data
    if (!id) {
      toast.error("Event ID is missing");
      return;
    }

    if (!createdBy) {
      toast.error("Creator information is missing");
      return;
    }

    if (!price || price <= 0) {
      toast.error("Invalid price");
      return;
    }

    if (!user || !user.walletId) {
      toast.error("User wallet information not found. Please login again.");
      return;
    }

    // Create proper URL with validation
    const url = `/wallet/send-money/${encodeURIComponent(
      id
    )}?createdBy=${encodeURIComponent(
      createdBy
    )}&price=${price}&userId=${encodeURIComponent(user.walletId)}`;

    console.log("Navigating to:", url);

    try {
      router.push(url);
    } catch (error) {
      console.error("Navigation error:", error);
      toast.error("Failed to navigate to payment page");
    }
  };

  const totalAmount = calculateTotalAmount();
  const hasUnpaidRequests = totalAmount > 0;

  // Show loading if user not loaded
  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading user data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">NACOS Payments</h1>
        <div className="w-8"></div>
      </div>

      {/* Debug Info (remove in production) */}
      <div className="mx-6 mt-2 p-3 bg-gray-50 rounded text-xs">
        <p>
          <strong>User Wallet ID:</strong> {user?.walletId || "Not found"}
        </p>
        <p>
          <strong>User ID:</strong> {user?.id || "Not found"}
        </p>
      </div>

      {/* Total Amount Banner */}
      <div className="mx-6 mt-6 mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="text-center">
          <span className="text-sm text-gray-600">Total Amount: </span>
          <span className="text-sm font-semibold text-yellow-600">
            ₦{totalAmount.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Requests List */}
      <div className="flex flex-col px-6 pb-24">
        {getAllEventSuccess && getAllEventData ? (
          <EventList
            getAllEventData={getAllEventData}
            handleSendPay={handleSendPay}
          />
        ) : getAllEventPending ? (
          <div className="text-center py-8">
            <div className="w-6 h-6 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600">No events found</p>
          </div>
        )}
      </div>

      {/* Send All Payment Button */}
      {hasUnpaidRequests && (
        <div className="p-6 pt-0">
          <Button
            onClick={handleSendAllPayments}
            className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-base rounded-lg shadow-lg"
          >
            <Send size={16} className="mr-2" />
            Send All Payment
          </Button>
        </div>
      )}
    </div>
  );
};

export default NacosPayments;

// // Alternative handleSendPay using URLSearchParams for complex URLs
// const handleSendPayAlternative = (id: string, createdBy: string, price: number) => {
//   if (!user?.walletId) {
//     toast.error("User not found");
//     return;
//   }

//   const searchParams = new URLSearchParams({
//     createdBy: createdBy,
//     price: price.toString(),
//     userId: user.walletId
//   });

//   const url = `/wallet/send-money/${encodeURIComponent(id)}?${searchParams.toString()}`;

//   console.log("Navigating to:", url);
//   router.push(url);
// };
