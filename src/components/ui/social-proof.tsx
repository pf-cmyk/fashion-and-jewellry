import { useState, useEffect } from "react";

const notifications = [
  { name: "Sarah M.", location: "Sydney", product: "Diamond Necklace", time: "2 minutes ago" },
  { name: "James L.", location: "Melbourne", product: "Gold Bracelet", time: "5 minutes ago" },
  { name: "Emma K.", location: "Brisbane", product: "Pearl Earrings", time: "8 minutes ago" },
  { name: "Alex P.", location: "Perth", product: "Silver Ring", time: "12 minutes ago" },
  { name: "Lisa W.", location: "Adelaide", product: "Sapphire Pendant", time: "15 minutes ago" },
];

const SocialProof = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNotification(prev => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 500);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const notification = notifications[currentNotification];

  return (
    <div className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse"></div>
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {notification.name} from {notification.location}
            </p>
            <p className="text-xs text-gray-600">
              just purchased: <span className="font-medium">{notification.product}</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SocialProof };
export default SocialProof;