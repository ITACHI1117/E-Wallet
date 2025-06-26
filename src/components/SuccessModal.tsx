import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  buttonText?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "The amount has been sent successfully!",
  message,
  buttonText = "Ok, Thanks!",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogContent className="max-w-xs mx-auto bg-white rounded-2xl p-6 border-0 shadow-2xl">
        {/* Illustration */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32">
            {/* Background shapes */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-gray-100 rounded-full opacity-60"></div>
            <div className="absolute top-8 right-2 w-6 h-6 bg-gray-100 rounded-full opacity-40"></div>
            <div className="absolute bottom-2 left-2 w-10 h-10 bg-gray-100 rounded-full opacity-50"></div>

            {/* Main illustration container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Paper plane */}
              <div className="relative">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 60 60"
                  className="transform -rotate-12"
                >
                  <path
                    d="M2 30L58 2L45 58L25 35L2 30Z"
                    fill="#3B82F6"
                    stroke="#2563EB"
                    strokeWidth="1"
                  />
                  <path d="M25 35L45 15" stroke="#2563EB" strokeWidth="1" />
                </svg>
              </div>

              {/* Person figure */}
              <div className="absolute -right-2 -bottom-1">
                <svg
                  width="40"
                  height="48"
                  viewBox="0 0 40 48"
                  className="text-blue-500"
                >
                  {/* Head */}
                  <circle cx="20" cy="8" r="6" fill="#F59E0B" />
                  {/* Body */}
                  <rect
                    x="15"
                    y="14"
                    width="10"
                    height="16"
                    rx="2"
                    fill="#3B82F6"
                  />
                  {/* Arms */}
                  <rect
                    x="10"
                    y="16"
                    width="6"
                    height="3"
                    rx="1.5"
                    fill="#3B82F6"
                  />
                  <rect
                    x="24"
                    y="16"
                    width="6"
                    height="3"
                    rx="1.5"
                    fill="#3B82F6"
                  />
                  {/* Legs */}
                  <rect
                    x="16"
                    y="30"
                    width="3"
                    height="12"
                    rx="1.5"
                    fill="#1F2937"
                  />
                  <rect
                    x="21"
                    y="30"
                    width="3"
                    height="12"
                    rx="1.5"
                    fill="#1F2937"
                  />
                  {/* Feet */}
                  <ellipse cx="17.5" cy="44" rx="2" ry="1" fill="#374151" />
                  <ellipse cx="22.5" cy="44" rx="2" ry="1" fill="#374151" />
                </svg>
              </div>

              {/* Dotted trail */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                  width="80"
                  height="20"
                  viewBox="0 0 80 20"
                  className="transform -rotate-12"
                >
                  <path
                    d="M5 10 Q20 5 35 10 T65 10"
                    stroke="#93C5FD"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">
            {title}
          </h2>
          {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
        </div>

        {/* Action Button */}
        <Button
          onClick={onClose}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg"
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

// Alternative version with simpler illustration
const SuccessModalSimple: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title = "The amount has been sent successfully!",
  message,
  buttonText = "Ok, Thanks!",
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xs mx-auto bg-white rounded-2xl p-6 border-0 shadow-2xl">
        {/* Simple Illustration */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-2 left-2 w-4 h-4 bg-white/40 rounded-full"></div>
            <div className="absolute top-6 right-3 w-3 h-3 bg-white/30 rounded-full"></div>
            <div className="absolute bottom-3 left-4 w-5 h-5 bg-white/50 rounded-full"></div>

            {/* Paper plane icon */}
            <div className="relative z-10">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                className="text-blue-500"
              >
                <path d="M2 12L22 2L18 22L11 15L2 12Z" fill="currentColor" />
                <path
                  d="M11 15L18 8"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* Person silhouette */}
            <div className="absolute bottom-1 right-2">
              <svg
                width="24"
                height="28"
                viewBox="0 0 24 28"
                className="text-blue-600"
              >
                <circle cx="12" cy="5" r="3" fill="currentColor" />
                <path
                  d="M7 28V20C7 17.7909 8.79086 16 11 16H13C15.2091 16 17 17.7909 17 20V28"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">
            {title}
          </h2>
          {message && <p className="text-sm text-gray-600 mt-2">{message}</p>}
        </div>

        {/* Action Button */}
        <Button
          onClick={onClose}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg"
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
export { SuccessModalSimple };
