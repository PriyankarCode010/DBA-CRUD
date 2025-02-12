"use client";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { FaGoogle, FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        <div className="text-9xl font-extrabold flex text-white/70">
          PESU-<FaXTwitter className="z-50 text-white" />  
        </div>
      </motion.h1>
      <motion.button
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="py-2 px-4 text-center text-xl font-medium text-white bg-blue-400 rounded-full flex justify-center items-center gap-2"
        >
        Login with <FaGoogle className="text-white" />
      </motion.button>
    </LampContainer>
  );
}
