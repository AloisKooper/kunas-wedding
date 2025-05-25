'use client'

import React from 'react'
import { motion, useScroll, useTransform, easeOut } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { IconVolume, IconVolumeOff } from '@tabler/icons-react';
import { useRef, useEffect, useState } from 'react'
import { greatVibes, playfairDisplay, montserrat, printsCharming, darlineScript, sail } from '@/fonts/fonts'
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'

// Dynamically import heavy components
const TextGenerateEffect = dynamic(() => import('@/components/ui/text-generate-effect'), { ssr: false })
const AnimatedTestimonials = dynamic(() => import('@/components/ui/animated-testimonials').then(mod => mod.AnimatedTestimonials), { ssr: false })
const LayoutGrid = dynamic(() => import('@/components/ui/layout-grid').then(mod => mod.LayoutGrid), { ssr: false })
// FlowerDivider removed
const Spotlight = dynamic(() => import('@/components/ui/spotlight-new').then(mod => mod.Spotlight), { ssr: false })
const HoverBorderGradient = dynamic(() => import('@/components/ui/hover-border-gradient').then(mod => mod.HoverBorderGradient), { ssr: false })
const CountdownTimer = dynamic(() => import('@/components/ui/CountdownTimer'), { ssr: false })

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconBrandInstagram, IconMail, IconBrandWhatsapp } from '@tabler/icons-react'
import Link from 'next/link';

export default function Home() {
  // --- Volume state and ref ---
  const [isMuted, setIsMuted] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  // Toggle mute handler
  const toggleMute = () => {
    setIsMuted((prev: boolean) => {
      const newMuted = !prev;
      if (heroVideoRef.current) {
        heroVideoRef.current.muted = newMuted;
        if (!newMuted) heroVideoRef.current.volume = 1;
      }
      return newMuted;
    });
  }
  // State hooks
  const [isMounted, setIsMounted] = useState(false)
  const [expandedItems, setExpandedItems] = useState([false, false, false, false]);
  const [windowHeight, setWindowHeight] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Ref hooks
  const textRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef(null)
  const eventsRef = useRef(null)
  const footerRef = useRef(null)

  // Scroll hooks
  const { scrollY } = useScroll()
  const { scrollYProgress: eventsProgress } = useScroll({
    target: eventsRef,
    offset: ["start end", "end start"]
  })

  // Transform calculations
  const y = useTransform(scrollY, [0, windowHeight], [-120, 120])
  const eventsParallax = useTransform(
    eventsProgress,
    [0, 1],
    ['0%', '25%'],
    { ease: easeOut }
  )

  // Effect hooks
  useEffect(() => {
    setIsMounted(true)
    setWindowHeight(window.innerHeight)

    const handleResize = () => {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
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

  const backgroundVariants = {
    hidden: { 
      scale: 1.2,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
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
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  }

  if (!isMounted) {
    return null 
  }

  const testimonials = [
    {
      quote: "From our first meeting in Grade 12 to planning our forever, every moment has been magical.",
      name: "Kuna",
      designation: "The Bride",
      src: "/Kuna03.jpg"
    },
    {
      quote: "High school sweethearts turned soulmates. Our journey began in Grade 12, and I knew she was the one.",
      name: "Kadeen",
      designation: "The Groom",
      src: "/KK-1.jpg"
    },
    {
      quote: "Watching their love grow from high school to this day has been beautiful. They're truly meant for each other.",
      name: "Friends of the Couple",
      designation: "Wedding Party",
      src: "/Kuna05.jpg"
    }
  ];

  const capturedMoments = [
    {
      id: 1,
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-white text-sm">Engagement Session</p>
          <p className="font-playfair-display text-white text-2xl">The Beginning of Forever</p>
        </div>
      ),
      className: "h-[400px] md:col-span-2",
      thumbnail: "/Wedding02.jpg",
    },
    {
      id: 2,
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-white text-sm">Pre-Wedding</p>
          <p className="font-playfair-display text-white text-2xl">Counting Down the Days</p>
        </div>
      ),
      className: "h-[400px]",
      thumbnail: "/Wedding03.jpg",
    },
    {
      id: 3,
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-white text-sm">Love Story</p>
          <p className="font-playfair-display text-white text-2xl">Written in the Stars</p>
        </div>
      ),
      className: "h-[400px]",
      thumbnail: "/Wedding04.jpg",
    },
    {
      id: 4,
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-white text-sm">Save the Date</p>
          <p className="font-playfair-display text-white text-2xl">December 2025</p>
        </div>
      ),
      className: "h-[400px] md:col-span-2",
      thumbnail: "/Wedding05.jpg",
    },
    {
      id: 5,
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-white text-sm">Engagement Photoshoot</p>
          <p className="font-playfair-display text-white text-2xl">Celebrating Our Commitment</p>
        </div>
      ),
      className: "h-[400px] md:col-span-2",
      thumbnail: "/Wedding07.jpg",
    },
    {
      id: 6,
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-white text-sm">Soon-to-be</p>
          <p className="font-playfair-display text-white text-2xl">Mr. & Mrs.</p>
        </div>
      ),
      className: "h-[400px]",
      thumbnail: "/Wedding08.jpg",
    }
  ];

  return (
    <main className="relative w-full">
      {/* Content Sections */}
      <div className="relative">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Hero Section */}
        <motion.div 
          className="relative min-h-screen overflow-hidden"
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
            />
            {/* Optional: overlays for darkening/text contrast */}
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
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              >
                {isMuted ? (
                  <IconVolumeOff size={26} stroke={2} color="#fff" />
                ) : (
                  <IconVolume size={26} stroke={2} color="#fff" />
                )}
              </motion.span>
            </button>
          </div>

          {/* Text content */}
          <motion.div 
            ref={textRef}
            className="absolute top-1/2 left-1/2 w-full text-white"
            style={{ 
              y,
              x: "-50%",
              zIndex: 1
            }}
          >
            <div className="flex flex-col items-center">
              <div className="mb-[5px] text-center font-montserrat text-[18px] sm:text-[22px] md:text-[25px] font-extralight leading-none">
                <motion.div
                  variants={textVariants}
                >
                  THE WEDDING OF
                </motion.div>
              </div>
              <div className="relative flex flex-col items-center justify-center mt-2 mb-2">
  {/* Decorative Accent */}
  <Image src="/Flower.svg" alt="Decorative Accent" width={72} height={24} className="mx-auto mb-2" />
  <div className={`text-center text-[44px] xs:text-[60px] sm:text-[80px] md:text-[100px] lg:text-[110px] leading-none tracking-[0.09em] drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]`} style={{textShadow:'0 2px 8px rgba(0,0,0,0.18)'}}>
    <motion.div variants={textVariants}>
      <span className={greatVibes.className}>Kuna</span> <span className={`${playfairDisplay.className} text-wedding-primary`}>&</span> <span className={greatVibes.className}>Kadeen</span>
    </motion.div>
  </div>
</div>
              <div className="mt-2 text-center font-montserrat text-[16px] sm:text-[20px] md:text-[25px] font-normal leading-none">
                <motion.div
                  variants={textVariants}
                >
                  (18.12.2025)
                </motion.div>
              </div>
              <motion.div 
                variants={textVariants}
                className="mt-6 flex flex-col items-center"
              >
                <Link href="/reservation">
                  <HoverBorderGradient 
                    className="font-montserrat font-light text-[16px] text-white whitespace-nowrap"
                    containerClassName="border-none"
                  >
                    RESERVATION
                  </HoverBorderGradient>
                </Link>
                {/* Scroll Down Indicator */}
                <div className="mt-4 animate-bounce">
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-wedding-primary mx-auto">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="block text-xs text-wedding-primary mt-1">Scroll to learn more</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Welcome Section */}
        <section ref={sectionRef} className="relative bg-wedding-section-light" style={{ zIndex: 1 }}>
          <div className="container mx-auto py-10 sm:py-16 md:py-20 px-2 sm:px-4">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Image
                  src="/Flower.svg"
                  alt="Decorative Flower"
                  width={120}
                  height={40}
                  priority
                  className="mx-auto mb-8"
                />
                <h2 className={`${greatVibes.className} text-[65px] mb-[8px]`}>
                  Saturday, 18 December 2025
                </h2>
                <p className="text-wedding-primary text-xl font-montserrat">
                  We Invite You To Our Wedding
                </p>
              </motion.div>

              {/* Two Column Layout */}
              <div className="flex flex-col lg:flex-row items-center justify-between mt-10 sm:mt-16 md:mt-24 max-w-full lg:max-w-[1400px] mx-auto gap-8">
                {/* Left Column - Image */}
                <motion.div 
                  className="w-full max-w-[600px] mb-8 lg:mb-0"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-[600px] h-[160px] xs:h-[220px] sm:h-[320px] md:h-[400px] lg:h-[450px] mx-auto rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src="/Wedding01.jpg"
                      alt="Wedding Ceremony"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Right Column - Text Content */}
                <div className="w-full max-w-[600px]">
                  <div className="space-y-12 text-left">
                    {/* Who We Are */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <TextGenerateEffect
                        words="We are Kuna and Kadeen, high school sweethearts whose love story began in the hallways of our school. Our journey from first glances to forever has been nothing short of magical, filled with countless moments of joy, growth, and deepening love."
                        className={`${greatVibes.className} text-2xl xs:text-3xl sm:text-4xl md:text-[31px] text-wedding-text-dark leading-relaxed font-normal`}
                        duration={0.5}
                      />
                    </motion.div>

                    {/* What to Expect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 2 }}
                      viewport={{ once: true }}
                    >
                      <TextGenerateEffect
                        words="Join us for an enchanting celebration of love, where elegant traditions meet modern romance. Our wedding day promises to be filled with heartfelt moments, joyous dancing, exquisite cuisine, and the warm company of our dearest family and friends."
                        className={`${greatVibes.className} text-2xl xs:text-3xl sm:text-4xl md:text-[31px] text-wedding-text-dark leading-relaxed font-normal`}
                        duration={0.5}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Ceremony & Reception Info */}
              <div className="max-w-4xl mx-auto mt-12 sm:mt-20 md:mt-32 text-center px-2">
                {/* Names */}
                <h2 className={`${playfairDisplay.className} text-[28px] sm:text-[36px] md:text-[45px] text-wedding-text-dark tracking-wider`}>
                  Kuna <span className="text-wedding-primary">&</span> Kadeen
                </h2>

                {/* Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 mt-[24px] sm:mt-[32px] relative">
                  {/* Left Column - Ceremony */}
                  <div className="px-2 sm:px-8">
                    <h3 className="font-montserrat text-gray-500 text-lg">
                      Ceremony
                    </h3>
                    <div className={`${playfairDisplay.className} text-[32px] sm:text-[40px] md:text-[55px] text-wedding-text-dark mt-[12px] sm:mt-[16px] font-medium`}>
                      09.00 am
                    </div>
                    <p className="font-montserrat text-gray-500 mt-[10px] sm:mt-[16px] leading-relaxed text-sm sm:text-base">
                      Rose Garden Estate, 123 Main Street,<br />
                      Anytown, USA
                    </p>
                  </div>

                  {/* Vertical Divider */}
                  <div className="hidden sm:block absolute top-0 left-1/2 h-full w-[1px] bg-gray-200 transform -translate-x-1/2" />

                  {/* Right Column - Reception */}
                  <div className="px-2 sm:px-8">
                    <h3 className="font-montserrat text-gray-500 text-lg">
                      Reception
                    </h3>
                    <div className={`${playfairDisplay.className} text-[32px] sm:text-[40px] md:text-[55px] text-wedding-text-dark mt-[12px] sm:mt-[16px] font-medium`}>
                      11.00 am
                    </div>
                    <p className="font-montserrat text-gray-500 mt-[10px] sm:mt-[16px] leading-relaxed text-sm sm:text-base">
                      Rose Garden Estate, 123 Main Street,<br />
                      Anytown, USA
                    </p>
                  </div>
                </div>

                {/* RSVP Button */}
                <div className="mt-[20px] sm:mt-[32px] flex justify-center">
                  <Link href="/reservation">
                    <HoverBorderGradient 
                      className="font-montserrat font-light text-[16px] text-white whitespace-nowrap"
                      containerClassName="border-none"
                    >
                      RESERVATION
                    </HoverBorderGradient>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bible Verse Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/Wedding02.jpg"
              alt="Bible Verse Background"
              fill
              className="object-cover"
              quality={100}
              priority
              style={{ objectPosition: 'center 70%' }}
            />
            <div className="absolute inset-0 bg-black/80" />
          </div>

          {/* Decorative Flowers */}
          <div
            className="absolute bottom-0 left-0 -translate-x-2 translate-y-2 z-0"
          >
            {/* Mobile left floral */}
              <Image
                src="/flowerstem1.svg"
                alt="Decorative Left Flower"
                width={80}
                height={80}
                className="opacity-50 block md:hidden w-24 h-24"
                priority
                style={{ transform: 'rotate(45deg)' }}
              />
              {/* Desktop left floral */}
              <Image
                src="/flowerstem1.svg"
                alt="Decorative Left Flower"
                width={200}
                height={200}
                className="opacity-50 hidden md:block"
                priority
                style={{ transform: 'rotate(45deg)' }}
              />
          </div>

          <div
            className="absolute bottom-0 right-0 translate-x-2 translate-y-2 z-0"
          >
            {/* Mobile right floral */}
            <Image
              src="/flowerstem1.svg"
              alt="Decorative Right Flower"
              width={80}
              height={80}
              className="opacity-50 block md:hidden w-24 h-24"
              priority
              style={{ transform: 'rotate(-35deg) scaleX(-1)' }}
            />
            {/* Desktop right floral */}
            <Image
              src="/flowerstem1.svg"
              alt="Decorative Right Flower"
              width={200}
              height={200}
              className="opacity-50 hidden md:block"
              priority
              style={{ transform: 'rotate(-35deg) scaleX(-1)' }}
            />
          </div>

          <div className="relative z-10 w-full py-10 sm:py-16 md:py-24 px-2 sm:px-4">
            <div className="flex justify-center mb-16">
              {/* Mobile center floral */}
                <Image
                  src="/Flower.svg"
                  alt="Decorative Flower"
                  width={64}
                  height={64}
                  className="mx-auto opacity-70 block md:hidden w-20 h-20"
                  priority
                />
                {/* Desktop center floral */}
                <Image
                  src="/Flower.svg"
                  alt="Decorative Flower"
                  width={120}
                  height={120}
                  className="mx-auto opacity-70 hidden md:block"
                  priority
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <TextGenerateEffect
                words={'"So they are no longer two, but one flesh. Therefore, what God has joined together, no human being must separate"'}
                className={`${sail.className} text-[18px] sm:text-[22px] md:text-[28px] text-white font-normal`}
                duration={0.8}
              />
              <TextGenerateEffect
                words={'-Matthew 19:6'}
                className="mt-2 font-montserrat text-wedding-primary text-base"
                duration={6.5}
              />
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="relative bg-wedding-section-light">
          <div className="w-full py-14 sm:py-24 md:py-40 px-2 sm:px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                {/* Left Column */}
                <div className="flex flex-col items-center">
                  <Image
                    src="/Flower.svg"
                    alt="Decorative Flower"
                    width={120}
                    height={120}
                    priority
                    className="mb-16"
                  />
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <h2 className={`${greatVibes.className} text-[32px] sm:text-[48px] md:text-[65px] text-wedding-text-dark mb-[-10px] sm:mb-[-18px]`}>
                      Our Love Story
                    </h2>
                    <p className="mt-2 sm:mt-4 font-montserrat text-wedding-primary tracking-[0.2em] text-sm sm:text-base">
                      Story To Tell For The Rest Of The World
                    </p>
                  </motion.div>

                  <p className="mt-2 sm:mt-4 text-gray-500 max-w-xl text-center text-sm sm:text-base">
                    Met during a chance encounter at a coffee shop and fell in love over their shared passion for travel and adventure.
                  </p>

                  <button className="mt-8 sm:mt-12 md:mt-16 px-4 sm:px-8 py-2 border border-wedding-text-dark text-wedding-text-dark font-montserrat hover:bg-wedding-text-dark hover:text-white transition-colors text-sm sm:text-base">
                    Read More
                  </button>
                </div>

                {/* Right Column */}
                <div className="flex items-center justify-center mt-8 md:mt-0">
                  <AnimatedTestimonials 
                    testimonials={testimonials}
                    autoplay={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Captured Moments Section */}
        <section className="relative bg-white" style={{ zIndex: 1 }}>
          <div className="w-full py-10 sm:py-16 md:py-24 px-2 sm:px-4">
            <div className="flex flex-col items-center relative z-10">
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
                <h2 className={`${greatVibes.className} text-[32px] sm:text-[48px] md:text-[65px] text-wedding-text-dark mb-[-4px] sm:mb-[-8px]`}>
                  Engagement Gallery
                </h2>
                <p className="font-montserrat text-wedding-primary text-base sm:text-xl mb-6 sm:mb-12">
                  Our Journey to Forever
                </p>
              </motion.div>
              
              <div className="w-full max-w-full sm:max-w-[900px] md:max-w-[1200px] mx-auto">
                <LayoutGrid cards={capturedMoments} />
              </div>
            </div>
          </div>
        </section>

        {/* Wedding Day Events Section */}
        <section ref={eventsRef} className="relative w-full overflow-hidden bg-black" style={{ zIndex: 1 }}>
          <div className="relative min-h-[450px] xs:min-h-[500px] sm:min-h-[550px] md:min-h-[600px]">
            {/* Background Image */}
            <motion.div 
              className="absolute inset-0 z-0"
              style={{
                y: eventsParallax
              }}
            >
              <Image
                src="/weddayevents.jpeg"
                alt="Wedding Day Background"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/80" />
            </motion.div>

            {/* Decorative Flowers - smaller on mobile */}
            <div className="absolute bottom-0 left-0 z-10">
              <Image
                src="/flower stem.png"
                alt="Decorative Flower"
                width={60}
                height={90}
                className="opacity-80 w-[60px] h-auto sm:w-[90px] md:w-[120px]"
              />
            </div>
            <div className="absolute top-0 right-0 z-10">
              <Image
                src="/flower stem.png"
                alt="Decorative Flower"
                width={60}
                height={90}
                className="transform rotate-180 opacity-80 w-[60px] h-auto sm:w-[90px] md:w-[120px]"
              />
            </div>

            {/* Content */}
            <div className="relative z-20 w-full h-full flex items-center">
              <div className="w-full py-8 sm:py-10 md:py-12 px-2 sm:px-4">
                <div className="max-w-7xl mx-auto text-center">
                  <Image
                    src="/Flower.svg"
                    alt="Decorative Flower"
                    width={80}
                    height={26}
                    priority
                    className="mb-[12px] mx-auto w-[60px] sm:w-[80px] md:w-[100px] h-auto"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <h2 className={`${greatVibes.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-[8px] sm:mb-[14px]`}>
                      Wedding Day Events
                    </h2>
                    <p className="font-montserrat text-wedding-primary tracking-[0.2em] uppercase mb-4 sm:mb-8 text-xs sm:text-sm md:text-base">
                      Join us in celebrating our special day
                    </p>
                  </motion.div>

                  {/* Event Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-4 md:gap-8 text-white mb-6 sm:mb-8 max-w-[95%] mx-auto">
                    <div className="bg-black/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg transform transition-transform hover:scale-105">
                      <h3 className={`${sail.className} text-[18px] sm:text-[20px] md:text-[24px] mb-1 sm:mb-2`}>The Ceremony</h3>
                      <p className="font-montserrat text-xs sm:text-sm md:text-base mb-1 sm:mb-2">2:00 PM - 3:00 PM</p>
                      <p className="font-montserrat text-xs sm:text-sm leading-relaxed">Join us as we exchange vows and begin our journey together</p>
                    </div>

                    <div className="bg-black/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg transform transition-transform hover:scale-105">
                      <h3 className={`${sail.className} text-[18px] sm:text-[20px] md:text-[24px] mb-1 sm:mb-2`}>Cocktail Hour</h3>
                      <p className="font-montserrat text-xs sm:text-sm md:text-base mb-1 sm:mb-2">3:00 PM - 4:00 PM</p>
                      <p className="font-montserrat text-xs sm:text-sm leading-relaxed">Enjoy drinks and hors d'oeuvres while we capture photos</p>
                    </div>

                    <div className="bg-black/60 backdrop-blur-sm p-4 sm:p-6 rounded-lg transform transition-transform hover:scale-105">
                      <h3 className={`${sail.className} text-[18px] sm:text-[20px] md:text-[24px] mb-1 sm:mb-2`}>Reception & Dinner</h3>
                      <p className="font-montserrat text-xs sm:text-sm md:text-base mb-1 sm:mb-2">4:00 PM - 10:00 PM</p>
                      <p className="font-montserrat text-xs sm:text-sm leading-relaxed">Celebrate with dinner, dancing, and making memories</p>
                    </div>
                  </div>

                  <button className="mt-4 sm:mt-8 px-4 sm:px-8 py-2 border border-white text-white font-montserrat hover:bg-white hover:text-black transition-colors text-xs sm:text-base">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Form Section */}
        <section className="relative w-full flex flex-col items-center justify-center bg-wedding-section-light dark:bg-zinc-900 py-8 sm:py-14 md:py-20" style={{ zIndex: 1 }}>
          <div className="absolute inset-0 bg-wedding-section-light dark:bg-zinc-900" style={{ zIndex: -1 }}></div>
          <div className="max-w-5xl w-full px-2 sm:px-4 space-y-6 sm:space-y-8">
            <div className="text-center space-y-4">
              <Image
                src="/Flower.svg"
                alt="Decorative Flower"
                width={120}
                height={40}
                priority
                className="mb-[16px] mx-auto"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h2 className={`${sail.className} text-[32px] sm:text-[48px] md:text-[60px] lg:text-[72px] bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400`}>
                  RSVP
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 font-montserrat text-base sm:text-lg">
                  Please let us know if you'll be joining us on our special day
                </p>
              </motion.div>
            </div>

            <div className="bg-white dark:bg-zinc-800/50 rounded-xl p-8 shadow-lg backdrop-blur-sm border border-neutral-800/20 dark:border-neutral-400/20">
              <form className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-8">
                  {/* Left Column */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2 sm:space-y-4">
                      <Label htmlFor="firstName" className="text-base text-wedding-primary font-medium">First Name</Label>
                      <Input 
                        id="firstName"
                        placeholder="Enter your first name"
                        className="font-montserrat text-base"
                      />
                    </div>
                    
                    <div className="space-y-2 sm:space-y-4">
                      <Label htmlFor="lastName" className="text-base text-wedding-primary font-medium">Last Name</Label>
                      <Input 
                        id="lastName"
                        placeholder="Enter your last name"
                        className="font-montserrat text-base"
                      />
                    </div>

                    <div className="space-y-2 sm:space-y-4">
                      <Label htmlFor="email" className="text-base text-wedding-primary font-medium">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="font-montserrat text-base"
                      />
                    </div>

                    <div className="space-y-2 sm:space-y-4">
                      <Label className="text-base block mb-2 text-wedding-primary font-medium">Will you join us?</Label>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="attendance" value="accept" className="form-radio h-5 w-5 text-wedding-primary"/>
                          <span className="font-montserrat text-base">Accept with Pleasure</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="attendance" value="maybe" className="form-radio h-5 w-5 text-wedding-primary"/>
                          <span className="font-montserrat text-base">Maybe</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="radio" name="attendance" value="decline" className="form-radio h-5 w-5 text-wedding-primary"/>
                          <span className="font-montserrat text-base">Decline with Regret</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-4">
                      <Label htmlFor="guests" className="text-base text-wedding-primary font-medium">Number of Guests</Label>
                      <Input 
                        id="guests"
                        type="number"
                        min="1"
                        max="5"
                        placeholder="How many guests are you bringing?"
                        className="font-montserrat text-base"
                      />
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2 sm:space-y-4">
                      <Label className="text-base block text-wedding-primary font-medium">Choice of Entrée</Label>
                      <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" name="entree" value="chicken" className="form-checkbox h-5 w-5 text-wedding-primary"/>
                          <span className="font-montserrat text-base">Chicken</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" name="entree" value="beef" className="form-checkbox h-5 w-5 text-wedding-primary"/>
                          <span className="font-montserrat text-base">Beef</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" name="entree" value="fish" className="form-checkbox h-5 w-5 text-wedding-primary"/>
                          <span className="font-montserrat text-base">Fish</span>
                        </label>
                        <label className="flex items-center space-x-3">
                          <input type="checkbox" name="entree" value="vegetarian" className="form-checkbox h-5 w-5 text-wedding-primary"/>
                          <span className="font-montserrat text-base">Vegetarian</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-2 sm:space-y-4">
                      <Label htmlFor="allergies" className="text-base text-wedding-primary font-medium">Dietary Restrictions or Allergies</Label>
                      <textarea 
                        id="allergies"
                        rows={3}
                        className="w-full rounded-md bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input px-3 py-2 text-base font-montserrat border-none focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
                        placeholder="Please list any food allergies or dietary restrictions..."
                      />
                    </div>

                    <div className="space-y-2 sm:space-y-4">
                      <Label htmlFor="message" className="text-base text-wedding-primary font-medium">Special Message (Optional)</Label>
                      <textarea 
                        id="message"
                        rows={4}
                        className="w-full rounded-md bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input px-3 py-2 text-base font-montserrat border-none focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
                        placeholder="Share your wishes or any special requests..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <HoverBorderGradient className="w-48 py-3 text-base font-montserrat">
                    Submit RSVP
                  </HoverBorderGradient>
                </div>
              </form>
            </div>
          </div>
        </section>

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

        {/* Event Information Section */}
        <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-wedding-section-light z-10">
          <div className="container mx-auto max-w-full sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start">
              {/* Left Column - Information */}
              <div className="text-center lg:text-left mb-10 lg:mb-0">
                <Image
                  src="/FlowerRound.svg"
                  alt="Decorative Flower"
                  width={80}
                  height={80}
                  className="mb-8 mx-auto lg:mx-0"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="space-y-4 sm:space-y-5 md:space-y-6"
                >
                  <h2 className={`${greatVibes.className} text-3xl xs:text-4xl sm:text-5xl md:text-6xl text-wedding-text-dark`}>
                    Event Information
                  </h2>
                  <h3 className={`${montserrat.className} text-base xs:text-lg sm:text-xl md:text-2xl text-wedding-primary`}>
                    Questions And Answers
                  </h3>
                  <p className={`${montserrat.className} text-sm sm:text-base md:text-lg text-gray-600 max-w-xl mx-auto lg:mx-0 leading-relaxed`}>
                    Your presence at our wedding is the greatest gift of all, therefore we do not want you to miss any information about our event.
                  </p>
                </motion.div>
                
                {/* Accordion Items */}
                <div className="space-y-3 sm:space-y-5 mt-8 sm:mt-10 md:mt-12">
                  {[
                    {
                      title: "Hotel Recommendation",
                      content: "We have arranged special rates at the following hotels:\n- Hotel A: Special rate of $X per night\n- Hotel B: Special rate of $Y per night\nPlease mention 'Kuna & Kadeen Wedding' when booking."
                    },
                    {
                      title: "Dress Code",
                      content: "The dress code for our wedding is formal/black tie. Men are requested to wear tuxedos or dark suits, and women should wear formal evening gowns or cocktail dresses."
                    },
                    {
                      title: "Gift & Registry Information",
                      content: "Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have registered at [Registry Details]."
                    },
                    {
                      title: "Parking Spot",
                      content: "Complimentary valet parking will be available at the venue. Self-parking is also available in the main parking lot."
                    }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                      initial={false}
                    >
                      <motion.button
                        className="w-full px-6 py-4 text-left flex items-center justify-between bg-white"
                        onClick={() => {
                          const newExpandedItems = [...expandedItems];
                          newExpandedItems[index] = !newExpandedItems[index];
                          setExpandedItems(newExpandedItems);
                        }}
                      >
                        <span className={`${greatVibes.className} text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[33px] text-wedding-text-dark`}>{item.title}</span>
                        <motion.span 
                          className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-[33px] text-wedding-primary"
                          animate={{ rotate: expandedItems[index] ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          +
                        </motion.span>
                      </motion.button>
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: expandedItems[index] ? "auto" : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className={`${montserrat.className} p-6 bg-white text-gray-600 whitespace-pre-line`}>
                          {item.content}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {/* Right Column - Image */}
              <div className="relative flex justify-center lg:justify-end">
                <div className="relative max-w-[350px] sm:max-w-[400px] md:max-w-[450px] lg:max-w-[500px]">
                  {/* Gold border */}
                  <div className="absolute inset-0 border-[12px] border-[#C19875] rounded-sm transform scale-[1.03] shadow-xl"></div>
                  {/* White border */}
                  <div className="absolute inset-0 border-[8px] border-white rounded-sm transform scale-[1.015] shadow-lg"></div>
                  {/* Image container */}
                  <div className="relative overflow-hidden rounded-sm shadow-2xl">
                    <Image
                      src="/Wedding12.jpg"
                      alt="Couple Portrait"
                      width={600}
                      height={900}
                      className="w-full h-auto object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </main>
  )
}