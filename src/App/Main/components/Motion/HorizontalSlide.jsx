import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const HorizontalSlide = ({ children, handleSwipe, pageKey, style = {} }) => {
  const controls = useAnimation();

  function handleDragEnd(_, info) {
    const offsetX = info.offset.x;
    const offsetY = info.offset.y;

    // Ignore if vertical movement is greater than horizontal movement
    if (Math.abs(offsetY) > Math.abs(offsetX)) {
      return;
    }

    // If the drag distance crosses a threshold, change date
    if (offsetX < -100) {
      handleSwipe("right");
    } else if (offsetX > 100) {
      handleSwipe("left");
    }
  }

  return (
    <motion.div
      key={pageKey}
      drag="x"
      dragDirectionLock
      dragElastic={0.2}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{
        ...style,
      }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default HorizontalSlide;
