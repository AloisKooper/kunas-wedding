'use client'

import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { greatVibes, montserrat, playfairDisplay } from '@/fonts/fonts'
import { CapturedMoments } from '@/components/ui/captured-moments'
import { Timeline } from '@/components/ui/timeline'

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
      date: "Maximilian",
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
            src="/realistic_wedding_setup.jpg"
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

      {/* Family Timeline Section */}
      <section className="bg-[#FDF8F4]">
        <div className="container mx-auto px-4 text-center pt-16">
          <h2 className={`${greatVibes.className} text-6xl text-wedding-text-dark mb-6`}>
            Our Journey Together
          </h2>
          <p className={`${montserrat.className} text-wedding-primary text-lg tracking-wide mb-12`}>
            Every moment, every smile, every adventure has led us to this beautiful day
          </p>
        </div>
        <Timeline data={[
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
            date: "Maximilian",
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
        ]} />
      </section>

      <Footer />
    </main>
  )
}
