'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { greatVibes, montserrat, playfairDisplay } from '@/fonts/fonts'
import { Spotlight } from "@/components/ui/spotlight-new"
import { IconMusic, IconGlass, IconBabyCarriage, IconHanger, IconInfoCircle } from '@tabler/icons-react'
import { useRef, useState, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { HoverBorderGradient } from '@/components/ui/hover-border-gradient'

interface EventItem {
  id: number
  title: string
  time: string
  description: string
  icon: React.ReactNode
  image: string
}

interface ScheduleEvent {
  time: string
  title: string
  description: string
  image: string
}

interface DressCodeSlide {
  title: string
  description: string
  image: string
}

const eventItems: EventItem[] = [
  {
    id: 1,
    title: "South African DJ Showcase",
    time: "7:00 PM - Late",
    description: "Experience the vibrant rhythms of South Africa with our curated lineup of exceptional DJs, bringing you the perfect blend of contemporary and traditional sounds.",
    icon: <IconMusic className="w-6 h-6" />,
    image: "/kuna18.jpg"
  },
  {
    id: 2,
    title: "Hookah Lounge Experience",
    time: "6:00 PM - 11:00 PM",
    description: "Immerse yourself in our elegantly designed hookah lounge, featuring premium flavors and creating an atmosphere of sophisticated relaxation.",
    icon: <IconGlass className="w-6 h-6" />,
    image: "/kuna19.jpg"
  },
  {
    id: 3,
    title: "Children's Entertainment Corner",
    time: "2:00 PM - 8:00 PM",
    description: "A magical space dedicated to our young guests, featuring professional entertainment, creative activities, and supervised care.",
    icon: <IconBabyCarriage className="w-6 h-6" />,
    image: "/Kuna03.jpg"
  }
]

const scheduleEvents: ScheduleEvent[] = [
  {
    time: "12:00 PM",
    title: "Welcome & Arrival",
    description: "Guests arrive and are welcomed with refreshments",
    image: "/kuna06.jpg"
  },
  {
    time: "2:00 PM",
    title: "Wedding Ceremony",
    description: "Exchange of vows and celebration of love",
    image: "/kuna07.jpg"
  },
  {
    time: "3:30 PM",
    title: "Cocktail Hour",
    description: "Signature cocktails and canapés",
    image: "/kuna08.jpg"
  },
  {
    time: "5:00 PM",
    title: "Reception & Dinner",
    description: "Grand entrance and dinner service",
    image: "/kuna09.jpg"
  },
  {
    time: "7:00 PM",
    title: "Entertainment",
    description: "South African DJs and Hookah Lounge",
    image: "/kuna11.jpg"
  },
  {
    time: "8:00 PM",
    title: "Dance & Celebrate",
    description: "Dance the night away",
    image: "/kuna12.jpg"
  }
]

const dressCodeSlides: DressCodeSlide[] = [
  {
    title: "Formal Elegance",
    description: "Floor-length gowns, cocktail dresses, or formal traditional attire for ladies. Dark suits or tuxedos for gentlemen.",
    image: "/kuna13.jpg"
  },
  {
    title: "Color Palette",
    description: "We encourage elegant earth tones, pastels, and jewel tones. Please avoid white, cream, or ivory.",
    image: "/kuna14.jpg"
  },
  {
    title: "Cultural Attire",
    description: "Traditional formal wear is welcomed and encouraged. Celebrate your heritage while maintaining formal elegance.",
    image: "/kuna16.jpg"
  }
]

export default function News() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const carouselInterval = useRef<ReturnType<typeof setInterval> | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const { scrollY } = useScroll({})
  
  const y = useTransform(
    scrollY,
    [0, 500],  // input range
    [0, 200],  // output range
    { clamp: false }  // optional config
  )

  // Auto-rotate carousel
  useEffect(() => {
    carouselInterval.current = setInterval(() => {
      setActiveSlide((current: number) => (current + 1) % dressCodeSlides.length)
    }, 4000)

    return () => {
      if (carouselInterval.current) {
        clearInterval(carouselInterval.current)
      }
    }
  }, [dressCodeSlides.length])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      setSelectedEvent(null);
    };
    
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!modalRef.current || modalRef.current.contains(event.target as Node)) {
        return;
      }
      handleOutsideClick(event);
    };

    document.addEventListener('mousedown', listener as EventListener);
    document.addEventListener('touchstart', listener as EventListener);

    return () => {
      document.removeEventListener('mousedown', listener as EventListener);
      document.removeEventListener('touchstart', listener as EventListener);
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <div ref={heroRef} className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/kuna19.jpg"
            alt="Wedding News Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50" />
        </div>

        <motion.div 
          className="absolute inset-0 flex items-center justify-center text-white z-10"
          style={{ y }}
        >
          <div className="text-center px-4">
            <h1 className={`${greatVibes.className} text-7xl md:text-8xl mb-6`}>
              Wedding Events
            </h1>
            <p className={`${montserrat.className} text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto`}>
              Join us for an unforgettable celebration filled with music, entertainment, and joy
            </p>
          </div>
        </motion.div>

        <div className="absolute inset-0 z-20">
          <Spotlight />
        </div>
      </div>

      {/* Entertainment Section */}
      <section className="py-32 bg-wedding-section-light">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className={`${greatVibes.className} text-5xl md:text-6xl text-wedding-text-dark mb-6`}>
              Entertainment & Activities
            </h2>
            <p className={`${montserrat.className} text-wedding-primary text-lg max-w-2xl mx-auto`}>
              A day filled with joy, love, and unforgettable moments
            </p>
          </div>

          {/* Event Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {eventItems.map((event) => (
              <motion.div
                key={event.id}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                whileHover={{ y: -5 }}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative h-64">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {event.icon}
                    <span className={`${montserrat.className} text-wedding-primary font-medium`}>
                      {event.time}
                    </span>
                  </div>
                  <h3 className={`${playfairDisplay.className} text-xl text-wedding-text-dark mb-2`}>
                    {event.title}
                  </h3>
                  <p className={`${montserrat.className} text-gray-600 text-sm line-clamp-2`}>
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Day Schedule Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-20">
            <h2 className={`${greatVibes.className} text-5xl md:text-6xl text-wedding-text-dark mb-6`}>
              Wedding Day Schedule
            </h2>
            <p className={`${montserrat.className} text-wedding-primary text-lg max-w-2xl mx-auto`}>
              Join us for a day of celebration and love
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {scheduleEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden"
              >
                <div className="aspect-[4/3] relative rounded-lg overflow-hidden mb-6">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-70 transition-opacity group-hover:opacity-90" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className={`${montserrat.className} text-white/90 font-light text-sm tracking-wider mb-2`}>
                      {event.time}
                    </div>
                    <h3 className={`${playfairDisplay.className} text-white text-2xl mb-2`}>
                      {event.title}
                    </h3>
                    <p className={`${montserrat.className} text-white/80 text-sm transform translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100`}>
                      {event.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dress Code & Guidelines Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Guidelines */}
            <div className="space-y-8">
              <h2 className={`${greatVibes.className} text-5xl text-wedding-text-dark mb-8`}>
                Wedding Guidelines
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <IconHanger className="w-6 h-6 text-wedding-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className={`${playfairDisplay.className} text-xl text-wedding-text-dark mb-2`}>
                      Attire Requirements
                    </h3>
                    <p className={`${montserrat.className} text-gray-600`}>
                      We kindly request all guests to adhere to our formal dress code guidelines to create an elegant atmosphere befitting our special day.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <IconInfoCircle className="w-6 h-6 text-wedding-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className={`${playfairDisplay.className} text-xl text-wedding-text-dark mb-2`}>
                      Important Notes
                    </h3>
                    <ul className={`${montserrat.className} text-gray-600 space-y-2`}>
                      <li>• Please arrive 30 minutes before the ceremony</li>
                      <li>• The venue offers both indoor and outdoor spaces</li>
                      <li>• Photography is welcomed during designated times</li>
                      <li>• Special dietary requirements should be communicated in advance</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 flex justify-start">
                  <HoverBorderGradient 
                    className="font-montserrat font-light text-[16px] text-white whitespace-nowrap bg-wedding-primary"
                    containerClassName="border-none"
                  >
                    RESERVATION
                  </HoverBorderGradient>
                </div>
              </div>
            </div>

            {/* Right Column - Dress Code Carousel */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg shadow-lg relative h-[500px]">
                {dressCodeSlides.map((slide, index) => (
                  <motion.div
                    key={index}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: activeSlide === index ? 1 : 0,
                      zIndex: activeSlide === index ? 1 : 0,
                      transition: { duration: 0.5 }
                    }}
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 p-8 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                          opacity: activeSlide === index ? 1 : 0,
                          y: activeSlide === index ? 0 : 20
                        }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h3 className={`${playfairDisplay.className} text-2xl mb-2`}>
                          {slide.title}
                        </h3>
                        <p className={`${montserrat.className} text-sm`}>
                          {slide.description}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Carousel Navigation */}
              <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                {dressCodeSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    onMouseEnter={() => {
                      // Pause auto-rotation when user interacts with navigation
                      clearInterval(carouselInterval.current)
                    }}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      activeSlide === index 
                        ? "bg-white w-6" 
                        : "bg-white/50 hover:bg-white/75"
                    )}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expandable Card Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              ref={modalRef}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <h2 className={`${playfairDisplay.className} text-3xl mb-2`}>
                    {selectedEvent.title}
                  </h2>
                  <p className={`${montserrat.className} font-medium`}>
                    {selectedEvent.time}
                  </p>
                </div>
              </div>
              <div className="p-8">
                <p className={`${montserrat.className} text-wedding-text-light leading-relaxed mb-6`}>
                  {selectedEvent.description}
                </p>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className={`${montserrat.className} w-full bg-wedding-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
