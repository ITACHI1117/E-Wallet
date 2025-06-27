import {
  createGroupPayment,
  getAdminGroups,
  getAllEvents,
} from "@/firebase/event";
import { createGroupPaymentProps } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";

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

// get all events from all admins (this is used in the student flow)
// get all event created by admin query
export const useGetAllEvents = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const user = await getAllEvents();
        if (!user) {
          throw new Error(" User not found");
        }
        return user;
      } catch (error) {
        throw {
          success: false,
          message: error,
        };
      }
    },
  });
};
