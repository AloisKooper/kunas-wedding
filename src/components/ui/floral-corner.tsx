'use client'

import { motion } from 'framer-motion'

interface FloralCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export const FloralCorner = ({ position, className = '' }: FloralCornerProps) => {
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0 rotate-90',
    'bottom-left': 'bottom-0 left-0 -rotate-90',
    'bottom-right': 'bottom-0 right-0 rotate-180'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 0.15, scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className={`absolute w-48 h-48 ${positionClasses[position]} ${className}`}
    >
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g className="text-wedding-primary">
          {/* Elegant floral corner design */}
          <path
            d="M190,10 C150,10 120,40 100,70 C80,40 50,10 10,10 C10,50 40,80 70,100 C40,120 10,150 10,190 C50,190 80,160 100,130 C120,160 150,190 190,190 C190,150 160,120 130,100 C160,80 190,50 190,10"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <path
            d="M160,40 C140,40 120,60 100,80 C80,60 60,40 40,40 C40,60 60,80 80,100 C60,120 40,140 40,160 C60,160 80,140 100,120 C120,140 140,160 160,160 C160,140 140,120 120,100 C140,80 160,60 160,40"
            fill="currentColor"
            fillOpacity="0.15"
          />
          {/* Additional decorative swirls */}
          <path
            d="M150,30 Q130,50 100,60 Q70,50 50,30"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeOpacity="0.2"
          />
          <path
            d="M30,50 Q50,70 60,100 Q50,130 30,150"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeOpacity="0.2"
          />
        </g>
      </svg>
    </motion.div>
  )
}
