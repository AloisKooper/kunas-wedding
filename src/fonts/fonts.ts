import { EB_Garamond, Sail, Great_Vibes, Montserrat, Playfair_Display } from 'next/font/google';

// EB Garamond for body text, providing a classic, readable serif style
export const ebGaramond = EB_Garamond({
  weight: ['400', '500', '600', '700', '800'], // Offering a range of weights for stylistic flexibility
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-eb-garamond',
});

// Sail for decorative headings
export const sail = Sail({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sail',
});

// Great Vibes for elegant, script-like text
export const greatVibes = Great_Vibes({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
});

// Montserrat for modern, clean text
export const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

// Playfair Display for sophisticated serif headings
export const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});
