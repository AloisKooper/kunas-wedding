// @ts-nocheck - Temporarily disable TypeScript checking
import { useEffect } from 'react'
import type { RefObject } from 'react'

export const useOutsideClick = (
  ref: RefObject<HTMLDivElement | null>,
  callback: Function
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback]);
};
