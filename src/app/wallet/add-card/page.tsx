"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fundWalletSchema } from "@/schemas";
import { useFundWallet } from "@/queries/wallet.queries";
import { useUser } from "@/queries/user.queries";
import ActivityIndicator from "@/components/ActivityIndicator";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

interface AddCardProps {
  onBack?: () => void;
  onSubmit?: (cardData: CardFormData) => void;
  className?: string;
}

interface CardFormData {
  cardholderName: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
}

const AddCard: React.FC<AddCardProps> = ({ className = "" }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<CardFormData>({
    cardholderName: "",
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const handleInputChange = (field: keyof CardFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    // Add spaces every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    return formatted;
  };

  const formatExpiryDate = (value: string) => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, "");
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return digits.substring(0, 2) + "/" + digits.substring(2, 4);
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, "").length <= 16) {
      handleInputChange("cardNumber", formatted);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    if (formatted.replace("/", "").length <= 4) {
      handleInputChange("expiryDate", formatted);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      handleInputChange("cvv", value);
    }
  };

  const {
    mutate,
    isSuccess,
    isError,
    isPending,
    error: fundWalletError,
  } = useFundWallet();
  const { data: userData, isSuccess: isUser } = useUser();

  const isFormValid = () => {
    return (
      formData.cardholderName.trim() !== "" &&
      formData.cardNumber.replace(/\s/g, "").length >= 13 &&
      formData.cvv.length >= 3 &&
      formData.expiryDate.length === 5
    );
  };

  const [amountFunded, setAmountFunded] = useState();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: error,
  } = useForm({ resolver: zodResolver(fundWalletSchema) });

  // Handle form submission
  const onSubmit: SubmitHandler<any> = async (data) => {
    setAmountFunded(data.walletBalance);

    if (isUser) {
      const fundWalletData = {
        uid: userData.walletId,
        newBalance: data.walletBalance,
      };
      mutate(fundWalletData);
    } else {
      console.log("could not get user");
    }
  };

  useEffect(() => {
    toast.success(
      `We do not save your card details, so you would have to enter your card information whenever you want fund your wallet`,
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
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success(`₦${amountFunded} has been funded into your account🎉🎊`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      queryClient.invalidateQueries(["user"]); // Call right before or after navigating
      router.push("/wallet/home");

      console.log("funded");
    }
    if (isError) {
      toast.error(`There was an error while trying to fund your wallet`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    isError && console.log(fundWalletError);
  }, [isSuccess, isError]);

  return (
    <div className={`min-h-screen bg-white  flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <button
          onClick={() => router.back()}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Fund Wallet</h1>
        <div className="w-8"></div> {/* Spacer for center alignment */}
      </div>

      {/* Form Content */}
      <form className="fle flex-col p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Fund Amount
            </label>
            <Input
              type="number"
              placeholder={"Enter amount to be funded into your wallet"}
              className="h-12 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
              {...register("walletBalance", { valueAsNumber: true })}
            />
            {error && (
              <p className="text-xs sm:text-sm font-Supreme text-red-500 leading-tight sm:leading-normal mt-2">
                {error.errors.walletBalance?.message}
              </p>
            )}
          </div>

          {/* Cardholder Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Cardholder Name
            </label>
            <Input
              type="text"
              placeholder="Enter your name as written on card"
              value={formData.cardholderName}
              onChange={(e) =>
                handleInputChange("cardholderName", e.target.value)
              }
              className="h-12 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
            />
          </div>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Card Number
            </label>
            <Input
              type="text"
              placeholder="Enter card number"
              value={formData.cardNumber}
              onChange={handleCardNumberChange}
              className="h-12 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
              maxLength={19} // 16 digits + 3 spaces
            />
          </div>

          {/* CVV and Expiry Date Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* CVV */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                CVV/CVC
              </label>
              <Input
                type="text"
                placeholder="123"
                value={formData.cvv}
                onChange={handleCvvChange}
                className="h-12 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                maxLength={4}
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Exp. Date
              </label>
              <Input
                type="text"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleExpiryDateChange}
                className="h-12 border-gray-200 focus:border-gray-300 focus:ring-gray-300"
                maxLength={5}
              />
            </div>
          </div>
        </div>
      </form>

      {/* Submit Button */}
      <div className="p-6 pt-0">
        <Button
          disabled={isPending || !isFormValid()}
          onClick={handleSubmit(onSubmit)}
          // disabled={}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium text-base rounded-lg"
        >
          {isPending ? <ActivityIndicator /> : "Fund Wallet"}
        </Button>
      </div>
    </div>
  );
};

export default AddCard;
