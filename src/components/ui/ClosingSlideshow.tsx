'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { greatVibes, playfairDisplay } from '@/fonts/fonts';

const slideshowImages = [
  '/Wedding01.jpg',
  '/Wedding02.jpg',
  '/Wedding03.jpg',
  '/Wedding04.jpg',
  '/Wedding05.jpg',
  '/Wedding06.jpg',
  '/Wedding07.jpg',
  '/Wedding08.jpg',
  '/Wedding09.jpg',
  '/Wedding10.jpg',
  '/Wedding12.jpg',
  '/Wedding13 (2).jpg',
  '/Wedding14.jpg',
];

export function ClosingSlideshow() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      // @ts-ignore
      setCurrentImage((prevImage) =>
        prevImage === slideshowImages.length - 1 ? 0 : prevImage + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearTimeout(timer);
  }, [currentImage]);

  return (
    <section className="relative h-screen w-full overflow-hidden" style={{ borderTopLeftRadius: '30px', borderTopRightRadius: '30px' }}>
      <AnimatePresence>
        <motion.div
          key={currentImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={slideshowImages[currentImage]}
            alt="Wedding Slideshow"
            layout="fill"
            objectFit="cover"
            priority={currentImage === 0}
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
      <div className="relative z-10 flex flex-col items-center justify-end h-full text-white text-center pb-20">
        <div className={`${playfairDisplay.className} text-8xl md:text-9xl [text-shadow:1px_1px_6px_rgba(0,0,0,0.5)] leading-none`}>
          <p>06.12</p>
          <p>2025</p>
        </div>
        <p className={`${greatVibes.className} text-6xl md:text-7xl mt-4 [text-shadow:1px_1px_6px_rgba(0,0,0,0.5)]`}>
          Kuna & Kadeen
        </p>
      </div>
    </section>
  );
}
