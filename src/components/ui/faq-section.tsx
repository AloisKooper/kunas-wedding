'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { greatVibes, montserrat, playfairDisplay } from '@/fonts/fonts'
import { IconGift, IconCamera, IconDeviceMobile, IconBabyCarriage, IconWifi, IconTemperature } from '@tabler/icons-react'

interface FAQItem {
  question: string
  answer: React.ReactNode
  icon: React.ReactNode
  category: 'general' | 'logistics' | 'gifts'
}

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'general' | 'logistics' | 'gifts'>('all')
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const faqItems: FAQItem[] = [
    {
      question: "Is there a gift registry?",
      answer: (
        <div>
          <p className="mb-3">Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift, we have created a registry with a selection of items that would help us begin our new life together.</p>
          <p>Our registry can be found at <a href="#" className="text-wedding-primary hover:underline">www.kunaandkadeen-registry.com</a></p>
        </div>
      ),
      icon: <IconGift className="w-5 h-5" />,
      category: 'gifts'
    },
    {
      question: "Can I take photos during the ceremony?",
      answer: "We kindly ask that you refrain from taking photos during the ceremony, as we have professional photographers who will capture these special moments. You're welcome to take photos during the reception and we encourage you to share them using our wedding hashtag #KunaAndKadeenWedding2025.",
      icon: <IconCamera className="w-5 h-5" />,
      category: 'general'
    },
    {
      question: "What should I know about visiting Namibia?",
      answer: "Namibia is known for its warm hospitality and beautiful landscapes. Most visitors from major countries can obtain a tourist visa upon arrival. The local currency is the Namibian Dollar (NAD), but South African Rand is also widely accepted. The weather in December is typically warm, with temperatures ranging from 20-35°C (68-95°F).",
      icon: <IconWifi className="w-5 h-5" />,
      category: 'logistics'
    },
    {
      question: "What should I do if I have dietary restrictions?",
      answer: "We want to ensure everyone enjoys the meal. Please indicate any dietary restrictions or allergies on your RSVP card or contact us directly at kunaandkadeen@wedding.com by November 15, 2025.",
      icon: <IconTemperature className="w-5 h-5" />,
      category: 'logistics'
    },
    {
      question: "Is the wedding child-friendly?",
      answer: "Yes, children are welcome at our wedding. We will have a dedicated children's entertainment area with professional supervision during the reception to ensure both parents and children have an enjoyable time.",
      icon: <IconBabyCarriage className="w-5 h-5" />,
      category: 'general'
    },
    {
      question: "How can I contact you if I have questions?",
      answer: "For any questions or concerns, please feel free to contact us at kunaandkadeen@wedding.com or call our wedding coordinator, Sarah, at +264 81 123 4567.",
      icon: <IconDeviceMobile className="w-5 h-5" />,
      category: 'general'
    }
  ]

  const filteredFAQs = activeCategory === 'all' 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory)

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'general', label: 'General' },
    { id: 'logistics', label: 'Logistics' },
    { id: 'gifts', label: 'Gifts & Registry' }
  ]

  return (
    <section className="py-24 bg-wedding-section-light">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className={`${greatVibes.className} text-5xl md:text-6xl text-wedding-text-dark mb-6`}>
            Frequently Asked Questions
          </h2>
          <p className={`${montserrat.className} text-wedding-primary text-lg max-w-2xl mx-auto`}>
            Everything you need to know for our special day
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id as any)}
              className={`${montserrat.className} px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === category.id
                  ? 'bg-wedding-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-wedding-primary/10 text-wedding-primary">
                    {item.icon}
                  </div>
                  <span className={`${playfairDisplay.className} text-lg text-wedding-text-dark`}>
                    {item.question}
                  </span>
                </div>
                <motion.span
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-wedding-primary"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </motion.span>
              </button>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: expandedIndex === index ? 'auto' : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`${montserrat.className} p-6 pt-0 text-gray-600 border-t border-gray-100`}>
                  {item.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className={`${montserrat.className} text-gray-600 mb-4`}>
            Don't see your question? Feel free to reach out to us.
          </p>
          <a 
            href="mailto:kunaandkadeen@wedding.com" 
            className={`${montserrat.className} inline-block px-6 py-3 bg-wedding-primary text-white rounded-lg hover:bg-opacity-90 transition-colors`}
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  )
}
