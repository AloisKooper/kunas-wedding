'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { greatVibes, montserrat, playfairDisplay } from '@/fonts/fonts'
import { useRef, useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Timeline } from '@/components/ui/timeline'
import CountdownTimer from '@/components/ui/CountdownTimer'
import { Spotlight } from "@/components/ui/spotlight-new"

interface TimelineEvent {
  date: string
  title: string
  content: string
  image: string
}

interface LoveStoryProps {}

const timelineEvents: TimelineEvent[] = [
  {
    date: "Born April 12, 1998",
    title: "Meet The Bride: Kuna",
    content: "Born and raised in Vienna, Kuna has always been known for her warm smile and creative spirit. With a passion for art and design, she brings beauty to everything she touches. Her kindness, intelligence, and infectious laughter are just a few of the many qualities that make her truly special.",
    image: "/Wedding10.jpg"
  },
  {
    date: "Born January 5, 1997",
    title: "Meet The Groom: Kadeen",
    content: "Kadeen grew up in Salzburg with a love for music and technology. His thoughtful nature and dedication to his passions have been hallmarks of his character. Known for his sense of humor and unwavering loyalty, he has a unique ability to make everyone around him feel valued and appreciated.",
    image: "/Wedding14.jpg"
  },
  {
    date: "February 14, 2019",
    title: "Our Love Story Begins",
    content: "Valentine's Day became the official start of our journey together. After meeting in a university class and several months of friendship, we realized what everyone else already knew - we were meant to be together. From that day forward, we've been inseparable, building a relationship based on trust, respect, and endless laughter.",
    image: "/Wedding08.jpg"
  },
  {
    date: "July 20, 2024",
    title: "The Proposal",
    content: "Under a starlit sky in the gardens of Schönbrunn Palace, surrounded by roses and the soft glow of candlelight, Kadeen got down on one knee. The moment was perfect - just like our love story. With happy tears and full hearts, we began planning our forever together, excited for the beautiful journey ahead.",
    image: "/Wedding01.jpg"
  }
]

export default function LoveStory(props: LoveStoryProps) {
  const heroRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const { scrollY } = useScroll()
  const [isMounted, setIsMounted] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  
  const y = useTransform(
    scrollY,
    [0, 500],
    [0, 200]
  )

  useEffect(() => {
    setIsMounted(true)
    
    // Play video on all devices, matching home page behavior
    const playVideo = () => {
      if (heroVideoRef.current) {
        // Create a play promise to handle potential errors
        const playPromise = heroVideoRef.current.play()
        
        // Play promise might be undefined in some browsers
        if (playPromise !== undefined) {
          playPromise.catch((error: Error) => {
            console.log('Video play error:', error)
            // Auto-play might be blocked, try muting and playing again
            if (error.name === 'NotAllowedError') {
              heroVideoRef.current.muted = true
              setIsMuted(true)
              heroVideoRef.current.play().catch((e: Error) => console.log('Still cannot play:', e))
            }
          })
        }
      }
    }
    
    // Add a small delay before initial play attempt to ensure DOM is ready
    setTimeout(() => {
      playVideo()
    }, 100)
    
    return () => {}
  }, [])

  // Animation variants
  const heroVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const textVariants = {
    hidden: { 
      y: 30,
      opacity: 0
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        ref={heroRef} 
        className="relative h-[70vh] overflow-hidden"
        variants={heroVariants}
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
      >
        {/* Background video using Cloudinary Player */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <video
            ref={heroVideoRef}
            className="w-full h-full object-cover absolute inset-0"
            src="https://res.cloudinary.com/dnjnhkyip/video/upload/q_auto:best,f_auto/IMG_8765_s2xfc2.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            style={{ pointerEvents: 'none' }}
            onError={(e: React.SyntheticEvent<HTMLVideoElement, Event>) => console.log('Video error:', e)}
          />
          {/* Overlays for darkening/text contrast */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
          
          {/* Volume Button */}
          <button
            aria-label={isMuted ? 'Unmute background video' : 'Mute background video'}
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-10 rounded-full p-3 flex items-center justify-center shadow-xl border border-white/20 backdrop-blur-md bg-white/20 hover:bg-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-white/60"
            style={{ pointerEvents: 'auto', WebkitBackdropFilter: 'blur(12px)', backdropFilter: 'blur(12px)' }}
          >
            <motion.span
              key={isMuted ? 'muted' : 'unmuted'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {isMuted ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              )}
            </motion.span>
          </button>
        </div>

        {/* Hero Content */}
        <motion.div 
          className="absolute top-1/2 left-0 right-0 w-full text-white transform -translate-y-1/2 z-20 flex flex-col items-center justify-center px-4"
          variants={textVariants}
        >
          <div className="text-center w-full max-w-4xl mx-auto">
            <h1 className={`${greatVibes.className} text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-none mb-4`}>
              Our Love Story
            </h1>
            <p className={`${montserrat.className} text-base sm:text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto`}>
              A Journey of Love and Joy
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Timeline Section */}
      <Timeline data={timelineEvents} />

      {/* Countdown Section */}
      <section className="relative bg-gradient-to-b from-black to-gray-900 text-white py-10 sm:py-14 md:py-20 overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div className="absolute inset-0 z-10">
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Image
              src="/weddayevents.jpeg"
              alt="Countdown Background"
              fill
              className="object-cover"
              priority
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black/90" />
          </motion.div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center justify-center">
          {/* Decorative Element */}
          <div className="w-16 h-1 bg-wedding-primary mb-6 rounded-full"></div>
          
          {/* Heading */}
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <h2 className={`${greatVibes.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-2`}>
                Let The Countdown Begin
              </h2>
              <p className={`${montserrat.className} text-wedding-primary tracking-[0.2em] uppercase text-sm sm:text-base md:text-lg max-w-md mx-auto`}>
                Until We Say "I Do"
              </p>
            </motion.div>
          </div>
          
          {/* Countdown Timer */}
          <div className="w-full max-w-4xl mx-auto">
            <CountdownTimer />
          </div>
          
          {/* Optional: Add a small decorative element at the bottom */}
          <div className="mt-8 sm:mt-10 md:mt-12">
            <Image
              src="/Flower.svg"
              alt="Decorative Flower"
              width={60}
              height={20}
              className="opacity-60"
            />
          </div>
        </div>
        
        {/* Spotlight Effect */}
        <div className="absolute inset-0 z-30">
          <Spotlight />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}
