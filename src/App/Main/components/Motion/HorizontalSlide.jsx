import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const HorizontalSlide = ({ children, handleSwipe, pageKey, style = {} }) => {
  const [dragging, setDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const controls = useAnimation(); // Framer Motion animation controller

  // functions to handle dragging box
  function handleDragStart() {
    setDragging(true);
  }

  function handleDragEnd(_, info) {
    setDragging(false);
    const offsetX = info.offset.x;

    // If the drag distance crosses a threshold, change date
    if (offsetX < -100) {
      handleSwipe("right");
    } else if (offsetX > 100) {
      handleSwipe("left");
    }

    setDragDistance(0);
  }

  function handleDrag(event, info) {
    setDragDistance(info.offset.x);
  }

  return (
    <motion.div
      key={pageKey}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{
        x: dragDistance,
        transition: dragging ? "none" : "transform 0.3s ease",
        pointerEvents: dragging ? "none" : "auto",
        ...style,
      }}
      animate={controls} // Controlled animation
    >
      {children}
    </motion.div>
  );
};

export default HorizontalSlide;
