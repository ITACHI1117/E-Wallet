"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/firebase/auth";
import { useGetEvents } from "@/queries/event.queries";
import { useUser } from "@/queries/user.queries";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowUpDown,
  Bell,
  Download,
  Home,
  Send,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DashboardPage: React.FC = () => {
  const router = useRouter();

  const { data, isSuccess, isPending, isError, error } = useUser();
  const queryClient = useQueryClient();

  const {
    mutate,
    data: myEvents,
    isSuccess: isGetEventSuccess,
    isPending: isGetEventPending,
    error: getEventError,
  } = useGetEvents();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      mutate(data.walletId);
    }
    if (isError) {
      toast.error(
        `There was an error while trying to retrieve your information`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      // router.push()
    }
  }, [isSuccess, isError]);

  const [totalReceived, setTotalReceived] = useState(0);

  useEffect(() => {
    if (myEvents?.length > 0) {
      const total = myEvents.reduce((sum, event) => {
        return sum + (event.totalAmountReceived || 0);
      }, 0);

      setTotalReceived(total);
    }
  }, [myEvents]);

  if (isError) {
    return (
      <div>
        <h1 className="text-red-500">Error Retrieving information</h1>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50">
        <style jsx>{`
          @keyframes wave {
            0% {
              transform: translateX(-100%);
            }
            50% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .skeleton-wave {
            position: relative;
            overflow: hidden;
            background-color: #f3f4f6;
          }
          .skeleton-wave::after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.6),
              transparent
            );
            animation: wave 1.6s ease-in-out infinite;
            content: "";
          }
          .skeleton-wave-blue::after {
            background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
            );
          }
        `}</style>

        {/* Header Section */}
        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 px-6 pt-12 pb-8">
          {/* Header Title and Icons */}
          <div className="flex justify-between items-start mb-6">
            <div className="h-6 w-24 bg-white/20 rounded skeleton-wave skeleton-wave-blue"></div>
            <div className="flex items-center space-x-4">
              <div className="w-5 h-5 bg-white/20 rounded skeleton-wave skeleton-wave-blue"></div>
              <div className="w-8 h-8 rounded-full bg-white/20 skeleton-wave skeleton-wave-blue"></div>
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-6">
            <div className="h-4 w-20 mb-2 bg-blue-100/30 rounded skeleton-wave skeleton-wave-blue"></div>
            <div className="h-4 w-24 mb-2 bg-blue-100/30 rounded skeleton-wave skeleton-wave-blue"></div>
            <div className="h-10 w-32 bg-white/20 rounded skeleton-wave skeleton-wave-blue"></div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 w-full bg-blue-400/30 rounded-lg skeleton-wave skeleton-wave-blue"></div>
            <div className="h-12 w-full bg-yellow-400/30 rounded-lg skeleton-wave skeleton-wave-blue"></div>
          </div>
        </div>

        {/* Transactions Section */}
        <div className="bg-white rounded-t-3xl -mt-4 pt-6 pb-20 flex-1">
          <div className="px-6">
            {/* Section Header */}
            <div className="flex justify-between items-center mb-6">
              <div className="h-5 w-32 rounded skeleton-wave"></div>
              <div className="h-4 w-16 rounded skeleton-wave"></div>
            </div>

            {/* Transaction Items */}
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-3">
                    {/* Avatar with Initials */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full skeleton-wave"></div>
                      {/* Status Indicator */}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full skeleton-wave"></div>
                    </div>
                    <div>
                      <div className="h-4 w-20 mb-1 rounded skeleton-wave"></div>
                      <div className="h-3 w-16 rounded skeleton-wave"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="h-4 w-12 rounded skeleton-wave"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 px-6 py-3">
          <div className="flex justify-around items-center">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-1 py-2"
              >
                <div className="w-5 h-5 rounded skeleton-wave"></div>
                <div className="h-3 w-8 rounded skeleton-wave"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 px-6 pt-12 pb-8 text-white">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Bell size={20} className="text-white" />
            <Avatar
              className="w-8 h-8 border-2 border-white/20"
              onClick={() => {
                queryClient.clear(); // remove just the user data
                router.push("/auth/login");
                logoutUser();
              }}
            >
              <AvatarImage src="/api/placeholder/32/32" alt="Amanda" />
              <AvatarFallback className="bg-white/20 text-white text-sm">
                A
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-blue-100 text-sm mb-1">Hi, {data?.firstName}!</p>
          <p className="text-blue-100 text-sm mb-2">Total Balance</p>
          <h2 className="text-4xl font-bold">₦{totalReceived}</h2>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => router.push("create-event")}
            className="bg-blue-400 hover:bg-blue-500 text-gray-900 h-12 font-semibold shadow-lg"
          >
            <Send size={16} className="mr-2" />
            Create Event
          </Button>
          <Button
            onClick={() => router.push("add-card")}
            className="bg-yellow-400 hover:bg-yellow-500 text-white h-12 font-semibold shadow-lg"
          >
            <Download size={16} className="mr-2" />
            Fund Wallet
          </Button>
        </div>
      </div>

      {/* Transactions Section */}
      <div className="bg-white rounded-t-3xl -mt-4 pt-6 pb-20 flex-1">
        <div className="px-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">All Events</h3>
          </div>

          <div className="space-y-4">
            {myEvents && myEvents?.length > 0 ? (
              myEvents?.map((event) => (
                <div
                  key={event.createdAt}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={event.avatar} alt={event.eventName} />
                        <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
                          {event.eventName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {/* event type indicator */}
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                          event.type === "sent"
                            ? "bg-orange-400"
                            : "bg-green-400"
                        }`}
                      >
                        {event.type === "sent" ? (
                          <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-white"></div>
                        ) : (
                          <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-white"></div>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {event.eventName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {event.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold text-sm ${
                        event.totalAmountReceived > 0
                          ? "text-green-500"
                          : "text-gray-900"
                      }`}
                    >
                      {event.totalAmountReceived > 0 ? "+" : ""}$
                      {Math.abs(event.totalAmountReceived).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <h1>
                {" "}
                No Recent Transactions <span>Send Money Now!!</span>
              </h1>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-sm bg-white border-t border-gray-200 px-6 py-3">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center space-y-1 py-2">
            <Home size={20} className="text-blue-500" />
            <span className="text-xs text-blue-500 font-medium">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2">
            <ArrowUpDown size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Transactions</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2">
            <Users size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Contacts</span>
          </button>
          <button className="flex flex-col items-center space-y-1 py-2">
            <User size={20} className="text-gray-400" />
            <span className="text-xs text-gray-400">Profile</span>
          </button>
        </div>
      </div> */}
    </div>
  );
};
export default DashboardPage;
