import { createGroupPayment, getAdminGroups } from "@/firebase/event";
import { createGroupPaymentProps } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

// create event query
export const useEvents = () => {
  return useMutation({
    mutationFn: (data: createGroupPaymentProps) => createGroupPayment(data),
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

// get all event created by admin query
export const useGetEvents = () => {
  return useMutation({
    mutationFn: (adminUid) => getAdminGroups(adminUid),
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
