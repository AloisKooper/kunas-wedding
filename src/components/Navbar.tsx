'use client'
import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'
import { playfairDisplay } from '@/fonts/fonts'
import Link from 'next/link'

const NavItem = ({ text, variant }: { text: string; variant: boolean }) => {
  const [isHovered, setIsHovered] = useState(false)
  const href = text === 'HOME' ? '/' : `/${text.toLowerCase().replace(' ', '-')}`

  return (
    <Link href={href}>
      <div 
        className="relative cursor-pointer group flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`font-montserrat font-light text-[16px] uppercase transition-colors ${
          variant ? 'text-wedding-text-dark group-hover:text-wedding-primary' : 'text-white group-hover:text-wedding-primary'
        }`}>
          {text}
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-0 h-[1px] bg-wedding-primary"
        />
      </div>
    </Link>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const navItems = ['HOME', 'LOVE STORY', 'NEWS', 'GALLERY', 'RSVP']

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check scroll direction
    setIsScrollingUp(latest < lastScrollY)
    setLastScrollY(latest)
    
    // Check if scrolled past threshold for variant
    setIsScrolled(latest > window.innerHeight - 100)
  })

  useEffect(() => {
    // Start the animation after a delay
    const timer = setTimeout(() => {
      setShouldAnimate(true)
    }, 2000) // 2 second delay

    return () => clearTimeout(timer)
  }, [])

  const navVariants = {
    initial: { y: "-100%" },
    visible: { 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      } 
    },
    hidden: { 
      y: "-100%", 
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      } 
    }
  }

  return (
    <motion.nav
      variants={navVariants}
      initial="initial"
      animate={shouldAnimate ? (isScrollingUp ? "visible" : "hidden") : "initial"}
      className={`fixed w-full top-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm' : 'backdrop-blur-sm'
      }`}
    >
      <div className="relative px-[48px] py-6">
        {/* Logo */}
        <div className={`${playfairDisplay.className} text-[50px] uppercase tracking-[0.1em] text-center md:absolute md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 ${
          isScrolled ? 'text-wedding-text-dark' : 'text-white'
        }`}>
          <span className="font-semibold italic">K</span>
          <span className="text-wedding-primary font-semibold italic">&</span>
          <span className="font-semibold italic">K</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-end gap-10">
          {navItems.map((item) => (
            <NavItem key={item} text={item} variant={isScrolled} />
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`md:hidden absolute right-[48px] top-7 ${
            isScrolled ? 'text-wedding-text-dark' : 'text-white'
          }`}
        >
          <div className={`w-6 h-0.5 mb-1.5 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''} ${
            isScrolled ? 'bg-wedding-text-dark' : 'bg-white'
          }`} />
          <div className={`w-6 h-0.5 mb-1.5 transition-all ${isMenuOpen ? 'opacity-0' : ''} ${
            isScrolled ? 'bg-wedding-text-dark' : 'bg-white'
          }`} />
          <div className={`w-6 h-0.5 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''} ${
            isScrolled ? 'bg-wedding-text-dark' : 'bg-white'
          }`} />
        </button>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-full left-0 right-0 ${
          isScrolled ? 'bg-white border-t border-gray-200' : 'bg-black/30 backdrop-blur-sm'
        }`}>
          <div className="flex flex-col items-center py-4 gap-4">
            {navItems.map((item) => (
              <NavItem key={item} text={item} variant={isScrolled} />
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
}
