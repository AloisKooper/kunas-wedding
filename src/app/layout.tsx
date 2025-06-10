import type { Metadata } from 'next';
import './globals.css'; // Make sure you have a globals.css file, usually in src/app or src/
import { ebGaramond, montserrat, greatVibes, playfairDisplay, sail } from '@/fonts/fonts';

export const metadata: Metadata = {
  title: 'Kunas Wedding',
  description: 'Join us to celebrate our special day!', // You can customize this
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${montserrat.variable} ${greatVibes.variable} ${playfairDisplay.variable} ${sail.variable} font-sans`}>
      <body>
        {/* 
          If you have a global Navbar and Footer, you would typically include them here,
          outside the {children} prop if they should appear on every page.
          For example:
          <Navbar />
        */}
        <main>{children}</main>
        {/* 
          <Footer />
        */}
      </body>
    </html>
  );
}