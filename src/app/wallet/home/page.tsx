"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/firebase/auth";
import { useUser } from "@/queries/user.queries";
import { storeUser } from "@/store/storeUser";
import { useQueryClient } from "@tanstack/react-query";
import { Bell, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

// Types
interface Transaction {
  id: string;
  name: string;
  avatar: string;
  amount: number;
  time: string;
  type: "sent" | "received";
}

// Utility functions
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
};

const formatCurrency = (amount: number): string => {
  return `₦${amount}`;
};

const formatTransactionAmount = (type: string, amount: number): string => {
  return `${type === "sent" ? "-" : "+"}$${Math.abs(amount).toFixed(2)}`;
};

// Skeleton Component
const DashboardSkeleton: React.FC = () => (
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
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-6 pt-12 pb-8">
      <div className="flex justify-between items-start mb-6">
        <div className="h-6 w-24 bg-white/20 rounded skeleton-wave skeleton-wave-blue"></div>
        <div className="flex items-center space-x-4">
          <div className="w-5 h-5 bg-white/20 rounded skeleton-wave skeleton-wave-blue"></div>
          <div className="w-8 h-8 rounded-full bg-white/20 skeleton-wave skeleton-wave-blue"></div>
        </div>
      </div>

      <div className="mb-6">
        <div className="h-4 w-20 mb-2 bg-blue-100/30 rounded skeleton-wave skeleton-wave-blue"></div>
        <div className="h-4 w-24 mb-2 bg-blue-100/30 rounded skeleton-wave skeleton-wave-blue"></div>
        <div className="h-10 w-32 bg-white/20 rounded skeleton-wave skeleton-wave-blue"></div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="h-12 w-full bg-yellow-400/30 rounded-lg skeleton-wave skeleton-wave-blue"></div>
        <div className="h-12 w-full bg-blue-400/30 rounded-lg skeleton-wave skeleton-wave-blue"></div>
      </div>
    </div>

    {/* Transactions Section */}
    <div className="bg-white rounded-t-3xl -mt-4 pt-6 pb-20 flex-1">
      <div className="px-6">
        <div className="flex justify-between items-center mb-6">
          <div className="h-5 w-32 rounded skeleton-wave"></div>
          <div className="h-4 w-16 rounded skeleton-wave"></div>
        </div>

        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full skeleton-wave"></div>
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

// Error Component
const ErrorState: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
    <div className="text-center">
      <h1 className="text-red-500 text-xl font-semibold mb-2">
        Error Retrieving Information
      </h1>
      <p className="text-gray-600 text-sm">
        Please check your connection and try again.
      </p>
    </div>
  </div>
);

// Header Component
const DashboardHeader: React.FC<{
  firstName?: string;
  walletBalance?: number;
  onSendMoney: () => void;
  onFundWallet: () => void;
}> = ({ firstName, walletBalance, onFundWallet }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 px-6 pt-12 pb-8 text-white">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <Bell size={20} className="text-white" />
          <Avatar
            className="w-8 h-8 border-2 border-white/20 cursor-pointer"
            onClick={() => {
              queryClient.clear();
              router.push("/auth/login");

              logoutUser();
            }}
          >
            <AvatarImage src="/api/placeholder/32/32" alt={firstName} />
            <AvatarFallback className="bg-white/20 text-white text-sm">
              {firstName ? firstName[0].toUpperCase() : "A"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-blue-100 text-sm mb-1">Hi, {firstName}!</p>
        <p className="text-blue-100 text-sm mb-2">Total Balance</p>
        <h2 className="text-4xl font-bold">
          {formatCurrency(walletBalance || 0)}
        </h2>
      </div>

      <div className="flex gap-3">
        {/* <Button
        onClick={onSendMoney}
        className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 h-12 font-semibold shadow-lg"
      >
        <Send size={16} className="mr-2" />
        Send Money
      </Button> */}
        <Button
          onClick={onFundWallet}
          className="w-full bg-blue-400 hover:bg-blue-500 text-white h-12 font-semibold shadow-lg"
        >
          <Download size={16} className="mr-2" />
          Fund Wallet
        </Button>
      </div>
    </div>
  );
};

// Transaction Item Component
const TransactionItem: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center space-x-3">
      <div className="relative">
        <Avatar className="w-12 h-12">
          <AvatarImage src={transaction.avatar} alt={transaction.receiverId} />
          <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
            {getInitials(transaction.receiverId)}
          </AvatarFallback>
        </Avatar>
        <div
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
            transaction.type === "sent" ? "bg-orange-400" : "bg-green-400"
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
          {transaction.receiverId}
        </p>
        <p className="text-xs text-gray-500">{transaction.narration}</p>
      </div>
    </div>
    <div className="text-right">
      <p
        className={`font-semibold text-sm ${
          transaction.type === "sent" ? "text-red-500" : "text-green-500"
        }`}
      >
        {formatTransactionAmount(transaction.type, transaction.amount)}
      </p>
    </div>
  </div>
);

// Transactions Section Component
const TransactionsSection: React.FC<{
  transactions?: Transaction[];
  onViewAll: () => void;
}> = ({ transactions, onViewAll }) => (
  <div className="bg-white rounded-t-3xl -mt-4 pt-6 pb-20 flex-1">
    <div className="px-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Last Transactions
        </h3>
        <button
          onClick={onViewAll}
          className="text-blue-500 text-sm font-medium hover:text-blue-600"
        >
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions && transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))
        ) : (
          <div className="text-center py-8">
            <h1 className="text-gray-600">
              No Recent Transactions{" "}
              <span className="text-blue-500 font-medium">
                Send Money Now!!
              </span>
            </h1>
          </div>
        )}
      </div>
    </div>
  </div>
);

// Main Dashboard Component
const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { data, isSuccess, isPending, isError, refetch } = useUser();

  // Navigation handlers
  const handleSendMoney = () => router.push("send-money");
  const handleFundWallet = () => router.push("add-card");
  const handleViewAllTransactions = () => router.push("transactions");

  // Effects
  useEffect(() => {
    refetch();
    if (isSuccess) {
      console.log(data);
      storeUser.setState(() => data);
    }

    if (isError) {
      toast.error(
        "There was an error while trying to retrieve your information",
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
    }
  }, [data, isSuccess, isError, isPending, refetch]);

  // Render states
  if (isError) {
    return <ErrorState />;
  }

  if (isPending) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader
        firstName={data?.firstName}
        walletBalance={data?.walletBalance}
        onSendMoney={handleSendMoney}
        onFundWallet={handleFundWallet}
      />

      <TransactionsSection
        transactions={data?.transactions}
        onViewAll={handleViewAllTransactions}
      />

      {/* Bottom Navigation - Commented out as in original */}
      {/* 
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
      </div> 
      */}
    </div>
  );
};

export default DashboardPage;
