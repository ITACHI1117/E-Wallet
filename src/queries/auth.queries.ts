import {
  LoginUser,
  loginUser,
  registerUser,
  RegisterUserData,
} from "@/firebase/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: RegisterUserData) => registerUser(data),
    onSuccess: (response) => {
      console.log(response);
      return response;
    },
    onError: (error) => {
      console.log(error);

      throw {
        success: false,
        message: error.message,
      };
    },
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data: LoginUser) => loginUser(data),
    onSuccess: (response) => {
      console.log(response);
      return response;
    },
    onError: (error) => {
      console.log(error);

      throw {
        success: false,
        message: error.message,
      };
    },
  });
};
