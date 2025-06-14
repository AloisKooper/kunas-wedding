'use client';

import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { greatVibes, montserrat, playfairDisplay } from '@/fonts/fonts';
import { ChevronLeft, ChevronRight, CheckCircle2, Users, Mail, Phone, MessageSquare, PartyPopper, XCircle, Info, Loader2, ChevronDown } from 'lucide-react';
import React, { useState, useRef } from 'react';

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

  const heroRef = useRef<HTMLDivElement>(null);

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
              <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-sepia-text font-semibold`}>Welcome, {guestName}!</h2>
              <p className={`${montserrat.className} text-xs text-sepia-text/70 mt-1`}>Please confirm your details.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="firstName" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>First Name</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70" />
                  <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full p-3 pl-10 bg-parchment/50 border border-sepia-border rounded-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:border-faded-gold transition-all duration-300 shadow-sm hover:shadow-md placeholder-sepia-text/70 text-sepia-text" placeholder="e.g., Jane" required />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>Last Name</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70" />
                  <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full p-3 pl-10 bg-parchment/50 border border-sepia-border rounded-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:border-faded-gold transition-all duration-300 shadow-sm hover:shadow-md placeholder-sepia-text/70 text-sepia-text" placeholder="e.g., Doe" required />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="email" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70" />
                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 pl-10 bg-parchment/50 border border-sepia-border rounded-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:border-faded-gold transition-all duration-300 shadow-sm hover:shadow-md placeholder-sepia-text/70 text-sepia-text" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="phone" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>Phone Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70" />
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3 pl-10 bg-parchment/50 border border-sepia-border rounded-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:border-faded-gold transition-all duration-300 shadow-sm hover:shadow-md placeholder-sepia-text/70 text-sepia-text" placeholder="(123) 456-7890" />
              </div>
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
            <div className='text-center mb-10'>
              <Image src='/Flower.svg' alt='Floral Accent' width={60} height={60} className='mx-auto mb-2 opacity-70' />
              <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-sepia-text font-semibold`}>Will You Be Attending?</h2>
              <p className={`${montserrat.className} text-xs text-sepia-text/70 mt-1`}>Let us know if you can make it.</p>
            </div>
            <div className="mb-6">
              <label htmlFor="attendance" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>Your Response</label>
              <div className="relative">
                <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70" />
                <select name="attendance" id="attendance" value={formData.attendance} onChange={handleInputChange} className="w-full p-3 pl-10 bg-parchment/50 border border-sepia-border rounded-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:border-faded-gold transition-all duration-300 shadow-sm hover:shadow-md text-sepia-text" required>
                  <option value="" disabled>Select an option</option>
                  <option value="yes">Yes, I'll be there!</option>
                  <option value="no">No, I can't make it</option>
                </select>
              </div>
            </div>
            {formData.attendance === 'yes' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="mb-6">
                <label htmlFor="guestCount" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>Number of Guests</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70" />
                  <select name="guestCount" id="guestCount" value={formData.guestCount} onChange={handleInputChange} className="w-full p-3 pl-10 bg-parchment/50 border border-sepia-border rounded-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:border-faded-gold transition-all duration-300 shadow-sm hover:shadow-md appearance-none text-sepia-text" required>
                    {Array.from({ length: allowedGuests }, (_, i) => i + 1).map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70 pointer-events-none" />
                </div>

                {formData.guestCount > 1 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.5 }} className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <label htmlFor="adult_count" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>Adults</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70" />
                        <select name="adult_count" id="adult_count" value={formData.adult_count} onChange={handleInputChange} className="w-full p-3 pl-10 bg-parchment/50 border border-sepia-border rounded-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:border-faded-gold transition-all duration-300 shadow-sm hover:shadow-md appearance-none text-sepia-text">
                          {Array.from({ length: formData.guestCount }, (_, i) => i + 1).map((count) => (
                            <option key={count} value={count}>{count}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="child_count" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>Children</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70" />
                        <input type="text" name="child_count" id="child_count" value={formData.child_count} readOnly className="w-full p-3 pl-10 bg-parchment/40 border-sepia-border/50 rounded-lg focus:outline-none transition-all duration-300 shadow-sm text-sepia-text/70 cursor-not-allowed" />
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
              <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-sepia-text font-semibold`}>Final Details</h2>
              <p className={`${montserrat.className} text-xs text-sepia-text/70 mt-1`}>Any additional information for us?</p>
            </div>
            <div className="mb-6">
              <label htmlFor="dietary" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>Dietary Restrictions (Optional)</label>
              <div className="relative">
                <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70" />
                <input type="text" name="dietary" id="dietary" value={formData.dietary} onChange={handleInputChange} className="w-full p-3 pl-10 bg-parchment/50 border border-sepia-border rounded-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:border-faded-gold transition-all duration-300 shadow-sm hover:shadow-md placeholder-sepia-text/70 text-sepia-text" placeholder="e.g., Vegetarian, Gluten-free" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="message" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>Message for Us (Optional)</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-sepia-text/70" />
                <textarea name="message" id="message" value={formData.message} onChange={handleInputChange} rows={4} className="w-full p-3 pl-10 bg-parchment/50 border border-sepia-border rounded-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:border-faded-gold transition-all duration-300 shadow-sm hover:shadow-md placeholder-sepia-text/70 text-sepia-text" placeholder="e.g., Can't wait to celebrate with you!" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="gift_preference" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>Gift Preference (Optional)</label>
              <div className="relative">
                <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70" />
                <input type="text" name="gift_preference" id="gift_preference" value={formData.gift_preference} onChange={handleInputChange} className="w-full p-3 pl-10 bg-parchment/50 border border-sepia-border rounded-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:border-faded-gold transition-all duration-300 shadow-sm hover:shadow-md placeholder-sepia-text/70 text-sepia-text" placeholder="e.g., Contribution to honeymoon fund" />
              </div>
            </div>
            <div className="mb-6">
              <label htmlFor="relationship_to_couple" className={`${montserrat.className} block text-sm font-medium text-sepia-text mb-1`}>Relationship to Couple (Optional)</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-sepia-text/70" />
                <input type="text" name="relationship_to_couple" id="relationship_to_couple" value={formData.relationship_to_couple} onChange={handleInputChange} className="w-full p-3 pl-10 bg-parchment/50 border border-sepia-border rounded-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:border-faded-gold transition-all duration-300 shadow-sm hover:shadow-md placeholder-sepia-text/70 text-sepia-text" placeholder="e.g., Friend of the bride" />
              </div>
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.5 }}>
            <div className='text-center mb-10'>
              <Image src='/Flower.svg' alt='Floral Accent' width={60} height={60} className='mx-auto mb-2 opacity-70' />
              <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-sepia-text font-semibold`}>Review Your RSVP</h2>
              <p className={`${montserrat.className} text-xs text-sepia-text/70 mt-1`}>Please confirm your details before submitting.</p>
            </div>
            <div className="space-y-3 text-left text-sm text-sepia-text/90 p-6 bg-parchment/30 rounded-lg border border-sepia-border/30 shadow-inner">
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
                  <div key={index} className="flex justify-between items-start py-2 border-b border-sepia-border/50 last:border-b-0">
                    <p className="font-semibold text-sepia-text w-1/3">{item.label}:</p>
                    <p className="text-sepia-text/80 text-right w-2/3">{item.value}</p>
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
    <div className='bg-background text-foreground min-h-screen flex flex-col'>
      <Navbar />

      {/* NEW HERO SECTION */}
      <section 
        className="relative w-full h-[calc(80vh)] md:h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center text-white overflow-hidden"
        style={{ backgroundImage: 'url(/Wedding08.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/50 z-10"></div> {/* Dark overlay for text contrast */}
        <motion.div 
          className="relative z-20 p-6 md:p-8 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
        >
          <h1 className={`${greatVibes.className} text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 md:mb-4 text-faded-gold drop-shadow-lg`}>
            Kuna & Kadeen
          </h1>
          <p className={`${playfairDisplay.className} text-2xl sm:text-3xl md:text-4xl mb-4 md:mb-6 text-white drop-shadow-md`}>
            Joyfully Request the Pleasure of Your Company
          </p>
          <p className={`${montserrat.className} text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-xl mx-auto text-gray-200`}>
            We are so excited to celebrate our special day with you. Please find the RSVP form below to let us know if you can make it.
          </p>
          <motion.button
            onClick={() => document.getElementById('rsvp-form-section')?.scrollIntoView({ behavior: 'smooth' })}
            className={`${montserrat.className} px-6 py-3 sm:px-8 sm:py-3 bg-faded-gold text-white font-semibold rounded-lg shadow-xl hover:bg-faded-gold/80 transition-all duration-300 text-md sm:text-lg focus:outline-none focus:ring-2 focus:ring-faded-gold focus:ring-opacity-50`}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            Proceed to RSVP
          </motion.button>
        </motion.div>
      </section>

      {/* RSVP FORM SECTION - ID added for scrolling, padding adjusted */}
      <main id="rsvp-form-section" ref={heroRef} className="relative overflow-hidden flex-grow flex items-center justify-center bg-cover bg-center py-12 md:py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: "url('/rsvpbackgroundnew.png')" }}>
        {/* Fading blur overlay for the background */}
        <div className="absolute inset-0 w-full h-full backdrop-blur-[3px] [mask-image:linear-gradient(to_bottom,black_20%,transparent_70%)]"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative w-full max-w-2xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
          <Image src="/gold-frame-top.png" alt="Decorative Gold Frame" width={800} height={100} className="absolute top-0 left-1/2 -translate-x-1/2 w-full opacity-80" />
          <Image src="/gold-frame-bottom.png" alt="Decorative Gold Frame" width={800} height={100} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full opacity-80" />
          
          <div className="relative p-8 md:p-12 z-10">
            {submissionSuccess ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
                <PartyPopper className="w-16 h-16 mx-auto text-faded-gold mb-4" />
                <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-sepia-text font-semibold`}>Thank You!</h2>
                <p className={`${montserrat.className} text-sepia-text/80 mt-2`}>Your RSVP has been received. We can't wait to celebrate with you!</p>
              </motion.div>
            ) : submissionError ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="text-center">
                <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
                <h2 className={`${playfairDisplay.className} text-4xl md:text-5xl text-sepia-text font-semibold`}>Oops!</h2>
                <p className={`${montserrat.className} text-sepia-text/80 mt-2`}>{submissionError}</p>
                <button 
                  onClick={() => setSubmissionError(null)} 
                  className="mt-6 px-6 py-2 bg-faded-gold text-white font-semibold rounded-lg shadow-md hover:bg-faded-gold/90 transition-all duration-300"
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
                    className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg"
                  >
                    <div className="text-center p-4">
                      <Info className="w-12 h-12 text-faded-gold mx-auto mb-4" />
                      <h3 className={`${playfairDisplay.className} text-2xl text-sepia-text font-semibold`}>Invitation Required</h3>
                      <p className={`${montserrat.className} text-sepia-text/80 mt-2`}>
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
                    className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-20 rounded-lg"
                  >
                    <Loader2 className="w-12 h-12 text-faded-gold animate-spin" />
                  </motion.div>
                )}

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="relative h-2 bg-parchment rounded-full">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-faded-gold rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${(currentStep - 1) / (totalSteps - 1) * 100}%` }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                    />
                  </div>
                  <p className={`${montserrat.className} text-center text-xs text-sepia-text/70 mt-2`}>Step {currentStep} of {totalSteps}</p>
                </div>

                {renderStep()}

                {/* Navigation Buttons */}
                <div className="mt-10 flex justify-between items-center">
                  <button 
                    type="button" 
                    onClick={prevStep} 
                    disabled={currentStep === 1 || isSubmitting || isFormDisabled}
                    className={`${montserrat.className} px-6 py-2 flex items-center gap-2 bg-transparent text-sepia-text font-medium rounded-lg hover:bg-parchment/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <ChevronLeft size={18} />
                    Back
                  </button>

                  {currentStep < totalSteps ? (
                    <button 
                      type="button" 
                      onClick={nextStep} 
                      disabled={!isStepValid() || isSubmitting || isFormDisabled}
                      className={`${montserrat.className} px-6 py-2 flex items-center gap-2 bg-faded-gold text-white font-semibold rounded-lg shadow-md hover:bg-faded-gold/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      Next
                      <ChevronRight size={18} />
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      onClick={handleSubmit}
                      disabled={isSubmitting || isFormDisabled}
                      className={`${montserrat.className} px-6 py-2 flex items-center gap-2 bg-faded-gold text-white font-semibold rounded-lg shadow-md hover:bg-faded-gold/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
                      <CheckCircle2 size={18} />
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default RsvpClientPage;