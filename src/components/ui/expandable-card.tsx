'use client'

import React from 'react'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useOutsideClick } from '@/hooks/use-outside-click'
import { montserrat, playfairDisplay } from '@/fonts/fonts'
import Image from 'next/image'

interface ExpandableCardProps {
  title: string
  time: string
  description: string
  icon: React.ReactNode
  details: {
    schedule?: string[]
    features?: string[]
    image?: string
    additionalInfo?: string
  }
}

export const ExpandableCard = ({ 
  title, 
  time, 
  description, 
  icon,
  details 
}: ExpandableCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)

  useOutsideClick(cardRef, () => {
    if (isExpanded) setIsExpanded(false)
  })

  return (
    <>
      <motion.div
        ref={cardRef}
        className="relative bg-white p-8 rounded-lg shadow-soft cursor-pointer"
        whileHover={{ scale: 1.02 }}
        onClick={() => setIsExpanded(true)}
      >
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
          <div className="bg-wedding-primary w-12 h-12 rounded-full flex items-center justify-center text-white">
            {icon}
          </div>
        </div>
        <div className="text-center pt-8">
          <h3 className={`${playfairDisplay.className} text-2xl text-wedding-text-dark mb-2`}>
            {title}
          </h3>
          <p className={`${montserrat.className} text-wedding-primary font-medium mb-4`}>
            {time}
          </p>
          <p className={`${montserrat.className} text-wedding-text-light`}>
            {description}
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-wedding-primary w-12 h-12 rounded-full flex items-center justify-center text-white">
                    {icon}
                  </div>
                  <div>
                    <h2 className={`${playfairDisplay.className} text-3xl text-wedding-text-dark`}>
                      {title}
                    </h2>
                    <p className={`${montserrat.className} text-wedding-primary font-medium`}>
                      {time}
                    </p>
                  </div>
                </div>

                {details.image && (
                  <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
                    <Image
                      src={details.image}
                      alt={title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className={`${montserrat.className} space-y-6`}>
                  <p className="text-wedding-text-light leading-relaxed">
                    {description}
                  </p>

                  {details.schedule && (
                    <div>
                      <h3 className="text-xl text-wedding-text-dark mb-3">Schedule</h3>
                      <ul className="space-y-2">
                        {details.schedule.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-wedding-primary rounded-full" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {details.features && (
                    <div>
                      <h3 className="text-xl text-wedding-text-dark mb-3">Features</h3>
                      <ul className="space-y-2">
                        {details.features.map((item, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-wedding-primary rounded-full" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {details.additionalInfo && (
                    <p className="text-wedding-text-light italic">
                      {details.additionalInfo}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => setIsExpanded(false)}
                  className={`${montserrat.className} mt-8 w-full bg-wedding-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors`}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
