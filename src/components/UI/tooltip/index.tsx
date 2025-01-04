"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { ReactNode, useState } from "react";

import "./styles.scss";

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

export const Tooltip: React.FC<TooltipProps> = ({ children, content, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: "position-top",
    bottom: "position-bottom",
    left: "position-left",
    right: "position-right",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={`tooltip ${positionClasses[position]}`}
            exit={{ opacity: 0, y: -5 }}
            initial={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
