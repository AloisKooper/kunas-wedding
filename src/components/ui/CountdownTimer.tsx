'use client'

import { useState, useEffect } from 'react'
import { greatVibes, montserrat } from '@/fonts/fonts'
import { motion } from 'framer-motion'

type TimeUnit = {
  value: number;
  label: string;
};

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

  const timeUnits: TimeUnit[] = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div 
      className="flex flex-wrap justify-center w-full max-w-5xl mx-auto px-2 sm:px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {timeUnits.map((unit, index) => (
        <motion.div 
          key={unit.label}
          className="w-[45%] sm:w-[22%] px-1 sm:px-3 mb-4 sm:mb-0"
          variants={itemVariants}
        >
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 sm:p-4 border border-white/10 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <div className={`${greatVibes.className} font-bold text-5xl xs:text-6xl sm:text-7xl md:text-8xl leading-none text-white`}>
              {unit.value < 10 ? `0${unit.value}` : unit.value}
            </div>
            <div className={`${montserrat.className} text-sm sm:text-base md:text-xl uppercase tracking-wider text-wedding-primary mt-1 sm:mt-2`}>
              {unit.label}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
