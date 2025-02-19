'use client'

import { HoverBorderGradient } from './hover-border-gradient'
import { montserrat } from '@/fonts/fonts'

export function ReservationButton() {
  return (
    <div className="inline-block">
      <HoverBorderGradient 
        className="font-montserrat font-light text-[16px] text-white whitespace-nowrap bg-wedding-primary px-8 py-3"
        containerClassName="border-none"
      >
        RESERVATION
      </HoverBorderGradient>
    </div>
  )
}
