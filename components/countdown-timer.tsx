"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  expireAt: Date | string;
}

export function CountdownTimer({ expireAt }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expireTime = new Date(expireAt).getTime();
      const difference = expireTime - now;

      if (difference <= 0) {
        setIsExpired(true);
        setTimeLeft("Waktu habis");
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [expireAt]);

  return (
    <span
      className={`${
        isExpired ? "text-red-500" : "text-orange-500 font-mono"
      } font-bold text-lg`}>
      {timeLeft}
    </span>
  );
}
