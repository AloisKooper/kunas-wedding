'use client'

import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { greatVibes, montserrat, playfairDisplay } from '@/fonts/fonts'
import { CapturedMoments } from '@/components/ui/captured-moments'
import { PhotoWall } from '@/components/ui/photo-wall'

export default function Gallery() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  const y = useTransform(
    scrollY,
    [0, 500],
    [0, 200]
  )

  const galleryMoments = [
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

  const familyTimeline = [
    {
      title: "The Bride",
      date: "Kuna",
      content: (
        <div className="flex flex-col gap-2">
          <p>A beautiful soul with a heart of gold. Her smile lights up every room and her love knows no bounds.</p>
        </div>
      ),
      image: "/kuna06.jpg"
    },
    {
      title: "The Groom",
      date: "Kadeen",
      content: (
        <div className="flex flex-col gap-2">
          <p>A devoted partner and loving father. His strength and kindness make our family complete.</p>
        </div>
      ),
      image: "/kuna08.jpg"
    },
    {
      title: "Our Greatest Joy",
      date: "Our Daughter",
      content: (
        <div className="flex flex-col gap-2">
          <p>The perfect blend of both our hearts. She brings endless happiness and meaning to our lives.</p>
        </div>
      ),
      image: "/kuna10.jpeg"
    }
  ];

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Wedding12.jpg"
            alt="Gallery Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>

        <motion.div 
          className="absolute top-1/2 left-1/2 w-full text-white"
          style={{ 
            y,
            x: "-50%",
            zIndex: 1
          }}
        >
          <h1 className={`${greatVibes.className} text-center text-[80px] leading-none mb-4`}>
            Our Gallery
          </h1>
          <p className={`${montserrat.className} text-center text-lg font-light tracking-wide`}>
            Capturing Moments of Love
          </p>
        </motion.div>
      </div>

      {/* Featured Gallery Section */}
      <CapturedMoments 
        moments={galleryMoments}
        title="Our Photo Gallery"
        subtitle="Beautiful Moments We've Shared Together"
      />

      {/* Interactive Photo Wall Section */}
      <PhotoWall 
        title="Moments We Cherish"
        subtitle="Browse our favorite memories by category"
        photos={[
          {
            id: 1,
            src: "/Wedding01.jpg",
            alt: "Proposal moment",
            caption: "The moment he asked, and I said yes!",
            category: "proposal"
          },
          {
            id: 2,
            src: "/Wedding02.jpg",
            alt: "Engagement photo",
            caption: "Our first photoshoot as an engaged couple",
            category: "engagement"
          },
          {
            id: 3,
            src: "/Wedding03.jpg",
            alt: "Kuna portrait",
            caption: "Kuna's bridal portrait",
            category: "portraits"
          },
          {
            id: 4,
            src: "/Wedding04.jpg",
            alt: "Max portrait",
            caption: "Max looking dapper",
            category: "portraits"
          },
          {
            id: 5,
            src: "/Wedding05.jpg",
            alt: "Save the date",
            caption: "Our save the date announcement",
            category: "engagement"
          },
          {
            id: 6,
            src: "/Wedding07.jpg",
            alt: "Couple photo",
            caption: "Celebrating our engagement",
            category: "engagement"
          },
          {
            id: 7,
            src: "/Wedding08.jpg",
            alt: "Romantic moment",
            caption: "A quiet moment together",
            category: "engagement"
          },
          {
            id: 8,
            src: "/Wedding09.jpg",
            alt: "Outdoor photo",
            caption: "Adventures together in nature",
            category: "travel"
          },
          {
            id: 9,
            src: "/Wedding12.jpg",
            alt: "Romantic portrait",
            caption: "Love is in the air",
            category: "portraits"
          },
          {
            id: 10,
            src: "/Wedding14.jpg",
            alt: "Venue preview",
            caption: "A glimpse of our beautiful venue",
            category: "venue"
          },
          {
            id: 11,
            src: "/kuna13.jpg",
            alt: "Travel memories",
            caption: "Exploring the world together",
            category: "travel"
          },
          {
            id: 12,
            src: "/kuna14.jpg",
            alt: "More adventures",
            caption: "Creating memories wherever we go",
            category: "travel"
          }
        ]}
      />

      <Footer />
    </main>
  )
}
