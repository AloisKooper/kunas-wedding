'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Fade } from 'react-awesome-reveal';

interface FlowerDividerProps {
  className?: string;
  color?: string;
}

const FlowerDivider: React.FC<FlowerDividerProps> = ({ 
  className = '',
  color = '#C19875' // Default to a soft gold color
}) => {
  return (
    <Fade direction="down" triggerOnce className={`w-full flex justify-center overflow-hidden ${className}`}>
      <div className="relative w-full flex justify-center items-center py-4">
        <svg 
          width="100%" 
          height="80" 
          viewBox="0 0 800 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="max-w-4xl"
        >
          {/* Main horizontal line */}
          <path 
            d="M50 40 H750" 
            stroke={color} 
            strokeWidth="1.5" 
            strokeLinecap="round"
          />
          
          {/* Center decorative flower */}
          <g transform="translate(400, 40)">
            <motion.g
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              {/* Flower petals */}
              <path d="M0,-20 C5,-15 5,-5 0,0 C-5,-5 -5,-15 0,-20" fill={color} opacity="0.7" />
              <path d="M0,-20 C5,-15 5,-5 0,0 C-5,-5 -5,-15 0,-20" fill={color} opacity="0.7" transform="rotate(45)" />
              <path d="M0,-20 C5,-15 5,-5 0,0 C-5,-5 -5,-15 0,-20" fill={color} opacity="0.7" transform="rotate(90)" />
              <path d="M0,-20 C5,-15 5,-5 0,0 C-5,-5 -5,-15 0,-20" fill={color} opacity="0.7" transform="rotate(135)" />
              <path d="M0,-20 C5,-15 5,-5 0,0 C-5,-5 -5,-15 0,-20" fill={color} opacity="0.7" transform="rotate(180)" />
              <path d="M0,-20 C5,-15 5,-5 0,0 C-5,-5 -5,-15 0,-20" fill={color} opacity="0.7" transform="rotate(225)" />
              <path d="M0,-20 C5,-15 5,-5 0,0 C-5,-5 -5,-15 0,-20" fill={color} opacity="0.7" transform="rotate(270)" />
              <path d="M0,-20 C5,-15 5,-5 0,0 C-5,-5 -5,-15 0,-20" fill={color} opacity="0.7" transform="rotate(315)" />
            </motion.g>
            <circle cx="0" cy="0" r="5" fill={color} />
          </g>
          
          {/* Left side decorative elements */}
          <g transform="translate(150, 40)">
            <path 
              d="M0,0 C-15,-15 -30,-15 -45,0" 
              stroke={color} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              fill="none"
            />
            <circle cx="-45" cy="0" r="3" fill={color} />
            <circle cx="-22" cy="-8" r="3" fill={color} />
          </g>
          
          <g transform="translate(250, 40)">
            <path 
              d="M0,0 C-10,-20 -20,-20 -30,0" 
              stroke={color} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              fill="none"
            />
            <circle cx="-30" cy="0" r="3" fill={color} />
            <circle cx="-15" cy="-10" r="3" fill={color} />
          </g>
          
          {/* Right side decorative elements */}
          <g transform="translate(550, 40)">
            <path 
              d="M0,0 C10,-20 20,-20 30,0" 
              stroke={color} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              fill="none"
            />
            <circle cx="30" cy="0" r="3" fill={color} />
            <circle cx="15" cy="-10" r="3" fill={color} />
          </g>
          
          <g transform="translate(650, 40)">
            <path 
              d="M0,0 C15,-15 30,-15 45,0" 
              stroke={color} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              fill="none"
            />
            <circle cx="45" cy="0" r="3" fill={color} />
            <circle cx="22" cy="-8" r="3" fill={color} />
          </g>
          
          {/* Small decorative flowers */}
          <g transform="translate(100, 40)">
            <circle cx="0" cy="0" r="3" fill={color} />
            <circle cx="0" cy="-6" r="2" fill={color} opacity="0.7" />
            <circle cx="6" cy="0" r="2" fill={color} opacity="0.7" />
            <circle cx="0" cy="6" r="2" fill={color} opacity="0.7" />
            <circle cx="-6" cy="0" r="2" fill={color} opacity="0.7" />
          </g>
          
          <g transform="translate(700, 40)">
            <circle cx="0" cy="0" r="3" fill={color} />
            <circle cx="0" cy="-6" r="2" fill={color} opacity="0.7" />
            <circle cx="6" cy="0" r="2" fill={color} opacity="0.7" />
            <circle cx="0" cy="6" r="2" fill={color} opacity="0.7" />
            <circle cx="-6" cy="0" r="2" fill={color} opacity="0.7" />
          </g>
          
          {/* Additional small decorative elements */}
          <circle cx="200" cy="40" r="2" fill={color} />
          <circle cx="300" cy="40" r="2" fill={color} />
          <circle cx="500" cy="40" r="2" fill={color} />
          <circle cx="600" cy="40" r="2" fill={color} />
        </svg>
      </div>
    </Fade>
  );
};

export default FlowerDivider;
