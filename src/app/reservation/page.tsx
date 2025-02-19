'use client'

import { motion } from 'framer-motion'
import { greatVibes, montserrat } from '@/fonts/fonts'
import Image from 'next/image'
import Link from 'next/link'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { BackgroundLines } from '@/components/ui/background-lines'

export default function Reservation() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full min-h-screen flex-col px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 text-center"
      >
        <Image
          src="/Flower.svg"
          alt="Decorative Flower"
          width={150}
          height={50}
          className="mx-auto mb-8"
        />
        
        <h1 className={`${greatVibes.className} text-6xl md:text-7xl text-wedding-text-dark mb-6`}>
          Coming Soon
        </h1>
        
        <p className={`${montserrat.className} text-wedding-primary text-lg md:text-xl tracking-wide max-w-2xl mx-auto mb-12`}>
          We are working on something special for you. 
          Our reservation system will be available shortly.
        </p>

        <div className="inline-block">
          <Link href="/">
            <HoverBorderGradient 
              className="font-montserrat font-light text-[16px] text-wedding-text-dark whitespace-nowrap px-8"
              containerClassName="border-wedding-text-dark"
            >
              BACK TO HOME
            </HoverBorderGradient>
          </Link>
        </div>
      </motion.div>
    </BackgroundLines>
  )
}
