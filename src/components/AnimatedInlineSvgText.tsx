"use client";

import { useEffect, useRef } from 'react';
import Vivus from 'vivus';

interface AnimatedInlineSvgTextProps {
  id: string;
  duration?: number;
  type?: 'delayed' | 'sync' | 'oneByOne' | 'scenario' | 'scenario-sync';
  pathTimingFunction?: (t: number) => number;
  animTimingFunction?: (t: number) => number;
  onReady?: () => void;
  className?: string;
  children: React.ReactNode;
}

const AnimatedInlineSvgText: React.FC<AnimatedInlineSvgTextProps> = ({
  id,
  duration = 200,
  type = 'delayed',
  pathTimingFunction,
  animTimingFunction,
  onReady,
  className = '',
  children
}) => {
  const vivusInstance = useRef<Vivus | null>(null);

  useEffect(() => {
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
  }, [id, duration, type, pathTimingFunction, animTimingFunction, onReady]);

  return (
    <div className={className}>
      {/* The SVG must have the ID that matches the one used in the Vivus constructor */}
      {children}
    </div>
  );
};

export default AnimatedInlineSvgText; 