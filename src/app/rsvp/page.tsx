'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { greatVibes, montserrat, playfairDisplay } from '@/fonts/fonts'
import { IconVolume, IconVolumeOff } from '@tabler/icons-react'

// This would be better stored in an environment variable or backend service
// For demonstration purposes, we're hardcoding it here
const CORRECT_PASSWORD = 'KunaKadeen2025'

export default function RSVP() {
  // Video and audio state
  const [isMuted, setIsMuted] = useState(true)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  
  // Password protection state
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  // Initialize component and check authentication
  useEffect(() => {
    setIsMounted(true)
    
    // Check if the user is already authenticated
    const authenticated = localStorage.getItem('rsvp_authenticated')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handlePasswordSubmit = (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate a loading state
    setTimeout(() => {
      if (password === CORRECT_PASSWORD) {
        setIsAuthenticated(true)
        localStorage.setItem('rsvp_authenticated', 'true')
      } else {
        setError('Incorrect password. Please try again.')
      }
      setIsLoading(false)
    }, 800)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('rsvp_authenticated')
  }

  return (
    <main className="relative min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {/* Background video using direct video element */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <video
            ref={heroVideoRef}
            className="w-full h-full object-cover absolute inset-0"
            src="https://res.cloudinary.com/dnjnhkyip/video/upload/q_auto:best,f_auto/IMG_8750_u5ilau.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            style={{ pointerEvents: 'none' }}
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

        <motion.div 
          className="absolute top-1/2 left-1/2 w-full text-white"
          style={{ 
            x: "-50%",
            y: "-50%",
            zIndex: 1
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`${greatVibes.className} text-center text-[80px] leading-none mb-4`}>
            RSVP
          </h1>
          <p className={`${montserrat.className} text-center text-lg font-light tracking-wide`}>
            Please Respond by November 15, 2025
          </p>
        </motion.div>
      </div>

      {/* Password Protection / RSVP Form */}
      <section className="py-16 bg-[#FDF8F4]">
        <div className="container mx-auto px-4">
          {!isAuthenticated ? (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-10">
                <h2 className={`${playfairDisplay.className} text-3xl text-wedding-text-dark mb-3`}>
                  Password Protected
                </h2>
                <p className={`${montserrat.className} text-wedding-text`}>
                  This page is only accessible to Kuna and Kadeen.
                </p>
              </div>
              
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-primary"
                  />
                  {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full bg-wedding-primary hover:bg-wedding-primary/90 text-white py-3 rounded-md transition-colors disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Checking...' : 'Enter'}
                </button>
              </form>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="flex justify-between items-center mb-8">
                <h2 className={`${playfairDisplay.className} text-3xl text-wedding-text-dark`}>
                  RSVP Management
                </h2>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 border border-wedding-primary text-wedding-primary hover:bg-wedding-primary/10 rounded-md transition-colors"
                >
                  Logout
                </button>
              </div>
              
              {/* This is where you would put your RSVP management content */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className={`${montserrat.className} mb-4`}>
                  Welcome Kuna and Kadeen! This is your private RSVP management area.
                </p>
                <p className={`${montserrat.className} mb-4`}>
                  Here you can view and manage all your wedding RSVPs. This section would typically include:
                </p>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li>A list of all guests who have RSVP'd</li>
                  <li>Their attendance status (attending/not attending)</li>
                  <li>Meal preferences and dietary restrictions</li>
                  <li>Any additional notes or messages from guests</li>
                  <li>Export functionality for planning purposes</li>
                </ul>
                <p className={`${montserrat.className} italic text-wedding-text`}>
                  To implement full RSVP functionality with data storage, we would need to integrate with Supabase or another backend service.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
