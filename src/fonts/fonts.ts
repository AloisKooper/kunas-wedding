import { Playfair_Display, Montserrat, Sail, Great_Vibes } from 'next/font/google'
import localFont from 'next/font/local'

// Using the original Playfair Display font
export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '600'],  // Regular and Semi-bold weights
  style: ['normal', 'italic']
})

// Using the original Montserrat font
export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['300'],  // 300 is light weight
})

// Using Sail font from Google Fonts
export const sail = Sail({
  weight: '400',  // Sail only comes in regular weight
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sail'
})

// Prints Charming font
export const printsCharming = localFont({ 
  src: './Prints Charming.ttf'
})

// Darline Script font
export const darlineScript = localFont({ 
  src: './Darline Script.otf'
})

// Great Vibes font
export const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})
