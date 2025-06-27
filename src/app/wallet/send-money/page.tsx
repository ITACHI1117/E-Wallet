"use client";
import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SuccessModal from "@/components/SuccessModal";
import { useEventPayment } from "@/queries/wallet.queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ActivityIndicator from "@/components/ActivityIndicator";
import { payEventSchema } from "@/schemas";
import { useUser } from "@/queries/user.queries";
import { toast } from "react-toastify";
import { storeSendFunds } from "@/store/storeSendFunds";

// @ts-nocheck
export default function SendMoney() {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const router = useRouter();

  const { mutate, isSuccess, isPending, isError, error } = useEventPayment();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(payEventSchema) });

  const SendFundsData = storeSendFunds.state;

  const onSubmit = (data) => {
    console.log(
      SendFundsData.id,
      SendFundsData.userId,
      SendFundsData.createdBy
    );
    mutate({
      ...data,
      id: SendFundsData.id,
      createdBy: SendFundsData.createdBy,
      userId: SendFundsData.userId,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Payment successful🎉🎊", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/wallet/home");
    }
    if (isError) {
      toast.error(`Error while trying to make payment`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isSuccess, isError, router]);
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
        {/* <div className="flex items-center space-x-3 mb-8">
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
        </div> */}

        {/* Wallet ID */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Wallet ID
          </label>
          <div className="relative">
            <Input
              type="text"
              value={SendFundsData.id}
              className="h-14 text-lg font-medium border-2 border-blue-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
              placeholder="tb3g4-vyu-4hhti-mmhi37-dq"
              readOnly
              {...register("eventId")}
            />
            {errors && (
              <p className="text-red-500 text-sm">{errors.eventId?.message}</p>
            )}
          </div>
        </div>

        {/* Payment Amount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Amount
          </label>

          <div className="relative">
            <Input
              type="number"
              value={SendFundsData.price}
              className="h-14 text-lg font-medium border-2 border-yellow-400 focus:border-yellow-500 focus:ring-yellow-500 rounded-lg"
              // placeholder="0.00"
              readOnly
              {...register("amount", { valueAsNumber: true })}
            />
            {errors && (
              <p className="text-red-500 text-sm">{errors.narration?.amount}</p>
            )}
          </div>
        </div>

        {/* Payment Note */}
        <div className="mb-2">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Payment Note
          </label>
          <Textarea
            placeholder="Add payment note"
            className="min-h-[120px] resize-none border-gray-200 focus:border-gray-300 focus:ring-gray-300 rounded-lg"
            {...register("narration")}
          />
          {errors && (
            <p className="text-red-500 text-sm">{errors.narration?.message}</p>
          )}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="p-6 pt-0">
        <Button
          onClick={handleSubmit(onSubmit)}
          disabled={isPending}
          className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-base rounded-lg shadow-lg"
        >
          <Send size={18} className="mr-2" />
          {isPending ? <ActivityIndicator /> : "Send Payment"}
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
}
