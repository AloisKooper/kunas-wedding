"use client";
import React from 'react';
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { greatVibes, montserrat } from '@/fonts/fonts'
import Image from 'next/image'

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  date: string;
  image?: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const yLeft = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const yRight = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  return (
    <div
      className="w-full font-sans relative py-20 overflow-hidden"
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {/* Center Line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-1/2 -translate-x-1/2 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-wedding-primary via-wedding-primary to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>

        {/* Timeline Items */}
        {data.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center justify-center gap-8 md:gap-16 py-20",
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            )}
          >
            {/* Content Side */}
            <div className="flex-1 max-w-lg">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className={cn("space-y-4", index % 2 === 0 ? "text-right" : "text-left")}
              >
                <h3 className={cn(greatVibes.className, "text-3xl md:text-4xl text-wedding-text-dark")}>
                  {item.title}
                </h3>
                <span className={cn(montserrat.className, "block text-wedding-primary text-sm tracking-wide")}>
                  {item.date}
                </span>
                <div className={cn(montserrat.className, "text-gray-600 leading-relaxed")}>
                  {item.content}
                </div>
              </motion.div>
            </div>

            {/* Center Dot */}
            <div className="relative">
              <div className="h-6 w-6 rounded-full bg-white border-2 border-wedding-primary flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-wedding-primary" />
              </div>
            </div>

            {/* Image Side */}
            <div className="flex-1 max-w-lg">
              {item.image && (
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover ${index === 0 ? 'object-top' : ''}`}
                  />
                </motion.div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
