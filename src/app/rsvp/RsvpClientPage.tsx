'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { greatVibes, montserrat, playfairDisplay } from '@/fonts/fonts';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, CheckCircle2, Users, Mail, Phone, MessageSquare, PartyPopper, XCircle, Info, Loader2, ChevronDown, Calendar, MapPin, ArrowUpRight, Sparkles, PersonStanding } from 'lucide-react';
import { ClosingSlideshow } from '@/components/ui/ClosingSlideshow';
import React, { useState, useRef, useEffect } from 'react';

interface RsvpClientPageProps {
  guestName: string;
  inviteCode: string | null;
  allowedGuests: number;
  deadlinePassed: boolean;
}

interface RsvpFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  attendance: 'yes' | 'no' | '';
  guestCount: number;
  adult_count: number;
  child_count: number;
  dietary: string;
  message: string;
  gift_preference: string;
  relationship_to_couple: string;
}

const RsvpClientPage = ({ guestName, inviteCode, allowedGuests, deadlinePassed }: RsvpClientPageProps) => {
  const isFormDisabled = !inviteCode || deadlinePassed;
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RsvpFormData>({
    firstName: guestName.split(' ')[0] || '',
    lastName: guestName.split(' ')[1] || '',
    email: '',
    phone: '',
    attendance: '',
    guestCount: 1,
    adult_count: 1,
    child_count: 0,
    dietary: '',
    message: '',
    gift_preference: '',
    relationship_to_couple: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const rsvpFormRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef(null);
  const playerRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(videoRef, { once: true, amount: 0.5 });
  const videoSrc = "https://res.cloudinary.com/dnjnhkyip/video/upload/q_auto:best,f_auto/IMG_8750_u5ilau.mp4";

  useEffect(() => {
    const videoPreload = document.createElement('link');
    videoPreload.rel = 'preload';
    videoPreload.href = videoSrc;
    videoPreload.as = 'video';
    videoPreload.type = 'video/mp4';
    document.head.appendChild(videoPreload);

    return () => {
      if (document.head.contains(videoPreload)) {
        document.head.removeChild(videoPreload);
      }
    };
  }, [videoSrc]);

  useEffect(() => {
    if (isInView && playerRef.current) {
      playerRef.current.play();
    }
  }, [isInView]);

  // @ts-expect-error - Using any for event type to avoid React type issues
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value, 10);

    setFormData((prev: RsvpFormData) => {
      const newState = { ...prev };

      if (name === 'guestCount') {
        newState.guestCount = numericValue;
        // When total guests change, assume all are adults by default
        newState.adult_count = numericValue;
        newState.child_count = 0;
      } else if (name === 'adult_count') {
        newState.adult_count = numericValue;
        // Auto-calculate children
        newState.child_count = newState.guestCount - numericValue;
      } else {
        // Using type assertion to handle dynamic property assignment
        (newState as Record<string, string | number | boolean>)[name] = value;
      }

      return newState;
    });
  };

  const nextStep = () => setCurrentStep((prev: number) => prev + 1);
  const prevStep = () => setCurrentStep((prev: number) => prev - 1);

  // @ts-expect-error - Using any for event type to avoid React type issues
  const handleSubmit = async (e) => {
    if (isFormDisabled) return;
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionError(null);
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, inviteCode }),
      });

      if (response.ok) {
        setSubmissionSuccess(true);
      } else {
        let errorMessage = 'An unknown error occurred.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || `Request failed with status ${response.status}`;
        } catch (_) {
          errorMessage = response.statusText || `Request failed with status ${response.status}`;
        }
        throw new Error(errorMessage);
      }
    } catch (error) {
      setSubmissionError(
        error instanceof Error ? error.message : 'Failed to submit RSVP. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalSteps = 4;

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName.trim() !== '' && formData.lastName.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 2:
        return formData.attendance !== '';
      case 3:
      case 4:
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
            <div className='text-center mb-10'>
              <Image src='/Flower.svg' alt='Floral Accent' width={60} height={60} className='mx-auto mb-2 opacity-70' />
              <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-neutral-900 font-semibold`}>Welcome, {guestName}!</h2>
              <p className={`${montserrat.className} text-xs text-neutral-500 mt-1`}>Please confirm your details.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>First Name</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-3 pl-10 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 shadow-sm hover:shadow-md placeholder-neutral-400 text-neutral-900" placeholder="e.g., Jane" required />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>Last Name</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 pl-10 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 shadow-sm hover:shadow-md placeholder-neutral-400 text-neutral-900" placeholder="e.g., Doe" required />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="email" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 pl-10 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 shadow-sm hover:shadow-md placeholder-neutral-400 text-neutral-900" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 pl-10 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 shadow-sm hover:shadow-md placeholder-neutral-400 text-neutral-900" placeholder="(123) 456-7890" />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
            <div className='text-center mb-10'>
              <Image src='/Flower.svg' alt='Floral Accent' width={60} height={60} className='mx-auto mb-2 opacity-70' />
              <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-neutral-900 font-semibold`}>Will You Be Attending?</h2>
              <p className={`${montserrat.className} text-xs text-neutral-500 mt-1`}>Let us know if you can make it.</p>
            </div>
            <div className="mb-6">
              <label htmlFor="attendance" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>Your Response</label>
              <div className="relative">
                <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <select name="attendance" id="attendance" value={formData.attendance} onChange={handleInputChange} className="w-full p-3 pl-10 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 shadow-sm hover:shadow-md text-neutral-900" required>
                  <option value="" disabled>Select an option</option>
                  <option value="yes">Yes, I'll be there!</option>
                  <option value="no">No, I can't make it</option>
                </select>
              </div>
            </div>
            {formData.attendance === 'yes' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="mb-6">
                <label htmlFor="guestCount" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>Number of Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                  <select name="guestCount" id="guestCount" value={formData.guestCount} onChange={handleInputChange} className="w-full p-3 pl-10 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 shadow-sm hover:shadow-md appearance-none text-neutral-900" required>
                    {Array.from({ length: allowedGuests }, (_, i) => i + 1).map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
                </div>

                {formData.guestCount > 1 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="adult_count" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>Adults</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <select name="adult_count" id="adult_count" value={formData.adult_count} onChange={handleInputChange} className="w-full p-3 pl-10 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 shadow-sm hover:shadow-md appearance-none text-neutral-900">
                          {Array.from({ length: formData.guestCount }, (_, i) => i + 1).map((count) => (
                            <option key={count} value={count}>{count}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="child_count" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>Children</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                        <input type="text" name="child_count" id="child_count" value={formData.child_count} readOnly className="w-full p-3 pl-10 bg-neutral-50/40 border-neutral-200 rounded-lg focus:outline-none transition-all duration-300 shadow-sm text-neutral-500 cursor-not-allowed" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
            <div className='text-center mb-10'>
              <Image src='/Flower.svg' alt='Floral Accent' width={60} height={60} className='mx-auto mb-2 opacity-70' />
              <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-neutral-900 font-semibold`}>Final Details</h2>
              <p className={`${montserrat.className} text-xs text-neutral-500 mt-1`}>Any additional information for us?</p>
            </div>
            <div className="mb-6">
              <label htmlFor="dietary" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>Dietary Restrictions (Optional)</label>
              <div className="relative">
                <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input type="text" name="dietary" id="dietary" value={formData.dietary} onChange={handleInputChange} className="w-full p-3 pl-10 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 shadow-sm hover:shadow-md placeholder-neutral-400 text-neutral-900" placeholder="e.g., Vegetarian, Gluten-free" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>Message for Us (Optional)</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-neutral-500" />
                <textarea name="message" id="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full p-3 pl-10 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 shadow-sm hover:shadow-md placeholder-neutral-400 text-neutral-900" placeholder="e.g., Can't wait to celebrate with you!" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="gift_preference" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>Gift Preference (Optional)</label>
              <div className="relative">
                <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input type="text" name="gift_preference" id="gift_preference" value={formData.gift_preference} onChange={handleInputChange} className="w-full p-3 pl-10 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 shadow-sm hover:shadow-md placeholder-neutral-400 text-neutral-900" placeholder="e.g., Contribution to honeymoon fund" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="relationship_to_couple" className={`${montserrat.className} block text-sm font-medium text-neutral-800 mb-1`}>Relationship to Couple (Optional)</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input type="text" name="relationship_to_couple" id="relationship_to_couple" value={formData.relationship_to_couple} onChange={handleInputChange} className="w-full p-3 pl-10 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent focus:border-primary-accent transition-all duration-300 shadow-sm hover:shadow-md placeholder-neutral-400 text-neutral-900" placeholder="e.g., Friend of the bride" />
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
            <div className='text-center mb-10'>
              <Image src='/Flower.svg' alt='Floral Accent' width={60} height={60} className='mx-auto mb-2 opacity-70' />
              <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-neutral-900 font-semibold`}>Review Your RSVP</h2>
              <p className={`${montserrat.className} text-xs text-neutral-500 mt-1`}>Please confirm your details before submitting.</p>
            </div>
            <div className="space-y-3 text-left text-sm text-neutral-700 p-6 bg-neutral-50 rounded-lg border border-neutral-200 shadow-inner">
              {
                [
                  { label: 'Name', value: `${formData.firstName} ${formData.lastName}` },
                  { label: 'Email', value: formData.email },
                  { label: 'Phone', value: formData.phone, hidden: !formData.phone },
                  { label: 'Attending', value: formData.attendance === 'yes' ? 'Yes, we will be there!' : 'No, we will be celebrating from afar.' },
                  { label: 'Guests', value: formData.guestCount, hidden: formData.attendance !== 'yes' },
                  { label: 'Dietary Restrictions', value: formData.dietary, hidden: !formData.dietary },
                  { label: 'Message', value: formData.message, hidden: !formData.message },
                  { label: 'Gift Preference', value: formData.gift_preference, hidden: !formData.gift_preference },
                  { label: 'Relationship to Couple', value: formData.relationship_to_couple, hidden: !formData.relationship_to_couple },
                ].map((item, index) => !item.hidden && (
                  <div key={index} className="flex justify-between items-start py-2 border-b border-neutral-200 last:border-b-0">
                    <p className="font-semibold text-neutral-800 w-1/3">{item.label}:</p>
                    <p className="text-neutral-600 text-right w-2/3">{item.value}</p>
                  </div>
                ))
              }
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className='bg-primary-background text-primary-text min-h-screen flex flex-col'>
      <Navbar />

      {/* Hero Section - Using HeroSection component from design system */}
      <section 
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Background image with overlay pattern and zoom animation */}
        <motion.div 
          className="absolute inset-0 w-full h-full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 12, ease: [0.23, 0.07, 0.25, 1] }}
        >
          <Image 
            src="/Wedding08.jpg" 
            alt="Wedding couple" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
          {/* Gradient overlay from bottom to top */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>
        </motion.div>
        
        {/* Content container - only appears after background animation is mostly complete */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
          className="relative z-10 w-full max-w-md md:max-w-2xl mx-auto px-4 text-center mt-24 md:mt-0 flex flex-col justify-center h-full"
        >
          {/* Arch-shaped image container - Only visible on mobile */}
          <motion.div 
            ref={videoRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="relative w-[85vw] max-w-xs h-64 mx-auto mb-6 overflow-hidden md:hidden border-2 border-black" 
            style={{ borderRadius: '50% 50% 0 0 / 100%' }}
          >
            <video
              ref={playerRef}
              className="absolute top-0 left-0 w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="auto"
            >
              <source 
                src={videoSrc} 
                type="video/mp4"
              />
            </video>
            {/* We Do text overlay with animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <p className={`${greatVibes.className} text-5xl md:text-6xl text-black drop-shadow-sm bg-white/30 px-8 py-3 rounded-full backdrop-blur-sm`}>
                We Do
              </p>
            </motion.div>
          </motion.div>
          
          {/* Couple names and details with staggered animations */}
          <div className="text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.0 }}
              className="uppercase text-xs tracking-[0.25em] text-white mb-1 md:mb-3"
            >
              TOGETHER WITH THEIR FAMILIES
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.3 }}
              className={`${playfairDisplay.className} text-3xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-3 text-white tracking-[0.05em]`}
            >
              KUNA <span className={`${greatVibes.className} text-primary-accent font-normal`}>and</span> KADEEN
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 2.6 }}
              className="uppercase text-xs tracking-[0.25em] text-white mb-4 md:mb-8"
            >
              INVITE YOU TO THEIR WEDDING CELEBRATION
            </motion.p>
            
            <div className="w-full max-w-xs mx-auto mt-2 md:mt-8 mb-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.9 }}
                className="flex justify-center items-center"
              >
                <p className={`${playfairDisplay.className} text-2xl md:text-5xl font-light text-white tracking-[0.1em]`}>
                  DECEMBER
                </p>
              </motion.div>
              
              <div className="flex justify-center items-center my-1 md:my-3">
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ duration: 2, delay: 3.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-16 md:w-24 h-px bg-white/70"
                ></motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, delay: 3.5 }}
                  className="px-3 md:px-5"
                >
                  <p className={`${playfairDisplay.className} text-4xl md:text-7xl font-bold text-white`}>
                    06
                  </p>
                </motion.div>
                
                <motion.div 
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "100%", opacity: 1 }}
                  transition={{ duration: 2, delay: 3.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="w-16 md:w-24 h-px bg-white/70"
                ></motion.div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 3.8 }}
                className="flex justify-center items-center"
              >
                <p className={`${playfairDisplay.className} text-2xl md:text-5xl font-light text-white tracking-[0.1em]`}>
                  2024
                </p>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 4.1 }}
              className="mt-2 md:mt-8"
            >
              <p className={`${montserrat.className} text-xs md:text-base uppercase tracking-[0.25em] text-white`}>
                SATURDAY <span className="mx-2">|</span> AT 11:30AM
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Details Section - Enhanced */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <Image
          src="/Wedding06.jpg"
          alt="Wedding background"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-20"
        />
        <div className="absolute inset-0 bg-wedding-section-light/80 z-0" />

        <div className="relative container mx-auto px-4 z-10">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className={`${greatVibes.className} text-6xl md:text-7xl text-wedding-text-dark`}>A Day to Remember</h2>
            <div className="w-24 h-1 bg-wedding-primary mx-auto mt-4"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              {
                icon: <Calendar className="w-10 h-10 text-wedding-primary" />,
                title: "Date & Time",
                description: "Saturday, December 6th, 2024\nCeremony at 11:30 AM",
              },
              {
                icon: <MapPin className="w-10 h-10 text-wedding-primary" />,
                title: "Location",
                description: "Hotel du Parc\n10 minutes from reception venue",
              },
              {
                icon: <Users className="w-10 h-10 text-wedding-primary" />,
                title: "Dress Code",
                description: "Semi formal and elegant\nFeel free to add a touch of pastel",
              },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2 * index }}
                className="text-center flex flex-col items-center"
              >
                <div className="mb-5">{item.icon}</div>
                <h3 className={`${playfairDisplay.className} text-2xl text-wedding-text-dark mb-3`}>{item.title}</h3>
                <p className={`${montserrat.className} text-neutral-600 whitespace-pre-line leading-relaxed`}>
                  {['Date & Time', 'Location'].includes(item.title) ? (
                    <Link href="/news" className="group inline-flex items-center justify-center gap-1.5 text-center">
                      <span className="group-hover:text-wedding-primary group-hover:underline transition-colors duration-300">{item.description}</span>
                      <ArrowUpRight className="w-3 h-3 text-neutral-500 group-hover:text-wedding-primary transition-colors duration-300 shrink-0" />
                    </Link>
                  ) : (
                    item.description
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dress Code Section - Redesigned */}
      <section className="relative py-20 md:py-32">
        <Image
          src="/Wedding10.jpg"
          alt="Dress Code Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-black/75 z-10" />
        <div className="relative container mx-auto px-4 z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <h3 className={`${greatVibes.className} text-5xl text-wedding-primary mb-2`}>What to Wear</h3>
              <h2 className={`${playfairDisplay.className} text-5xl md:text-6xl text-white mb-4 font-bold [text-shadow:2px_2px_4px_rgba(0,0,0,0.5)]`}>Dress Code</h2>
              <div className="w-24 h-0.5 bg-wedding-primary mb-8 mx-auto lg:mx-0"></div>
              <p className={`text-neutral-200 ${montserrat.className} leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0`}>
                To help you feel your best, here is our guide for attire. We recommend semi-formal wear for both the ceremony and reception.
              </p>
              <div className="space-y-6">
                <div className="flex items-start justify-center lg:justify-start gap-4">
                  <div className="text-wedding-primary pt-1"><Sparkles size={24} /></div>
                  <div className="text-left">
                    <h4 className={`text-2xl text-white ${playfairDisplay.className} font-semibold`}>For Her</h4>
                    <p className={`text-neutral-300 ${montserrat.className}`}>Cocktail dresses, elegant jumpsuits, or chic separates are all wonderful choices.</p>
                  </div>
                </div>
                <div className="flex items-start justify-center lg:justify-start gap-4">
                  <div className="text-wedding-primary pt-1"><PersonStanding size={24} /></div>
                  <div className="text-left">
                    <h4 className={`text-2xl text-white ${playfairDisplay.className} font-semibold`}>For Him</h4>
                    <p className={`text-neutral-300 ${montserrat.className}`}>A suit and tie or a sports coat will be perfect for the occasion.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Image Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-[400px] md:h-[500px]"
            >
              {[ 
                { src: "/Wedding07.jpg", label: "Ceremony: Her" },
                { src: "/Wedding02.jpg", label: "Ceremony: Him" },
                { src: "/Wedding03.jpg", label: "Reception: Her" },
                { src: "/Wedding04.jpg", label: "Reception: Him" },
              ].map((item, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden shadow-lg group">
                  <Image 
                    src={item.src}
                    alt={item.label}
                    layout="fill"
                    objectFit="cover"
                    className="transform group-hover:scale-105 transition-transform duration-500 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-2">
                    <p className={`text-white text-center font-semibold ${playfairDisplay.className} text-lg`}>{item.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* RSVP Form Section - Using layout from design system */}
      <section 
        ref={rsvpFormRef} 
        id="rsvp-form-section" 
        className="relative overflow-hidden py-16"
      >
        <Image
          src="/rsvp background.png"
          alt="RSVP background"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-40"
        />
        <div className="absolute inset-0 bg-wedding-section-light/80 backdrop-blur-sm z-0" />
        <div className="relative max-w-6xl mx-auto px-4">
          {/* RSVPSection heading from design system */}
          <div className="text-center space-y-6 mb-12">
            <Image
              src="/Flower.svg"
              alt="Decorative Flower"
              width={120}
              height={40}
              priority
              className="mb-[-8px] mx-auto"
            />
            <h3 className={`${greatVibes.className} text-3xl mb-4 text-primary-accent`}>Let Us Know</h3>
            <h2 className={`${playfairDisplay.className} text-5xl font-bold tracking-wide mb-2 text-primary-text`}>RSVP</h2>
            <p className={`${montserrat.className} text-lg mb-6 text-neutral-600`}>
              Please RSVP by August 01, 2025
            </p>
          </div>
          
          {/* Form container using InvitationCard structure */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative max-w-2xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden border border-neutral-100"
          >
            <div className="p-8 md:p-10">
              {submissionSuccess ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
                  <PartyPopper className="w-16 h-16 mx-auto text-primary-accent mb-4" />
                  <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-primary-text font-semibold`}>Thank You!</h2>
                  <p className={`${montserrat.className} text-neutral-600 mt-2`}>Your RSVP has been received. We can't wait to celebrate with you!</p>
                </motion.div>
              ) : submissionError ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
                  <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
                  <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-primary-text font-semibold`}>Oops!</h2>
                  <p className={`${montserrat.className} text-neutral-600 mt-2`}>{submissionError}</p>
                  <button 
                    onClick={() => setSubmissionError(null)} 
                    className="mt-6 px-6 py-2 bg-primary-accent text-white font-medium rounded-full shadow-md hover:bg-opacity-90 transition-all duration-300"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <form className="relative">
                  {isFormDisabled && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg"
                    >
                      <div className="text-center p-4">
                        <Info className="w-12 h-12 text-primary-accent mx-auto mb-4" />
                        <h3 className={`${playfairDisplay.className} text-2xl text-primary-text font-semibold`}>Invitation Required</h3>
                        <p className={`${montserrat.className} text-neutral-600 mt-2`}>
                          Please use the unique link from your invitation to RSVP.
                        </p>
                      </div>
                    </motion.div>
                  )}
                  {isSubmitting && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg"
                    >
                      <Loader2 className="w-12 h-12 text-primary-accent animate-spin" />
                    </motion.div>
                  )}

                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="relative h-2 bg-neutral-100 rounded-full">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-primary-accent rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: `${(currentStep - 1) / (totalSteps - 1) * 100}%` }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                      />
                    </div>
                    <p className={`${montserrat.className} text-center text-xs text-neutral-500 mt-2`}>Step {currentStep} of {totalSteps}</p>
                  </div>

                  {renderStep()}

                  {/* Navigation Buttons - Using Button component from design system */}
                  <div className="mt-10 flex justify-between items-center">
                    <button 
                      type="button" 
                      onClick={prevStep} 
                      disabled={currentStep === 1 || isSubmitting || isFormDisabled}
                      className="inline-flex items-center justify-center px-6 py-2 border border-neutral-300 text-neutral-700 font-medium rounded-full text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-50"
                    >
                      <ChevronLeft size={18} className="mr-1" />
                      Back
                    </button>

                    {currentStep < totalSteps ? (
                      <button 
                        type="button" 
                        onClick={nextStep} 
                        disabled={!isStepValid() || isSubmitting || isFormDisabled}
                        className="inline-flex items-center justify-center px-6 py-2 bg-neutral-900 text-white font-medium rounded-full text-sm tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800"
                      >
                        Next
                        <ChevronRight size={18} className="ml-1" />
                      </button>
                    ) : (
                      <button 
                        type="button" 
                        onClick={handleSubmit}
                        disabled={isSubmitting || isFormDisabled}
                        className="inline-flex items-center justify-center px-6 py-2 bg-neutral-900 text-white font-medium rounded-full text-sm tracking-wider transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-800"
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                        <CheckCircle2 size={18} className="ml-1" />
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <ClosingSlideshow />

      <Footer />
    </div>
  );
};

export default RsvpClientPage;