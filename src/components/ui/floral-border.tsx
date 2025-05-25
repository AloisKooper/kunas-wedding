'use client';

import React from 'react';
import Image from 'next/image';

interface FloralBorderProps {
  className?: string;
  variant?: 'top' | 'bottom' | 'both';
}

export const FloralBorder: React.FC<FloralBorderProps> = ({ 
  className = '', 
  variant = 'top' 
}) => {
  return (
    <div className={`relative w-full ${className}`}>
      {(variant === 'top' || variant === 'both') && (
        <div className="absolute top-0 left-0 w-full flex justify-center overflow-hidden">
          <div className="relative w-full max-w-5xl">
            <div className="absolute left-0 top-0">
              <Image
                src="/floral-divider-left.png" 
                alt="Floral Border Left"
                width={200}
                height={80}
                className="opacity-80"
              />
            </div>
            <div className="absolute right-0 top-0">
              <Image
                src="/floral-divider-right.png"
                alt="Floral Border Right"
                width={200}
                height={80}
                className="opacity-80"
              />
            </div>
            <div className="w-full flex justify-center">
              <Image
                src="/floral-divider-center.png"
                alt="Floral Border Center"
                width={300}
                height={80}
                className="opacity-80"
              />
            </div>
          </div>
        </div>
      )}
      
      {(variant === 'bottom' || variant === 'both') && (
        <div className="absolute bottom-0 left-0 w-full flex justify-center overflow-hidden">
          <div className="relative w-full max-w-5xl">
            <div className="absolute left-0 bottom-0">
              <Image
                src="/floral-divider-left.png" 
                alt="Floral Border Left"
                width={200}
                height={80}
                className="opacity-80 transform rotate-180"
              />
            </div>
            <div className="absolute right-0 bottom-0">
              <Image
                src="/floral-divider-right.png"
                alt="Floral Border Right"
                width={200}
                height={80}
                className="opacity-80 transform rotate-180"
              />
            </div>
            <div className="w-full flex justify-center">
              <Image
                src="/floral-divider-center.png"
                alt="Floral Border Center"
                width={300}
                height={80}
                className="opacity-80 transform rotate-180"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloralBorder;
