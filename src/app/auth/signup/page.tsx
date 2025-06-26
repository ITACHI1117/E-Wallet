"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, signupSchema } from "@/schemas";
import { number } from "zod/v4";

const SignUp: React.FC = () => {
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
    formState: error,
  } = useForm({ resolver: zodResolver(signupSchema) });

  // Handle form submission
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    error && console.error(error);
  };

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col ">
      {/* Header */}
      <div className="flex-1 pt-8">
        <div className="relative mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Signup and start transferring
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

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <Button variant="outline" className="h-12 text-gray-700">
            Google
          </Button>
          <Button variant="outline" className="h-12 text-gray-700">
            Facebook
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <Input
              type="text"
              placeholder="Enter your first name"
              className="h-12"
              {...register("firstName")}
            />
            {error && (
              <p className="text-xs sm:text-sm font-Supreme text-red-500 leading-tight sm:leading-normal mt-2">
                {error.errors.firstName?.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <Input
              type="text"
              placeholder="Enter your last name"
              className="h-12"
              {...register("lastName")}
            />
            {error && (
              <p className="text-xs sm:text-sm font-Supreme text-red-500 leading-tight sm:leading-normal mt-2">
                {error.errors.lastName?.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Matric Number
            </label>
            <Input
              type="number"
              placeholder="Enter your matric numberx"
              className="h-12"
              {...register("matricNumber", { valueAsNumber: true })}
            />
            {error && (
              <p className="text-xs sm:text-sm font-Supreme text-red-500 leading-tight sm:leading-normal mt-2">
                {error.errors.matricNumber?.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12"
              {...register("email")}
            />
            {error && (
              <p className="text-xs sm:text-sm font-Supreme text-red-500 leading-tight sm:leading-normal mt-2">
                {error.errors.email?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="h-12 pr-12"
                {...register("password")}
              />
              {error && (
                <p className="text-xs sm:text-sm font-Supreme text-red-500 leading-tight sm:leading-normal mt-2">
                  {error.errors.password?.message}
                </p>
              )}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reenter password
            </label>
            <div className="relative">
              <Input
                type={showReenterPassword ? "text" : "password"}
                placeholder="Enter your password again"
                className="h-12 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowReenterPassword(!showReenterPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showReenterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 space-y-4">
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600"
        >
          Create account
        </Button>
        <div className="text-center">
          <button onClick={handleRoute} className="text-blue-500 text-sm">
            Already have account?
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
