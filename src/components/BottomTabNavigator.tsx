import { useRouter } from "next/navigation";

const BottomTabNavigator: React.FC<BottomTabNavigatorProps> = ({ tabs }) => {
  const router = useRouter();
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full  bg-white border-t border-gray-200 px-6 py-3">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="flex flex-col items-center space-y-1 py-2"
            onClick={() => {
              if (tab.path) {
                router.push(tab.path);
              }
            }}
          >
            {tab.icon}
            <span className="text-xs text-gray-400">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomTabNavigator;
