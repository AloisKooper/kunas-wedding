'use client'

import React from 'react'
import { motion, useScroll, useTransform, easeOut } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { useRef, useEffect, useState } from 'react'
import { greatVibes, playfairDisplay, montserrat, printsCharming, darlineScript, sail } from '@/fonts/fonts'
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'

// Dynamically import heavy components
const TextGenerateEffect = dynamic(() => import('@/components/ui/text-generate-effect'), { ssr: false })
const AnimatedTestimonials = dynamic(() => import('@/components/ui/animated-testimonials').then(mod => mod.AnimatedTestimonials), { ssr: false })
const LayoutGrid = dynamic(() => import('@/components/ui/layout-grid').then(mod => mod.LayoutGrid), { ssr: false })
const Spotlight = dynamic(() => import('@/components/ui/spotlight-new').then(mod => mod.Spotlight), { ssr: false })
const HoverBorderGradient = dynamic(() => import('@/components/ui/hover-border-gradient').then(mod => mod.HoverBorderGradient), { ssr: false })
const CountdownTimer = dynamic(() => import('@/components/ui/CountdownTimer'), { ssr: false })

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IconBrandInstagram, IconMail, IconBrandWhatsapp } from '@tabler/icons-react'
import Link from 'next/link';

export default function Home() {
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
      name: "Maximilian",
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
          <p className="font-montserrat text-white text-sm">First Date</p>
          <p className="font-playfair-display text-white text-2xl">High School Sweethearts</p>
        </div>
      ),
      className: "h-[400px] md:col-span-2",
      thumbnail: "/kuna06.jpg",
    },
    {
      id: 2,
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-white text-sm">The Proposal</p>
          <p className="font-playfair-display text-white text-2xl">A Perfect Moment</p>
        </div>
      ),
      className: "h-[400px]",
      thumbnail: "/kuna08.jpg",
    },
    {
      id: 3,
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-white text-sm">Engagement</p>
          <p className="font-playfair-display text-white text-2xl">Forever Begins</p>
        </div>
      ),
      className: "h-[400px]",
      thumbnail: "/kuna09.jpg",
    },
    {
      id: 4,
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-white text-sm">Our Journey</p>
          <p className="font-playfair-display text-white text-2xl">The Story Continues</p>
        </div>
      ),
      className: "h-[400px] md:col-span-2",
      thumbnail: "/kuna07.jpg",
    },
    {
      id: 5,
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-white text-sm">Our Journey</p>
          <p className="font-playfair-display text-white text-2xl">The Story Continues</p>
        </div>
      ),
      className: "h-[400px] md:col-span-2",
      thumbnail: "/kuna10.jpeg",
    },
    {
      id: 6,
      content: (
        <div className="flex flex-col gap-2">
          <p className="font-montserrat text-white text-sm">Engagement</p>
          <p className="font-playfair-display text-white text-2xl">Forever Begins</p>
        </div>
      ),
      className: "h-[400px]",
      thumbnail: "/kuna11.jpg",
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
          animate={(isMounted && imageLoaded) ? "visible" : "hidden"}
        >
          {/* Background image with animation - removed fixed positioning */}
          <motion.div 
            className="absolute inset-0"
            variants={backgroundVariants}
            style={{ zIndex: 0 }}
          >
            <Image
              src="/K%26K%2001.jpeg"
              alt="Hero Background"
              fill
              className="object-cover"
              priority
              quality={100}
              sizes="100vw"
              onLoadingComplete={() => setImageLoaded(true)}
            />
            <motion.div 
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
            >
              {/* Base overlay */}
              <div className="absolute inset-0 bg-black/30" />
              {/* Center transparency */}
              <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/40" />
              {/* Top and bottom darkening */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
            </motion.div>
          </motion.div>

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
              <div className="mb-[5px] text-center font-montserrat text-[25px] font-extralight leading-none">
                <motion.div
                  variants={textVariants}
                >
                  THE WEDDING OF
                </motion.div>
              </div>
              <div className={`text-center text-[100px] leading-none tracking-[0.09em]`}>
                <motion.div
                  variants={textVariants}
                >
                  <span className={greatVibes.className}>Kuna</span> <span className={`${playfairDisplay.className} text-wedding-primary`}>&</span> <span className={greatVibes.className}>Maximilian</span>
                </motion.div>
              </div>
              <div className="mt-[16px] text-center font-montserrat text-[25px] font-normal leading-none">
                <motion.div
                  variants={textVariants}
                >
                  (18.12.2025)
                </motion.div>
              </div>
              <motion.div 
                variants={textVariants}
                className="mt-[48px]"
              >
                <Link href="/reservation">
                  <HoverBorderGradient 
                    className="font-montserrat font-light text-[16px] text-white whitespace-nowrap"
                    containerClassName="border-none"
                  >
                    RESERVATION
                  </HoverBorderGradient>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Welcome Section */}
        <section ref={sectionRef} className="relative bg-wedding-section-light" style={{ zIndex: 1 }}>
          <div className="container mx-auto py-20">
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
              <div className="flex items-center justify-between mt-24 max-w-[1400px] mx-auto">
                {/* Left Column - Image */}
                <motion.div 
                  className="w-[600px]"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="relative w-[600px] h-[450px] rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src="/kuna16.jpg"
                      alt="Couple Portrait"
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Right Column - Text Content */}
                <div className="w-[600px]">
                  <div className="space-y-12 text-left">
                    {/* Who We Are */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      <TextGenerateEffect
                        words="We are Kuna and Maximilian, high school sweethearts whose love story began in the hallways of our school. Our journey from first glances to forever has been nothing short of magical, filled with countless moments of joy, growth, and deepening love."
                        className={`${greatVibes.className} text-[31px] text-wedding-text-dark leading-relaxed font-normal`}
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
                        className={`${greatVibes.className} text-[31px] text-wedding-text-dark leading-relaxed font-normal`}
                        duration={0.5}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Ceremony & Reception Info */}
              <div className="max-w-4xl mx-auto mt-32 text-center">
                {/* Names */}
                <h2 className={`${playfairDisplay.className} text-[45px] text-wedding-text-dark tracking-wider`}>
                  Kuna <span className="text-wedding-primary">&</span> Maximilian
                </h2>

                {/* Events Grid */}
                <div className="grid grid-cols-2 mt-[32px] relative">
                  {/* Left Column - Ceremony */}
                  <div className="px-8">
                    <h3 className="font-montserrat text-gray-500 text-lg">
                      Ceremony
                    </h3>
                    <div className={`${playfairDisplay.className} text-[55px] text-wedding-text-dark mt-[16px] font-medium`}>
                      09.00 am
                    </div>
                    <p className="font-montserrat text-gray-500 mt-[16px] leading-relaxed">
                      Rose Garden Estate, 123 Main Street,<br />
                      Anytown, USA
                    </p>
                  </div>

                  {/* Vertical Divider */}
                  <div className="absolute top-0 left-1/2 h-full w-[1px] bg-gray-200 transform -translate-x-1/2" />

                  {/* Right Column - Reception */}
                  <div className="px-8">
                    <h3 className="font-montserrat text-gray-500 text-lg">
                      Reception
                    </h3>
                    <div className={`${playfairDisplay.className} text-[55px] text-wedding-text-dark mt-[16px] font-medium`}>
                      11.00 am
                    </div>
                    <p className="font-montserrat text-gray-500 mt-[16px] leading-relaxed">
                      Rose Garden Estate, 123 Main Street,<br />
                      Anytown, USA
                    </p>
                  </div>
                </div>

                {/* RSVP Button */}
                <div className="mt-[32px] flex justify-center">
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
              src="/kuna14.jpg"
              alt="Bible Verse Background"
              fill
              className="object-cover"
              quality={100}
              priority
            />
            <div className="absolute inset-0 bg-black/80" />
          </div>

          {/* Decorative Flowers */}
          <div
            className="absolute bottom-0 left-0 -translate-x-2 translate-y-2 z-0"
          >
            <Image
              src="/flowerstem1.svg"
              alt="Decorative Left Flower"
              width={200}
              height={200}
              className="opacity-50"
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
              className="opacity-50"
              priority
              style={{ transform: 'rotate(-35deg) scaleX(-1)' }}
            />
          </div>

          <div className="relative z-10 w-full py-24 px-4">
            <div className="flex justify-center mb-16">
              <Image
                src="/Flower.svg"
                alt="Decorative Flower"
                width={120}
                height={120}
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
                className={`${sail.className} text-[28px] text-white font-normal`}
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
          <div className="w-full py-40 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 gap-16">
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
                    <h2 className={`${greatVibes.className} text-[65px] text-wedding-text-dark mb-[-18px]`}>
                      Our Love Story
                    </h2>
                    <p className="mt-4 font-montserrat text-wedding-primary tracking-[0.2em]">
                      Story To Tell For The Rest Of The World
                    </p>
                  </motion.div>

                  <p className="mt-4 text-gray-500 max-w-xl text-center">
                    Met during a chance encounter at a coffee shop and fell in love over their shared passion for travel and adventure.
                  </p>

                  <button className="mt-16 px-8 py-2 border border-wedding-text-dark text-wedding-text-dark font-montserrat hover:bg-wedding-text-dark hover:text-white transition-colors">
                    Read More
                  </button>
                </div>

                {/* Right Column */}
                <div className="flex items-center">
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
          <div className="w-full py-24 px-4">
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
                  Captured Moments
                </h2>
                <p className="font-montserrat text-wedding-primary text-xl mb-12">
                  Our Moments Together
                </p>
              </motion.div>
              
              <div className="w-full max-w-[1200px] mx-auto">
                <LayoutGrid cards={capturedMoments} />
              </div>
            </div>
          </div>
        </section>

        {/* Wedding Day Events Section */}
        <section ref={eventsRef} className="relative w-full overflow-hidden bg-black" style={{ zIndex: 1 }}>
          <div className="relative h-[600px]">
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

            {/* Decorative Flowers */}
            <div className="absolute bottom-0 left-0 z-10">
              <Image
                src="/flower stem.png"
                alt="Decorative Flower"
                width={120}
                height={180}
                className="opacity-80"
              />
            </div>
            <div className="absolute top-0 right-0 z-10">
              <Image
                src="/flower stem.png"
                alt="Decorative Flower"
                width={120}
                height={180}
                className="transform rotate-180 opacity-80"
              />
            </div>

            {/* Content */}
            <div className="relative z-20 w-full h-full flex items-center">
              <div className="w-full py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                  <Image
                    src="/Flower.svg"
                    alt="Decorative Flower"
                    width={100}
                    height={33}
                    priority
                    className="mb-[12px] mx-auto"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <h2 className={`${greatVibes.className} text-5xl md:text-6xl text-white mb-[14px]`}>
                      Wedding Day Events
                    </h2>
                    <p className="font-montserrat text-wedding-primary tracking-[0.2em] uppercase mb-8">
                      Join us in celebrating our special day
                    </p>
                  </motion.div>

                  {/* Event Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 text-white mb-8">
                    <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg transform transition-transform hover:scale-105">
                      <h3 className={`${sail.className} text-[24px] mb-2`}>The Ceremony</h3>
                      <p className="font-montserrat text-base mb-2">2:00 PM - 3:00 PM</p>
                      <p className="font-montserrat text-sm leading-relaxed">Join us as we exchange vows and begin our journey together</p>
                    </div>

                    <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg transform transition-transform hover:scale-105">
                      <h3 className={`${sail.className} text-[24px] mb-2`}>Cocktail Hour</h3>
                      <p className="font-montserrat text-base mb-2">3:00 PM - 4:00 PM</p>
                      <p className="font-montserrat text-sm leading-relaxed">Enjoy drinks and hors d'oeuvres while we capture photos</p>
                    </div>

                    <div className="bg-black/60 backdrop-blur-sm p-6 rounded-lg transform transition-transform hover:scale-105">
                      <h3 className={`${sail.className} text-[24px] mb-2`}>Reception & Dinner</h3>
                      <p className="font-montserrat text-base mb-2">4:00 PM - 10:00 PM</p>
                      <p className="font-montserrat text-sm leading-relaxed">Celebrate with dinner, dancing, and making memories</p>
                    </div>
                  </div>

                  <button className="mt-8 px-8 py-2 border border-white text-white font-montserrat hover:bg-white hover:text-black transition-colors">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RSVP Form Section */}
        <section className="relative w-full flex flex-col items-center justify-center bg-wedding-section-light dark:bg-zinc-900 py-20" style={{ zIndex: 1 }}>
          <div className="absolute inset-0 bg-wedding-section-light dark:bg-zinc-900" style={{ zIndex: -1 }}></div>
          <div className="max-w-5xl w-full px-4 space-y-8">
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
                <h2 className={`${sail.className} text-[72px] bg-clip-text text-transparent bg-gradient-to-r from-neutral-800 to-neutral-600 dark:from-neutral-100 dark:to-neutral-400`}>
                  RSVP
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 font-montserrat text-lg">
                  Please let us know if you'll be joining us on our special day
                </p>
              </motion.div>
            </div>

            <div className="bg-white dark:bg-zinc-800/50 rounded-xl p-8 shadow-lg backdrop-blur-sm border border-neutral-800/20 dark:border-neutral-400/20">
              <form className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="firstName" className="text-base text-wedding-primary font-medium">First Name</Label>
                      <Input 
                        id="firstName"
                        placeholder="Enter your first name"
                        className="font-montserrat text-base"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      <Label htmlFor="lastName" className="text-base text-wedding-primary font-medium">Last Name</Label>
                      <Input 
                        id="lastName"
                        placeholder="Enter your last name"
                        className="font-montserrat text-base"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="email" className="text-base text-wedding-primary font-medium">Email</Label>
                      <Input 
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="font-montserrat text-base"
                      />
                    </div>

                    <div className="space-y-4">
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

                    <div className="space-y-4">
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
                  <div className="space-y-6">
                    <div className="space-y-4">
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

                    <div className="space-y-4">
                      <Label htmlFor="allergies" className="text-base text-wedding-primary font-medium">Dietary Restrictions or Allergies</Label>
                      <textarea 
                        id="allergies"
                        rows={3}
                        className="w-full rounded-md bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input px-3 py-2 text-base font-montserrat border-none focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
                        placeholder="Please list any food allergies or dietary restrictions..."
                      />
                    </div>

                    <div className="space-y-4">
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

                <div className="flex justify-center">
                  <HoverBorderGradient className="w-48 py-3 text-base font-montserrat">
                    Submit RSVP
                  </HoverBorderGradient>
                </div>
              </form>
            </div>
          </div>
        </section>

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

        {/* Event Information Section */}
        <section className="relative py-24 px-4 bg-wedding-section-light z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Left Column - Information */}
              <div className="text-center md:text-left">
                <Image
                  src="/FlowerRound.svg"
                  alt="Decorative Flower"
                  width={80}
                  height={80}
                  className="mb-8"
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <h2 className={`${greatVibes.className} text-[65px] text-wedding-text-dark mb-[1px]`}>
                    Event Information
                  </h2>
                  <h3 className={`${montserrat.className} text-[24px] text-wedding-primary mb-[24px]`}>
                    Questions And Answers
                  </h3>
                  <p className={`${montserrat.className} text-[18px] text-gray-600 max-w-xl`}>
                    Your presence at our wedding is the greatest gift of all, therefore we do not want you to miss any information about our event.
                  </p>
                </motion.div>
                
                {/* Accordion Items */}
                <div className="space-y-4">
                  {[
                    {
                      title: "Hotel Recommendation",
                      content: "We have arranged special rates at the following hotels:\n- Hotel A: Special rate of $X per night\n- Hotel B: Special rate of $Y per night\nPlease mention 'Kuna & Maximilian Wedding' when booking."
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
                        <span className={`${greatVibes.className} text-[33px] text-wedding-text-dark`}>{item.title}</span>
                        <motion.span 
                          className="text-[33px] text-wedding-primary"
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
              <div className="relative">
                <div className="border-8 border-white shadow-xl">
                  <Image
                    src="/kuna2.svg"
                    alt="Couple Image"
                    width={600}
                    height={800}
                    className="w-full"
                  />
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