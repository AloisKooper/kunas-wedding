import type { Metadata } from "next";
import { montserrat, playfairDisplay } from '@/fonts/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuna & Max",
  description: "Wedding Reservation System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfairDisplay.variable}`}>
      <head>
        <title>Kuna & Max</title>
        <meta name="description" content="Kuna and Max's Wedding Website" />
      </head>
      <body className={`${montserrat.className} min-h-screen bg-white font-montserrat`}>
        {children}
      </body>
    </html>
  );
}
