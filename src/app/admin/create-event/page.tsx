"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createEventSchema, loginSchema, signupSchema } from "@/schemas";
import { number } from "zod/v4";
import ActivityIndicator from "@/components/ActivityIndicator";
import { useLoginUser, useRegisterUser } from "@/queries/auth.queries";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEvents } from "@/queries/event.queries";
import { useUser } from "@/queries/user.queries";

const CreateEvent: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);

  const router = useRouter();

  // Function to handle navigation to login page
  const handleRoute = () => {
    router.push("/auth/login");
  };

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    control,
    formState: error,
  } = useForm({ resolver: zodResolver(createEventSchema) });

  const {
    data: userData,
    isSuccess: isUserSuccess,
    isPending: isuUserPending,
    error: userError,
    isError: isUserError,
  } = useUser();

  const {
    data,
    mutate,
    isSuccess,
    isPending,
    isError,
    error: createEventError,
  } = useEvents();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Event Created Successfully🎉🎊", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("home");
    }
    if (isError) {
      toast.error(`Error trying to createEvent :${createEventError}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isSuccess, isPending, createEventError, isError]);

  // Handle form submission
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    if (isUserSuccess) {
      mutate({ ...data, createdBy: userData.walletId });
    }
    // error && console.error(error);
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col ">
      {/* Header */}
      <div className="flex-1 pt-8">
        <div className="relative mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Create Event and start receiving funds
          </h1>
          <div className="absolute -top-4 right-0">
            <div className="w-8 h-8 bg-yellow-400 rounded transform rotate-45 relative">
              <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
                <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-white"></div>
              </div>
            </div>
            <div className="absolute top-8 right-4 w-px h-16 border-l-2 border-dashed border-yellow-400"></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name
            </label>
            <Input
              type="text"
              placeholder="Enter your event title"
              className="h-12"
              {...register("eventName")}
            />
            {error && (
              <p className="text-xs sm:text-sm font-Supreme text-red-500 leading-tight sm:leading-normal mt-2">
                {error.errors.eventName?.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Input
              type="text"
              placeholder="Enter description"
              className="h-12"
              {...register("description")}
            />
            {error && (
              <p className="text-xs sm:text-sm font-Supreme text-red-500 leading-tight sm:leading-normal mt-2">
                {error.errors.description?.message}
              </p>
            )}
          </div>
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Created By
            </label>
            <Input
              type="text"
              placeholder="Please enter your ID (You can find it on your dashboard)"
              className="h-12"
              {...register("createdBy")}
            />
            {error && (
              <p className="text-xs sm:text-sm font-Supreme text-red-500 leading-tight sm:leading-normal mt-2">
                {error.errors.createdBy?.message}
              </p>
            )}
          </div> */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Amount
            </label>
            <Input
              type="number"
              placeholder="Enter your Target amount"
              className="h-12"
              {...register("targetAmount", { valueAsNumber: true })}
            />
            {error && (
              <p className="text-xs sm:text-sm font-Supreme text-red-500 leading-tight sm:leading-normal mt-2">
                {error.errors.targetAmount?.message}
              </p>
            )}
          </div>
        </form>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 space-y-4">
        <Button
          type="submit"
          disabled={isPending}
          onClick={handleSubmit(onSubmit)}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600"
        >
          {isPending ? <ActivityIndicator /> : "Create Event"}
        </Button>
      </div>
    </div>
  );
};

export default CreateEvent;
