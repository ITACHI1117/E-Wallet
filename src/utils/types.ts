interface Transaction {
  id: string;
  name: string;
  avatar: string;
  amount: number;
  time: string;
  type: "sent" | "received";
}

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
  path: string;
  onClick?: () => void;
}

interface MobileLayoutProps {
  children: React.ReactNode;
  bottomTabs?: TabItem[];
  showBottomTabs?: boolean;
  className?: string;
}

interface BottomTabNavigatorProps {
  tabs: TabItem[];
  className?: string;
}

// This interface is for creating events
export interface createGroupPaymentProps {
  eventName: string;
  description: string;
  createdBy: string; // admin UID
  targetAmount?: number;
  amountPerStudent: number;
}

export interface getEventsByUserIDProps {
  eventName: string;
  description: string;
  createdBy: string; // admin UID
  targetAmount?: number;
  status: string;
  totalAmountReceived: number;
  createdAt: Date;
}
