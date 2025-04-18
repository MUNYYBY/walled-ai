"use client";

import React from "react";
import { motion } from "framer-motion";

const SimpleMovingGradients: React.FC = () => {
  return (
    <div className="relative h-[600px] w-[900px] overflow-hidden bg-transparent">
      {/* Red gradient circle */}
      <motion.div
        className="absolute size-[300px] rounded-full bg-[#F93C52]/15 blur-2xl"
        animate={{
          x: ["40px", "100px", "50px", "200px", "40px"],
          y: ["40px", "150px", "250px", "100px", "40px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blue gradient circle */}
      <motion.div
        className="absolute size-[300px] rounded-full bg-[#2B21F3]/15 blur-2xl"
        animate={{
          x: ["300px", "200px", "350px", "150px", "300px"],
          y: ["300px", "150px", "200px", "350px", "300px"],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />
    </div>
  );
};

export default SimpleMovingGradients;
