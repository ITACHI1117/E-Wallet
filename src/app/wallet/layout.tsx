"use client";
import BottomTabNavigator from "@/components/BottomTabNavigator";
import { ArrowUpDown, BanknoteArrowUp, Home, User, Users } from "lucide-react";
import { useState } from "react";

// Main Layout Component
const MobileLayout: React.FC<MobileLayoutProps> = ({
  children,
  bottomTabs,
  showBottomTabs = true,
  className = "",
}) => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs: TabItem[] = [
    {
      id: "home",
      label: "Home",
      icon: <Home size={20} />,
      isActive: activeTab === "home",
      path: "/wallet/home",
      onClick: () => setActiveTab("home"),
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: <ArrowUpDown size={20} />,
      isActive: activeTab === "transactions",
      path: "/wallet/transactions",
      onClick: () => setActiveTab("transactions"),
    },
    {
      id: "nacos",
      label: "Nacos Pay",
      icon: <BanknoteArrowUp size={20} />,
      isActive: activeTab === "contacts",
      path: "/wallet/nacos-payments",
      onClick: () => setActiveTab("nacos"),
    },
    {
      id: "profile",
      label: "Profile",
      icon: <User size={20} />,
      isActive: activeTab === "profile",
      path: "/wallet/profile",
      onClick: () => setActiveTab("profile"),
    },
  ];

  return (
    <div>
      {children}
      <BottomTabNavigator tabs={tabs} />
    </div>
  );
};
export default MobileLayout;
