"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRegisterUser } from "@/queries/auth.queries";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleRoute = () => {
    router.push("/auth/signup");
  };
  const handleLogin = () => {
    router.push("/wallet/home");
    // Here you would typically handle the login logic, such as calling an API
  };

  // Initialize form with react-hook-form
  const {
    register,
    handleSubmit,
    formState: error,
  } = useForm({ resolver: zodResolver(loginSchema) });

  // Handle form submission
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    mutate(data);
    error && console.error(error);
  };

  const {
    data,
    mutate,
    isSuccess,
    isPending,
    isError,
    error: LoginError,
  } = useRegisterUser();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Welcome to Back!😊", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [isSuccess, isPending, error, isError]);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col ">
      {/* Header */}
      <div className="flex-1 pt-8">
        <div className="relative mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Login and start transferring
          </h1>
          <div className="absolute -top-4 right-0">
            <div className="w-8 h-8 bg-yellow-400 rounded transform rotate-45 relative">
              <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
                <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-b-4 border-b-white"></div>
              </div>
            </div>
            <div className="absolute top-8 right-4 w-px h-20 border-l-2 border-dashed border-yellow-400"></div>
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
        <form onSubmit={() => handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <Input
              type="email"
              placeholder="zayedmt13@gmail.com"
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
                placeholder="••••••••"
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
            <div className="text-right mt-2">
              <button className="text-blue-500 text-sm">
                Forget password?
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 space-y-4">
        <Button
          onClick={handleSubmit(onSubmit)}
          className="w-full h-12 bg-blue-500 hover:bg-blue-600"
        >
          Login
        </Button>
        <div className="text-center">
          <button onClick={handleRoute} className="text-blue-500 text-sm">
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
