"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Home, ArrowUpDown, Users, User } from "lucide-react";

// Types
interface Transaction {
  id: string;
  name: string;
  avatar: string;
  amount: number;
  time: string;
  date: string;
}

interface TransactionGroup {
  month: string;
  transactions: Transaction[];
}

interface TransactionsProps {
  className?: string;
}

// Version without bottom navigation for layout integration
const TransactionsContent: React.FC<TransactionsProps> = ({
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState<"incomes" | "expenses">(
    "expenses"
  );

  const transactionGroups: TransactionGroup[] = [
    {
      month: "October, 2020",
      transactions: [
        {
          id: "1",
          name: "Hiba Saleh",
          avatar: "/api/placeholder/40/40",
          amount: -312.5,
          time: "06:18 05:45 AM",
          date: "Oct 18",
        },
        {
          id: "2",
          name: "Sahar Fawzi",
          avatar: "/api/placeholder/40/40",
          amount: -854.0,
          time: "06:18 05:45 AM",
          date: "Oct 15",
        },
        {
          id: "3",
          name: "Sara Ibrahim",
          avatar: "/api/placeholder/40/40",
          amount: -325.0,
          time: "06:12 04:33 PM",
          date: "Oct 12",
        },
        {
          id: "4",
          name: "Nisreen Ismail",
          avatar: "/api/placeholder/40/40",
          amount: -310.5,
          time: "06:02 09:10 PM",
          date: "Oct 02",
        },
        {
          id: "5",
          name: "Ahmad Ibrahim",
          avatar: "/api/placeholder/40/40",
          amount: -608.0,
          time: "06:02 01:19 AM",
          date: "Oct 02",
        },
      ],
    },
    {
      month: "September, 2020",
      transactions: [
        {
          id: "6",
          name: "Yara Khalil",
          avatar: "/api/placeholder/40/40",
          amount: -313.0,
          time: "06:18 07:10 PM",
          date: "Sep 18",
        },
        {
          id: "7",
          name: "Reem Khaled",
          avatar: "/api/placeholder/40/40",
          amount: -820.0,
          time: "06:18 07:10 PM",
          date: "Sep 18",
        },
        {
          id: "8",
          name: "Yara Khalil",
          avatar: "/api/placeholder/40/40",
          amount: -315.0,
          time: "06:18 06:03 AM",
          date: "Sep 18",
        },
      ],
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatAmount = (amount: number) => {
    return `${Math.abs(amount).toFixed(2)}`;
  };

  return (
    <div className={`bg-white ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-900">Transactions</h1>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Search size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Transactions List */}
      <div className="px-6">
        {transactionGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            {/* Month Header */}
            <h2 className="text-sm font-medium text-gray-500 mb-4">
              {group.month}
            </h2>

            {/* Transactions */}
            <div className="space-y-4">
              {group.transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={transaction.avatar}
                        alt={transaction.name}
                      />
                      <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
                        {getInitials(transaction.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {transaction.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-gray-900">
                      -${formatAmount(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// export default Transactions;
export default TransactionsContent;
