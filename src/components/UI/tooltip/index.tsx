"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { ReactNode, useState, useRef, useEffect } from "react";

import "./styles.scss";

interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: "top" | "bottom" | "left" | "right";
}

const TOOLTIP_WIDTH = 270;

export const Tooltip: React.FC<TooltipProps> = ({ children, content, position = "top" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [triggerWidth, setTriggerWidth] = useState(0);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (triggerRef.current) {
      setTriggerWidth(triggerRef.current.offsetWidth);
    }
  }, []);

  return (
    <div
      ref={triggerRef}
      className="tooltip-wrapper relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={`tooltip tooltip-${position}`}
            exit={{ opacity: 0, y: position === "top" ? -5 : 5 }}
            initial={{ opacity: 0, y: position === "top" ? -5 : 5 }}
            style={{
              minWidth: `${TOOLTIP_WIDTH}px`,
              ...(position === "top" || position === "bottom"
                ? { left: `calc(50% - ${Math.max(triggerWidth, TOOLTIP_WIDTH) / 2}px)` }
                : {}),
            }}
            transition={{ duration: 0.2 }}
          >
            {content}
            <div className={`tooltip-arrow tooltip-arrow-${position}`} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
