"use client";
import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import SuccessModal from "@/components/SuccessModal";
import { useEventPayment } from "@/queries/wallet.queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ActivityIndicator from "@/components/ActivityIndicator";
import { payEventSchema } from "@/schemas";
import { toast } from "react-toastify";

// Fix the interface
interface SendMoneyProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default function SendMoney({ params, searchParams }: SendMoneyProps) {
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const router = useRouter();

  // Safely unwrap params and searchParams
  const { id } = use(params);
  const search = use(searchParams);

  // Extract search parameters safely
  const price = Array.isArray(search.price) ? search.price[0] : search.price;
  const createdBy = Array.isArray(search.createdBy)
    ? search.createdBy[0]
    : search.createdBy;
  const userId = Array.isArray(search.userId)
    ? search.userId[0]
    : search.userId;

  const { mutate, isSuccess, isPending, isError, error } = useEventPayment();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(payEventSchema),
    defaultValues: {
      eventId: id,
      amount: price ? parseFloat(price) : 0,
      narration: "",
    },
  });

  // Set form values when params are available
  useEffect(() => {
    if (id) setValue("eventId", id);
    if (price) setValue("amount", parseFloat(price));
  }, [id, price, setValue]);

  const onSubmit = (data: any) => {
    console.log("Form data:", data);
    console.log("Params:", { id, userId, createdBy, price });

    // Validate required data
    if (!id || !userId || !createdBy) {
      toast.error("Missing required parameters");
      return;
    }

    mutate({
      id: id,
      userId: userId,
      amount: data.amount || parseFloat(price || "0"),
      narration: data.narration || "",
      createdBy: createdBy,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Payment successful 🎉🎊", {
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
      console.error("Payment error:", error);
      toast.error(
        `Error while trying to make payment: ${
          error?.message || "Unknown error"
        }`,
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
  }, [isSuccess, isError, error, router]);

  // Show loading state while params are being resolved
  if (!id || !price || !createdBy || !userId) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
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
        <h1 className="text-lg font-semibold text-gray-900">Send Money</h1>
        <div className="w-8"></div>
      </div>

      {/* Debug Info (remove in production) */}
      <div className="p-4 bg-gray-50 border-b">
        <details>
          <summary className="text-sm text-gray-600 cursor-pointer">
            Debug Info
          </summary>
          <div className="mt-2 text-xs space-y-1">
            <p>ID: {id}</p>
            <p>Price: {price}</p>
            <p>Created By: {createdBy}</p>
            <p>User ID: {userId}</p>
          </div>
        </details>
      </div>

      {/* Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
        <div className="flex-1 p-6">
          {/* Wallet ID */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Event ID
            </label>
            <div className="relative">
              <Input
                type="text"
                value={id}
                className="h-14 text-lg font-medium border-2 border-blue-400 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                placeholder="Event ID"
                readOnly
                {...register("eventId")}
              />
              {errors.eventId && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.eventId.message}
                </p>
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
                value={price}
                className="h-14 text-lg font-medium border-2 border-yellow-400 focus:border-yellow-500 focus:ring-yellow-500 rounded-lg"
                placeholder="0.00"
                readOnly
                {...register("amount", { valueAsNumber: true })}
              />
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.amount.message}
                </p>
              )}
            </div>
          </div>

          {/* Payment Note */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment Note
            </label>
            <Textarea
              placeholder="Add payment note (optional)"
              className="min-h-[120px] resize-none border-gray-200 focus:border-gray-300 focus:ring-gray-300 rounded-lg"
              {...register("narration")}
            />
            {errors.narration && (
              <p className="text-red-500 text-sm mt-1">
                {errors.narration.message}
              </p>
            )}
          </div>
        </div>

        {/* Bottom Button */}
        <div className="p-6 pt-0">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold text-base rounded-lg shadow-lg"
          >
            <Send size={18} className="mr-2" />
            {isPending ? <ActivityIndicator /> : `Send ₦${price}`}
          </Button>
        </div>
      </form>

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Payment Successful"
        message="The amount has been sent successfully"
      />
    </div>
  );
}
