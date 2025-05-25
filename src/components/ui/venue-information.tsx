'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { greatVibes, montserrat, playfairDisplay } from '@/fonts/fonts'
import { IconMapPin, IconCar, IconBuildingSkyscraper, IconCalendarEvent } from '@tabler/icons-react'

interface VenueDetail {
  title: string
  description: string
  address: string
  time: string
  image: string
  icon: React.ReactNode
}

interface VenueInformationProps {
  className?: string;
}

export const VenueInformation: React.FC<VenueInformationProps> = ({ className = '' }: VenueInformationProps) => {
  const venueDetails: VenueDetail[] = [
    {
      title: "Ceremony",
      description: "Join us for an intimate ceremony surrounded by beautiful gardens and the stunning natural beauty of Namibia.",
      address: "Droombos, Farm Windhoek Rural, Windhoek, Namibia",
      time: "2:00 PM - 3:30 PM",
      image: "/Wedding01.jpg",
      icon: <IconCalendarEvent className="w-5 h-5 text-wedding-primary" />
    },
    {
      title: "Reception",
      description: "Celebrate with us at our elegant reception with dinner, dancing, and unforgettable moments in one of Windhoek's most beautiful venues.",
      address: "Droombos, Farm Windhoek Rural, Windhoek, Namibia",
      time: "5:00 PM - Late",
      image: "/Wedding14.jpg",
      icon: <IconCalendarEvent className="w-5 h-5 text-wedding-primary" />
    }
  ]

  const accommodations = [
    {
      name: "Hilton Windhoek",
      description: "Luxury 5-star hotel with special rates for our wedding guests.",
      address: "Rev. Michael Scott Street, Windhoek, Namibia",
      image: "/kuna13.jpg"
    },
    {
      name: "The Olive Exclusive Boutique Hotel",
      description: "Elegant boutique accommodation with modern luxury and personalized service.",
      address: "22 Promenaden Road, Windhoek, Namibia",
      image: "/kuna14.jpg"
    }
  ]

  return (
    <div className={`py-16 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`${greatVibes.className} text-5xl md:text-6xl text-wedding-text-dark mb-6`}>
            Venue Information
          </h2>
          <p className={`${montserrat.className} text-wedding-primary text-lg max-w-2xl mx-auto`}>
            Everything you need to know about our wedding locations
          </p>
        </div>

        {/* Venue Map */}
        <div className="mb-20 rounded-xl overflow-hidden shadow-xl">
          <div className="relative h-[400px] w-full">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3700.9598802603513!2d17.0584973!3d-22.5700499!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1c0b1b2731a6cb3d%3A0x1f4f9c7e4af991d9!2sDroombos!5e0!3m2!1sen!2sus!4v1716668990037!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Venue Map"
              className="absolute inset-0"
            />
          </div>
        </div>

        {/* Venue Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {venueDetails.map((venue, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative h-64">
                <Image
                  src={venue.image}
                  alt={venue.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className={`${playfairDisplay.className} text-3xl mb-1`}>{venue.title}</h3>
                  <div className="flex items-center gap-2">
                    {venue.icon}
                    <p className={`${montserrat.className} text-sm font-light`}>{venue.time}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className={`${montserrat.className} text-gray-700 mb-4`}>{venue.description}</p>
                <div className="flex items-start gap-3">
                  <IconMapPin className="w-5 h-5 text-wedding-primary mt-1 flex-shrink-0" />
                  <p className={`${montserrat.className} text-gray-600 text-sm`}>{venue.address}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Travel & Accommodation */}
        <div className="bg-wedding-section-light rounded-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className={`${greatVibes.className} text-4xl text-wedding-text-dark mb-4`}>
              Travel & Accommodation
            </h3>
            <p className={`${montserrat.className} text-gray-600 max-w-2xl mx-auto`}>
              We've arranged special rates at these nearby hotels for our wedding guests
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Transportation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-wedding-primary/10 p-3 rounded-full">
                  <IconCar className="w-6 h-6 text-wedding-primary" />
                </div>
                <h4 className={`${playfairDisplay.className} text-2xl text-wedding-text-dark`}>Transportation</h4>
              </div>
              <div className={`${montserrat.className} space-y-4 text-gray-700`}>
                <p>
                  <strong>From Airport:</strong> Hosea Kutako International Airport is approximately 45 minutes by car from Windhoek city center. Taxis and airport shuttles are readily available.
                </p>
                <p>
                  <strong>Parking:</strong> Complimentary parking will be available at Droombos for all wedding guests.
                </p>
                <p>
                  <strong>Local Transportation:</strong> We recommend arranging private transportation or taxis in Windhoek as public transportation options are limited.
                </p>
              </div>
            </motion.div>

            {/* Accommodation */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg p-6 shadow-md"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-wedding-primary/10 p-3 rounded-full">
                  <IconBuildingSkyscraper className="w-6 h-6 text-wedding-primary" />
                </div>
                <h4 className={`${playfairDisplay.className} text-2xl text-wedding-text-dark`}>Accommodation</h4>
              </div>
              <div className={`${montserrat.className} space-y-4 text-gray-700`}>
                <p>
                  We've arranged special rates at several hotels near our venues. Please mention "Kuna & Kadeen Wedding" when booking.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {accommodations.map((hotel, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden group">
                      <div className="aspect-[4/3] relative">
                        <Image
                          src={hotel.image}
                          alt={hotel.name}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h5 className="font-medium text-sm">{hotel.name}</h5>
                        <p className="text-xs text-white/80 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{hotel.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
