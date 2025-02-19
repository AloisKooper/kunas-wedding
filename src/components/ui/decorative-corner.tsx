'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface DecorativeCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  className?: string
}

export const DecorativeCorner = ({ position, className = '' }: DecorativeCornerProps) => {
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
      <Image
        src="/decorative/floral-corner.png"
        alt="Decorative Corner"
        fill
        className="object-contain"
      />
    </motion.div>
  )
}
