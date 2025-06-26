"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/SuccessModal";
import { set } from "zod/v4";

interface SendMoneyProps {
  onBack?: () => void;
  recipient?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

const SendMoney: React.FC<SendMoneyProps> = ({
  onBack,
  recipient = {
    name: "Yara Khalil",
    email: "yara_khalil@gmail.com",
  },
}) => {
  const [amount, setAmount] = useState("12.50");
  const [note, setNote] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSendPayment = () => {
    setIsSuccessModalOpen(true);
    console.log("Sending payment:", { amount, note, recipient });
    // Handle payment logic here
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const router = useRouter();

  const handleSendFunds = () => {};

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
        <h1 className="text-lg font-semibold text-gray-900">Send Money</h1>
        <div className="w-8"></div> {/* Spacer for center alignment */}
      </div>

      {/* Content */}
      <div className="flex flex-col p-6">
        {/* Recipient Section */}
        <div className="flex items-center space-x-3 mb-8">
          <Avatar className="w-12 h-12 bg-gray-200">
            <AvatarImage src={recipient.avatar} alt={recipient.name} />
            <AvatarFallback className="bg-gray-200 text-gray-600 font-medium">
              {getInitials(recipient.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{recipient.name}</p>
            <p className="text-sm text-gray-500">{recipient.email}</p>
          </div>
        </div>

        {/* Wallet ID */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Wallet ID
          </label>
          <div className="relative">
            <Input
              type="text"
              // onChange={}
              className="h-14 text-lg font-medium border-2 border-blue-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              placeholder="tb3g4-vyu-4hhti-mmhi37-dq"
            />
          </div>
        </div>

        {/* Payment Amount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Amount
          </label>
          s
          <div className="relative">
            <Input
              type="text"
              // onChange={}
              className="h-14 text-lg font-medium border-2 border-yellow-400 focus:border-yellow-500 focus:ring-yellow-500 rounded-lg"
              placeholder="0.00"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg font-medium text-gray-400">
              $
            </div>
          </div>
        </div>

        {/* Payment Note */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Note
          </label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add payment note"
            className="min-h-[120px] resize-none border-gray-200 focus:border-gray-300 focus:ring-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-6 pt-0">
        <Button
          onClick={handleSendPayment}
          className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-base rounded-lg shadow-lg"
        >
          <Send size={18} className="mr-2" />
          Send Payment
        </Button>
      </div>
      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen((prev) => !prev)}
        title={"Payment Successful"}
        message={"The amount has been sent successfully"}
      />
    </div>
  );
};

export default SendMoney;
