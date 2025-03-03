import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

const HorizontalSlide = ({ children, handleChangeDate, pageKey }) => {
  const [dragging, setDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const controls = useAnimation(); // Framer Motion animation controller
  let holdTimeout;

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

  function handlePointerDown() {
    holdTimeout = setTimeout(() => {
      controls.start({ scale: 0.95 });
    }, 100); // 1-second hold before scaling
  }

  function handlePointerUp() {
    clearTimeout(holdTimeout);
    controls.start({ scale: 1 });
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
      }}
      animate={controls} // Controlled animation
      onPointerDown={handlePointerDown} // Detect press start
      onPointerUp={handlePointerUp} // Reset on release
      onPointerLeave={handlePointerUp} // Reset if user moves pointer away
    >
      {children}
    </motion.div>
  );
};

export default HorizontalSlide;
