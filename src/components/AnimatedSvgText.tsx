"use client";

import { useEffect, useRef } from 'react';
import Vivus from 'vivus';

interface AnimatedSvgTextProps {
  id: string;
  svgPath: string;
  duration?: number;
  type?: 'delayed' | 'sync' | 'oneByOne' | 'scenario' | 'scenario-sync';
  pathTimingFunction?: (t: number) => number;
  animTimingFunction?: (t: number) => number;
  onReady?: () => void;
  className?: string;
}

const AnimatedSvgText: React.FC<AnimatedSvgTextProps> = ({
  id,
  svgPath,
  duration = 200,
  type = 'delayed',
  pathTimingFunction,
  animTimingFunction,
  onReady,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vivusInstance = useRef<Vivus | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Clean up any previous instance
      if (vivusInstance.current) {
        vivusInstance.current = null;
      }

      // Create new Vivus instance
      vivusInstance.current = new Vivus(
        id,
        {
          type,
          duration,
          file: svgPath,
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
  }, [id, svgPath, duration, type, pathTimingFunction, animTimingFunction, onReady]);

  return (
    <div ref={containerRef} className={className}>
      <div id={id}></div>
    </div>
  );
};

export default AnimatedSvgText; 