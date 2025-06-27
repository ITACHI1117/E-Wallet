import { getCurrentUser } from "@/firebase/auth";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const user = await getCurrentUser();
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
    enabled: true,
  });
};
