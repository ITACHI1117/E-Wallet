import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useUser } from "@/queries/user.queries";
import { useEffect, useState } from "react";

interface Event {
  createdAt: string;
  eventName: string;
  avatar?: string;
  totalAmountReceived: number;
  isPaid: boolean;
  id?: string; // Optional unique identifier
}

interface EventListProps {
  data: Event[];
}

const EventList = ({ getAllEventData, handleSendPay }) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const [userWalletId, setUserWalletId] = useState();

  const { data: userData, isSuccess: isUserSuccess } = useUser();

  useEffect(() => {
    console.log("hi");
    if (isUserSuccess) {
      console.log(userData);
      setUserWalletId(userData.walletId);
    }
  }, [isUserSuccess]);

  if (!getAllEventData) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {getAllEventData && getAllEventData.length > 0 ? (
        getAllEventData.map((event, index) => (
          <div key={event.id || event.createdAt || index} className="mb-6">
            {/* Event Item */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={event.avatar} alt={event.eventName} />
                    <AvatarFallback className="bg-gray-200 text-gray-600 text-sm font-medium">
                      {getInitials(event.eventName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">
                      {event.eventName}
                    </p>
                    <p className="text-sm text-gray-500">
                      ₦{event.totalAmountReceived.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div>
                  {event.isPaid ? (
                    <div className="px-4 py-2 bg-green-100 text-green-700 text-xs font-medium rounded-lg">
                      Paid
                    </div>
                  ) : (
                    <Button
                      onClick={() =>
                        handleSendPay(
                          event.id,
                          event.createdBy,
                          event.amountPerStudent,
                          userWalletId
                        )
                      }
                      className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-4 py-2 h-8 text-xs font-medium"
                    >
                      <Send size={12} className="mr-1" />
                      Send
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <h1 className="text-gray-600">No Events 😢</h1>
        </div>
      )}
    </>
  );
};

export default EventList;
