import React, { useState } from "react";
import { motion } from "framer-motion";

const HorizontalSlide = ({ children, handleChangeDate, pageKey }) => {
  const [dragging, setDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);

  // functions to handle dragging box
  function handleDragStart() {
    setDragging(true);
  }

  function handleDragEnd(_, info) {
    setDragging(false);
    const offsetX = info.offset.x;

    // If the drag distance crosses a threshold, change date
    if (offsetX < -100) {
      handleChangeDate("right");
    } else if (offsetX > 100) {
      handleChangeDate("left");
    }

    setDragDistance(0);
  }

  function handleDrag(event, info) {
    setDragDistance(info.offset.x);
  }
  return (
    <motion.div
      key={pageKey}
      drag="x" // Enable dragging along the x-axis
      dragConstraints={{ left: 0, right: 0 }} // No movement beyond the container
      onDragStart={handleDragStart} // Start tracking drag
      onDrag={handleDrag} // Update drag distance as the user drags
      onDragEnd={handleDragEnd} // Trigger action after drag ends
      style={{
        x: dragDistance,
        transition: dragging ? "none" : "transform 0.3s ease",
      }}
    >
      {children}
    </motion.div>
  );
};

export default HorizontalSlide;
