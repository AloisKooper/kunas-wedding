'use client'

import { useState, useEffect } from 'react'
import { greatVibes, montserrat } from '@/fonts/fonts'

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2025-12-18T09:00:00+02:00'); // Your wedding date and time

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    // Update immediately
    calculateTimeLeft();
    
    // Then update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-48 max-w-[1600px] mx-auto px-8">
      <div className="text-center">
        <div className={`${greatVibes.className} font-bold mb-2`} style={{ fontSize: '108px', lineHeight: '1' }}>{timeLeft.days}</div>
        <div className={`${montserrat.className} text-xl uppercase tracking-[0.15em]`}>Days</div>
      </div>
      <div className="text-center">
        <div className={`${greatVibes.className} font-bold mb-2`} style={{ fontSize: '108px', lineHeight: '1' }}>{timeLeft.hours}</div>
        <div className={`${montserrat.className} text-xl uppercase tracking-[0.15em]`}>Hours</div>
      </div>
      <div className="text-center">
        <div className={`${greatVibes.className} font-bold mb-2`} style={{ fontSize: '108px', lineHeight: '1' }}>{timeLeft.minutes}</div>
        <div className={`${montserrat.className} text-xl uppercase tracking-[0.15em]`}>Minutes</div>
      </div>
      <div className="text-center">
        <div className={`${greatVibes.className} font-bold mb-2`} style={{ fontSize: '108px', lineHeight: '1' }}>{timeLeft.seconds}</div>
        <div className={`${montserrat.className} text-xl uppercase tracking-[0.15em]`}>Seconds</div>
      </div>
    </div>
  );
}
