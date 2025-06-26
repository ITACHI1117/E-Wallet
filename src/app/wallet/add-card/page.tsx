"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Router } from "lucide-react";
import { useRouter } from "next/navigation";

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

const AddCard: React.FC<AddCardProps> = ({
  onBack,
  onSubmit,
  className = "",
}) => {
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

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
    console.log("Card Data:", formData);
  };

  const isFormValid = () => {
    return (
      formData.cardholderName.trim() !== "" &&
      formData.cardNumber.replace(/\s/g, "").length >= 13 &&
      formData.cvv.length >= 3 &&
      formData.expiryDate.length === 5
    );
  };

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
        <h1 className="text-lg font-semibold text-gray-900">Add Card</h1>
        <div className="w-8"></div> {/* Spacer for center alignment */}
      </div>

      {/* Form Content */}
      <div className="fle flex-col p-6">
        <div className="space-y-6">
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
      </div>

      {/* Submit Button */}
      <div className="p-6 pt-0">
        <Button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium text-base rounded-lg"
        >
          Submit Card
        </Button>
      </div>
    </div>
  );
};

export default AddCard;
