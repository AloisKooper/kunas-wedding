'use client'

import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { greatVibes, montserrat } from '@/fonts/fonts'
import { Timeline } from '@/components/ui/timeline'
import CountdownTimer from '@/components/ui/CountdownTimer'
import { Spotlight } from "@/components/ui/spotlight-new"

export default function LoveStory() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const y = useTransform(
    scrollY,
    [0, 500],
    [0, 200]
  )

  const timelineData = [
    {
      date: "September 15, 2018",
      title: "First Meeting",
      content: "Our paths crossed in the hallways of our high school, a moment that would change our lives forever. What started as shy glances and gentle smiles blossomed into something beautiful. We both knew there was something special from that very first moment.",
      image: "/kuna06.jpg"
    },
    {
      date: "December 24, 2018",
      title: "First Date",
      content: "On a magical Christmas Eve, we had our first date. The city was decorated with twinkling lights, matching the sparkle in our eyes. We walked through the snow-covered streets, talking for hours about our dreams, hopes, and everything in between.",
      image: "/kuna07.jpg"
    },
    {
      date: "February 14, 2019",
      title: "Official Couple",
      content: "Valentine's Day became even more special when we made our relationship official. Our hearts knew we were meant to be, and we couldn't imagine a more perfect day to celebrate our love. From that day forward, we've been inseparable.",
      image: "/kuna08.jpg"
    },
    {
      date: "July 20, 2024",
      title: "The Proposal",
      content: "Under a starlit sky, surrounded by roses and the soft glow of candlelight, he got down on one knee. The moment was perfect - just like our love story. With happy tears and full hearts, we began planning our forever together.",
      image: "/kuna09.jpg"
    }
  ]

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            src="/realistic_wedding_setup.jpg"
            alt="Love Story Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>

        {/* Hero Content */}
        <motion.div 
          className="absolute top-1/2 left-1/2 w-full text-white"
          style={{ 
            y,
            x: "-50%",
            zIndex: 1
          }}
        >
          <h1 className={`${greatVibes.className} text-center text-[80px] leading-none mb-4`}>
            Our Love Story
          </h1>
          <p className={`${montserrat.className} text-center text-lg font-light tracking-wide`}>
            A Journey of Love and Joy
          </p>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <Timeline data={timelineData} />

      {/* Countdown Section */}
      <section className="relative bg-black text-white py-16 overflow-hidden">
        <div className="absolute inset-0 z-10">
          <Image
            src="/weddayevents.jpeg"
            alt="Countdown Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/80" />
        </div>
        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center justify-center min-h-[450px]">
          <div className="text-center mb-20 mt-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className={`${greatVibes.className} text-[72px] text-white mb-[-8px]`}>
                Let The Countdown Begin
              </h2>
              <p className={`${montserrat.className} text-wedding-primary tracking-[0.2em] uppercase text-xl`}>
                Until We Say "I Do"
              </p>
            </motion.div>
          </div>
          <CountdownTimer />
        </div>
        <div className="absolute inset-0 z-30">
          <Spotlight />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
