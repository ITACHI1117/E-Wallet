"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetAllEvents } from "@/queries/event.queries";
import EventList from "@/components/EventList";
import ActivityIndicator from "@/components/ActivityIndicator";
import { useUser } from "@/queries/user.queries";
import { storeUser } from "@/store/storeUser";

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

interface RequestsProps {
  onBack?: () => void;
  onSendPayment?: (requestId: string) => void;
  onSendAllPayments?: () => void;
  className?: string;
}

const NacosPayments: React.FC<RequestsProps> = ({
  onBack,
  onSendPayment,
  onSendAllPayments,
  className = "",
}) => {
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleSendPayment = (requestId: string) => {
    // Update the request as paid
    setRequestGroups((prevGroups) =>
      prevGroups.map((group) => ({
        ...group,
        requests: group.requests.map((request) =>
          request.id === requestId ? { ...request, isPaid: true } : request
        ),
      }))
    );

    if (onSendPayment) {
      onSendPayment(requestId);
    }
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

    if (onSendAllPayments) {
      onSendAllPayments();
    }
  };

  const [userWalletId, setUserWalletId] = useState({});

  const {
    data: getAllEventData,
    isSuccess: getAllEventSuccess,
    isError: getAllEventError,
    isPending: getAllEventPending,
    error,
    refetch,
  } = useGetAllEvents();

  const {
    data: userData,
    isSuccess: isUserSuccess,
    isPending: isUserPending,
    isError: isUserError,
    error: useError,
  } = useUser();

  const totalAmount = calculateTotalAmount();
  const hasUnpaidRequests = totalAmount > 0;

  const router = useRouter();

  useEffect(() => {
    refetch();
    console.log("hi");
    console.log(storeUser.state);
    isUserSuccess && console.log(userData);
    isUserSuccess && setUserWalletId(storeUser.state);

    getAllEventSuccess && console.log(getAllEventData);
    getAllEventError && console.log(error);
    getAllEventPending && console.log("...looading");
  }, [refetch, isUserSuccess]);

  const handleSendPay = (id, createdBy, price, userId) => {
    router.push(
      `send-money/${id}?createdBy=${createdBy}&price=${price}&userId=${userWalletId.walletId}`
    );
  };

  return (
    <div className={`min-h-screen bg-white flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">NACOS Payments</h1>
        <div className="w-8"></div> {/* Spacer for center alignment */}
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
      <div className="flex flex-col  px-6 pb-24">
        {getAllEventSuccess ? (
          <EventList
            getAllEventData={getAllEventData}
            handleSendPay={handleSendPay}
          />
        ) : (
          <h1>Loading</h1>
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
