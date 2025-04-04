"use client";
import { useEffect, useState } from "react";

const ComingSoon = () => {
  const calculateTimeLeft = (): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } => {
    const targetDate = new Date("2025-06-01T00:00:00");
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    let timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col gap-2.5 items-center justify-center">
      <h1 className="!text-5xl uppercase">We are Launching</h1>
      <div className="flex gap-2.5 text-6xl">
        <div className="px-3.5 py-2.5 flex items-center justify-center border">
          <span className="translate-y-1">{timeLeft.days}</span>
        </div>
        <div className="px-3.5 py-2.5 flex items-center justify-center border">
          <span className="translate-y-1">{timeLeft.hours}</span>
        </div>
        <div className="px-3.5 py-2.5 flex items-center justify-center border">
          <span className="translate-y-1">{timeLeft.minutes}</span>
        </div>
        <div className="px-3.5 py-2.5 flex items-center justify-center border">
          <span className="translate-y-1">{timeLeft.seconds}</span>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
