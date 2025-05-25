'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { montserrat, greatVibes } from '@/fonts/fonts'
import { IconBrandInstagram, IconMail, IconBrandWhatsapp } from '@tabler/icons-react'

export default function Footer() {
  return (
    <footer className="relative bg-neutral-50 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Decorative Flowers */}
      <div
        className="absolute bottom-0 left-0 -translate-x-2 translate-y-2 z-0"
      >
        <Image
          src="/flowerstem1.svg"
          alt="Decorative Left Flower"
          width={200}
          height={200}
          className="w-[100px] h-[100px] xs:w-[120px] xs:h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] opacity-50"
          priority
          style={{ transform: 'rotate(45deg)' }}
        />
      </div>

      <div
        className="absolute bottom-0 right-0 translate-x-2 translate-y-2 z-0"
      >
        <Image
          src="/flowerstem1.svg"
          alt="Decorative Right Flower"
          width={200}
          height={200}
          className="w-[100px] h-[100px] xs:w-[120px] xs:h-[120px] sm:w-[150px] sm:h-[150px] md:w-[180px] md:h-[180px] lg:w-[200px] lg:h-[200px] opacity-50"
          priority
          style={{ transform: 'rotate(-35deg) scaleX(-1)' }}
        />
      </div>

      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 flex justify-center">
        <div className="flex space-x-2 sm:space-x-3 md:space-x-4 pt-6 sm:pt-8 md:pt-10">
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              src="/FlowerRound.svg"
              alt="Decorative Flower"
              width={40}
              height={40}
              className="w-[20px] h-[20px] sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px] opacity-50"
            />
          ))}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-24 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          {/* Left Column - Contact & Social */}
          <div className="flex flex-col items-start space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h3 className={`${montserrat.className} text-lg font-semibold text-wedding-text-dark`}>
                Get in Touch
              </h3>
            </motion.div>
            <div className="flex space-x-4">
              <a href="https://instagram.com" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full border border-wedding-primary flex items-center justify-center hover:bg-wedding-primary group transition-all duration-300">
                <IconBrandInstagram 
                  className="w-5 h-5 text-wedding-primary group-hover:text-white transition-colors" 
                  stroke={1.5}
                />
              </a>
              <a href="mailto:contact@kunaandkadeen.com"
                 className="w-10 h-10 rounded-full border border-wedding-primary flex items-center justify-center hover:bg-wedding-primary group transition-all duration-300">
                <IconMail 
                  className="w-5 h-5 text-wedding-primary group-hover:text-white transition-colors" 
                  stroke={1.5}
                />
              </a>
              <a href="https://wa.me/1234567890" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full border border-wedding-primary flex items-center justify-center hover:bg-wedding-primary group transition-all duration-300">
                <IconBrandWhatsapp 
                  className="w-5 h-5 text-wedding-primary group-hover:text-white transition-colors" 
                  stroke={1.5}
                />
              </a>
            </div>
          </div>

          {/* Center Column - Names & Logo */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className={`${greatVibes.className} text-[65px] text-wedding-text-dark`}>
                Kuna <span className="text-wedding-primary font-playfair-display">&</span> Kadeen
              </h2>
              <div className="flex justify-center">
                <Image
                  src="/Flower.svg"
                  alt="Decorative Flower"
                  width={60}
                  height={20}
                  className="w-[40px] h-[14px] sm:w-[50px] sm:h-[17px] md:w-[60px] md:h-[20px] opacity-80"
                />
              </div>
              <p className="text-wedding-text-dark text-center">
                18.12.2025
              </p>
            </motion.div>
          </div>

          {/* Right Column - Quick Links */}
          <div className="flex flex-col items-end space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h3 className={`${montserrat.className} text-lg font-semibold text-wedding-text-dark`}>
                Quick Links
              </h3>
            </motion.div>
            <nav className="flex flex-col space-y-3 items-end">
              {['HOME', 'LOVE STORY', 'GALLERY', 'BLOG', 'RSVP'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className={`${montserrat.className} text-gray-600 hover:text-wedding-primary transition-colors`}
                >
                  {link}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`${montserrat.className} text-sm text-gray-600`}>
              2025 Kuna & Kadeen. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className={`${montserrat.className} text-sm text-gray-600`}>Made with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-wedding-primary"
              >
                ♥
              </motion.span>
            </div>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`${montserrat.className} text-sm text-wedding-primary hover:text-wedding-text-dark transition-colors`}
            >
              Back to Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
