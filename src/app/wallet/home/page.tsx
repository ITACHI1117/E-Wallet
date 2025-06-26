"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { useEffect } from "react";
import { toast } from "react-toastify";
const transactions: Transaction[] = [
  {
    id: "1",
    name: "Yara Khalil",
    avatar: "/api/placeholder/40/40",
    amount: -15.0,
    time: "Oct 14, 10:24 AM",
    type: "sent",
  },
  {
    id: "2",
    name: "Sara Ibrahim",
    avatar: "/api/placeholder/40/40",
    amount: 20.5,
    time: "Oct 12, 02:15 PM",
    type: "received",
  },
  {
    id: "3",
    name: "Ahmad Ibrahim",
    avatar: "/api/placeholder/40/40",
    amount: 12.4,
    time: "Oct 11, 01:18 AM",
    type: "received",
  },
  {
    id: "4",
    name: "Reem Khaled",
    avatar: "/api/placeholder/40/40",
    amount: -21.3,
    time: "Oct 07, 03:10 PM",
    type: "sent",
  },
  {
    id: "5",
    name: "Hiba Saleh",
    avatar: "/api/placeholder/40/40",
    amount: 209.0,
    time: "Oct 04, 08:43 AM",
    type: "received",
  },
];
const DashboardPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    toast.success("Welcome to your dashboard!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-6 pt-12 pb-8 text-white">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Bell size={20} className="text-white" />
            <Avatar className="w-8 h-8 border-2 border-white/20">
              <AvatarImage src="/api/placeholder/32/32" alt="Amanda" />
              <AvatarFallback className="bg-white/20 text-white text-sm">
                A
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-blue-100 text-sm mb-1">Hi, Amanda!</p>
          <p className="text-blue-100 text-sm mb-2">Total Balance</p>
          <h2 className="text-4xl font-bold">$124.57</h2>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => router.push("send-money")}
            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 h-12 font-semibold shadow-lg"
          >
            <Send size={16} className="mr-2" />
            Send Money
          </Button>
          <Button
            onClick={() => router.push("add-card")}
            className="bg-blue-400 hover:bg-blue-500 text-white h-12 font-semibold shadow-lg"
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
            <h3 className="text-lg font-semibold text-gray-900">
              Last Transactions
            </h3>
            <button
              onClick={() => router.push("transactions")}
              className="text-blue-500 text-sm font-medium hover:text-blue-600"
            >
              View All
            </button>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={transaction.avatar}
                        alt={transaction.name}
                      />
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
                        {transaction.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {/* Transaction type indicator */}
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                        transaction.type === "sent"
                          ? "bg-orange-400"
                          : "bg-green-400"
                      }`}
                    >
                      {transaction.type === "sent" ? (
                        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[4px] border-b-white"></div>
                      ) : (
                        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[4px] border-t-white"></div>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {transaction.name}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold text-sm ${
                      transaction.amount > 0
                        ? "text-green-500"
                        : "text-gray-900"
                    }`}
                  >
                    {transaction.amount > 0 ? "+" : ""}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
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
