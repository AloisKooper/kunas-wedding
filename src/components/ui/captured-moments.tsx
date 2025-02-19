'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { greatVibes, montserrat, playfairDisplay } from '@/fonts/fonts'
import { LayoutGrid } from '@/components/ui/layout-grid'

interface CapturedMoment {
  id: number
  content: React.ReactNode
  className: string
  thumbnail: string
}

interface CapturedMomentsProps {
  moments: CapturedMoment[]
  title?: string
  subtitle?: string
  className?: string
}

export function CapturedMoments({ 
  moments,
  title = "Captured Moments",
  subtitle = "Our Moments Together",
  className = ""
}: CapturedMomentsProps) {
  return (
    <div className={`w-full py-24 px-4 ${className}`}>
      <div className="flex flex-col items-center">
        <Image
          src="/Flower.svg"
          alt="Decorative Flower"
          width={120}
          height={40}
          priority
          className="mb-[16px]"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className={`${greatVibes.className} text-[65px] text-wedding-text-dark mb-[-8px]`}>
            {title}
          </h2>
          <p className="font-montserrat text-wedding-primary text-xl mb-12">
            {subtitle}
          </p>
        </motion.div>
        
        <div className="w-full max-w-[1200px] mx-auto">
          <LayoutGrid cards={moments} />
        </div>
      </div>
    </div>
  )
}
