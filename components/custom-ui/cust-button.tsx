"use client";

import React from "react";
import { motion } from "motion/react";
import { SearchIcon } from "lucide-react";

const CustButton = () => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      variants={{
        divhover: {
          scale: 1.05,
          transition: { delay: 0.3, ease: "easeInOut" },
        },
      }}
      whileHover={["hover"]}
      className='group relative rounded-full px-6 py-4 border-2 border-primary text-primary shadow-sm flex items-center justify-center gap-2 font-extrabold cursor-pointer overflow-hidden'>
      <motion.div
        className='absolute bottom-0 z-0 left-0 bg-primary'
        initial='idle'
        variants={{
          idle: {
            width: "0%",
            height: "5%",
            transition: {
              height: { duration: 0.15, ease: "easeInOut" }, // height dulu
              width: { duration: 0.15, delay: 0.15, ease: "easeInOut" }, // widthsetelah height
            },
          },
          hover: {
            width: "100%",
            height: "100%",
            transition: {
              width: { duration: 0.15, ease: "easeInOut" },
              height: { duration: 0.15, delay: 0.15, ease: "easeInOut" }, //delay = durasi width
            },
          },
        }}
      />
      <div className='relative z-10 flex items-center group-hover:text-white transition-colors delay-100'>
        <SearchIcon className='h-4 w-4 mr-2' strokeWidth={3} /> Book Now
      </div>
    </motion.button>
  );
};

export default CustButton;
