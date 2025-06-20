"use client";

import { useEffect, useRef } from 'react';
import Vivus from 'vivus';

interface AnimatedTextToSvgProps {
  id: string;
  text: string;
  duration?: number;
  type?: 'delayed' | 'sync' | 'oneByOne' | 'scenario' | 'scenario-sync';
  pathTimingFunction?: (t: number) => number;
  animTimingFunction?: (t: number) => number;
  onReady?: () => void;
  className?: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: string;
  letterSpacing?: number;
}

const AnimatedTextToSvg: React.FC<AnimatedTextToSvgProps> = ({
  id,
  text,
  duration = 200,
  type = 'delayed',
  pathTimingFunction,
  animTimingFunction,
  onReady,
  className = '',
  textColor = '#c29c5e',
  fontSize = 48,
  fontWeight = 'normal',
  letterSpacing = 0,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const vivusInstance = useRef<Vivus | null>(null);

  useEffect(() => {
    if (svgRef.current) {
      // Clean up any previous instance
      if (vivusInstance.current) {
        vivusInstance.current = null;
      }

      // Create new Vivus instance with the inline SVG
      vivusInstance.current = new Vivus(
        id,
        {
          type,
          duration,
          pathTimingFunction,
          animTimingFunction,
          start: 'autostart',
        },
        onReady
      );

      // Handle cleanup on unmount
      return () => {
        if (vivusInstance.current) {
          vivusInstance.current = null;
        }
      };
    }
  }, [id, text, duration, type, pathTimingFunction, animTimingFunction, onReady]);

  // Calculate SVG dimensions based on text length and font size
  const svgWidth = text.length * (fontSize * 0.6) + letterSpacing * (text.length - 1);
  const svgHeight = fontSize * 1.5;

  return (
    <div className={className}>
      <svg
        id={id}
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x="0"
          y={fontSize}
          fontFamily="inherit"
          fontSize={fontSize}
          fontWeight={fontWeight}
          letterSpacing={letterSpacing}
          fill="none"
          stroke={textColor}
          strokeWidth="1"
          style={{ fontFamily: 'inherit' }}
        >
          {text}
        </text>
      </svg>
    </div>
  );
};

export default AnimatedTextToSvg; 