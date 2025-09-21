import { useState, useEffect } from "react";

interface UrgencyTimerProps {
  initialMinutes?: number;
  className?: string;
}

export const UrgencyTimer = ({ initialMinutes = 47, className = "" }: UrgencyTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60); // Convert to seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (timeLeft <= 0) {
    return (
      <div className={`bg-red-600 text-white px-4 py-2 rounded-lg font-bold ${className}`}>
        🔥 SALE EXTENDED! Limited quantities left!
      </div>
    );
  }

  return (
    <div className={`bg-red-600 text-white px-4 py-2 rounded-lg font-bold animate-pulse ${className}`}>
      ⏰ Sale ends in {minutes}:{seconds.toString().padStart(2, '0')}!
    </div>
  );
};