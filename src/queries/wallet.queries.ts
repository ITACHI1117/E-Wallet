import {
  contributeToGroup,
  FundWalletData,
  PayEventData,
  updateUserWallet,
} from "@/firebase/wallet";
import { useMutation } from "@tanstack/react-query";

export const useFundWallet = () => {
  return useMutation({
    mutationFn: (data: FundWalletData) => updateUserWallet(data),
    onSuccess: (response) => {
      console.log(response);
      return response;
    },
    onError: (error) => {
      console.log(error);
      throw {
        success: false,
        message: error,
      };
    },
  });
};

export const useEventPayment = () => {
  return useMutation({
    mutationFn: (data: PayEventData) => contributeToGroup(data),
    onSuccess: (response) => {
      console.log(response);
      return response;
    },
    onError: (error) => {
      console.log(error);
      throw {
        success: false,
        message: error,
      };
    },
  });
};
