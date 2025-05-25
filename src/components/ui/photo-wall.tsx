'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { montserrat, playfairDisplay } from '@/fonts/fonts'
import { IconX, IconArrowLeft, IconArrowRight } from '@tabler/icons-react'

interface PhotoItem {
  id: number
  src: string
  alt: string
  caption?: string
  category: string
}

interface PhotoWallProps {
  title: string
  subtitle: string
  photos: PhotoItem[]
}

export const PhotoWall: React.FC<PhotoWallProps> = ({ title, subtitle, photos }: PhotoWallProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  // No need for hoveredId state anymore as we're removing the heart icon

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(photos.map(photo => photo.category)))]

  // Filter photos by category
  const filteredPhotos = activeCategory === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeCategory)

  // Handle photo click to open lightbox
  const openLightbox = (photo: PhotoItem) => {
    setSelectedPhoto(photo)
  }

  // Close lightbox
  const closeLightbox = () => {
    setSelectedPhoto(null)
  }

  // Navigate to next/previous photo in lightbox
  const navigatePhoto = (direction: 'next' | 'prev') => {
    if (!selectedPhoto) return

    const currentIndex = filteredPhotos.findIndex((p: PhotoItem) => p.id === selectedPhoto.id)
    let newIndex

    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredPhotos.length
    } else {
      newIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    }

    setSelectedPhoto(filteredPhotos[newIndex])
  }

  return (
    <section className="py-16 bg-[#FDF8F4]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-wedding-text-dark mb-3`}>
            {title}
          </h2>
          <p className={`${montserrat.className} text-wedding-primary text-lg`}>
            {subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((category: string) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-wedding-primary text-white shadow-md'
                  : 'bg-white text-wedding-text hover:bg-wedding-primary/10'
              } ${montserrat.className}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          layout
          layoutRoot
        >
          <AnimatePresence mode="wait">
            {filteredPhotos.map((photo: PhotoItem) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1],
                  layout: { duration: 0.6, type: "spring", stiffness: 200, damping: 25 }
                }}
                className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer group"
                onClick={() => openLightbox(photo)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out flex items-end p-4">
                  {photo.caption && (
                    <motion.p 
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className={`${montserrat.className} text-white text-sm`}
                    >
                      {photo.caption}
                    </motion.p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-10"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                className="relative max-w-4xl w-full h-full flex flex-col items-center justify-center"
                onClick={() => {}}
              >
                <button 
                  className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-wedding-primary transition-colors"
                  onClick={closeLightbox}
                >
                  <IconX className="w-6 h-6" />
                </button>
                
                <div className="relative w-full h-[80vh] overflow-hidden rounded-lg">
                  <Image
                    src={selectedPhoto.src}
                    alt={selectedPhoto.alt}
                    fill
                    className="object-contain"
                  />
                </div>
                
                {selectedPhoto.caption && (
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg mt-4 max-w-2xl">
                    <p className={`${montserrat.className} text-white text-center`}>
                      {selectedPhoto.caption}
                    </p>
                  </div>
                )}

                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-wedding-primary transition-colors"
                  onClick={() => navigatePhoto('prev')}
                >
                  <IconArrowLeft className="w-6 h-6" />
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 rounded-full p-3 hover:bg-wedding-primary transition-colors"
                  onClick={() => navigatePhoto('next')}
                >
                  <IconArrowRight className="w-6 h-6" />
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
