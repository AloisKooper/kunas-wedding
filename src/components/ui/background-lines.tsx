"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";
 
export const BackgroundLines = ({
  children,
  className,
  svgOptions,
}: {
  children: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
  };
}) => {
  return (
    <div
      className={cn(
        "h-[20rem] md:h-screen w-full bg-white dark:bg-black relative",
        className
      )}
    >
      <SVG svgOptions={svgOptions} />
      {children}
    </div>
  );
};
 
const pathVariants = {
  initial: { strokeDashoffset: 800, strokeDasharray: "50 800" },
  animate: {
    strokeDashoffset: 0,
    strokeDasharray: "20 800",
    opacity: [0, 1, 1, 0],
  },
};
 
const SVG = ({
  svgOptions,
}: {
  svgOptions?: {
    duration?: number;
  };
}) => {
  const paths = [
    // Top right
    "M720 450C720 450 742.459 440.315 755.249 425.626C768.039 410.937 778.88 418.741 789.478 401.499C800.076 384.258 817.06 389.269 826.741 380.436C836.423 371.603 851.957 364.826 863.182 356.242C874.408 347.657 877.993 342.678 898.867 333.214C919.741 323.75 923.618 319.88 934.875 310.177C946.133 300.474 960.784 300.837 970.584 287.701C980.384 274.564 993.538 273.334 1004.85 263.087C1016.15 252.84 1026.42 250.801 1038.22 242.1",
    // Top left
    "M720 450C720 450 697.541 440.315 684.751 425.626C671.961 410.937 661.12 418.741 650.522 401.499C639.924 384.258 622.94 389.269 613.259 380.436C603.577 371.603 588.043 364.826 576.818 356.242C565.592 347.657 562.007 342.678 541.133 333.214C520.259 323.75 516.382 319.88 505.125 310.177C493.867 300.474 479.216 300.837 469.416 287.701C459.616 274.564 446.462 273.334 435.15 263.087C423.85 252.84 413.58 250.801 401.78 242.1",
    // Bottom right
    "M720 450C720 450 742.459 459.685 755.249 474.374C768.039 489.063 778.88 481.259 789.478 498.501C800.076 515.742 817.06 510.731 826.741 519.564C836.423 528.397 851.957 535.174 863.182 543.758C874.408 552.343 877.993 557.322 898.867 566.786C919.741 576.25 923.618 580.12 934.875 589.823C946.133 599.526 960.784 599.163 970.584 612.299C980.384 625.436 993.538 626.666 1004.85 636.913C1016.15 647.16 1026.42 649.199 1038.22 657.9",
    // Bottom left
    "M720 450C720 450 697.541 459.685 684.751 474.374C671.961 489.063 661.12 481.259 650.522 498.501C639.924 515.742 622.94 510.731 613.259 519.564C603.577 528.397 588.043 535.174 576.818 543.758C565.592 552.343 562.007 557.322 541.133 566.786C520.259 576.25 516.382 580.12 505.125 589.823C493.867 599.526 479.216 599.163 469.416 612.299C459.616 625.436 446.462 626.666 435.15 636.913C423.85 647.16 413.58 649.199 401.78 657.9",
  ];
 
  const colors = [
    "#46A5CA",
    "#8C2F2F",
    "#4FAE4D",
    "#D6590C",
  ];

  return (
    <motion.svg
      viewBox="0 0 1440 900"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full"
    >
      {paths.map((path, idx) => (
        <motion.path
          d={path}
          stroke={colors[idx]}
          strokeWidth="2.3"
          strokeLinecap="round"
          variants={pathVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: svgOptions?.duration || 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            delay: idx * 0.5,
          }}
          key={`path-first-${idx}`}
        />
      ))}
 
      {/* duplicate for more paths */}
      {paths.map((path, idx) => (
        <motion.path
          d={path}
          stroke={colors[idx]}
          strokeWidth="2.3"
          strokeLinecap="round"
          variants={pathVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: svgOptions?.duration || 8,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            delay: (idx * 0.5) + 4,
          }}
          key={`path-second-${idx}`}
        />
      ))}
    </motion.svg>
  );
};
