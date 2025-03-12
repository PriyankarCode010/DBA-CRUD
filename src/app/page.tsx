"use client";
import { LampContainer } from "@/components/ui/lamp";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaGoogle, FaXTwitter } from "react-icons/fa6";

export default function Home() {
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/home");
    } catch (error) {
      console.error(error);
    }
  };

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
          EZBLOG.com
          {/* <FaXTwitter className="z-50 text-white" /> */}
        </div>
      </motion.h1>
      {auth?.currentUser ? (
        <motion.button
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="py-2 px-7 text-center text-lg font-semibold text-white bg-blue-500 rounded-full flex justify-center items-center gap-2"
          onClick={()=>router.push('/home')}
        >
          Goto Home 
          {/* <FaGoogle className="text-white" /> */}
        </motion.button>
      ) : (
        <motion.button
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="py-2 px-7 text-center text-lg font-semibold text-white bg-blue-500 rounded-full flex justify-center items-center gap-2"
          onClick={signInWithGoogle}
        >
          Login with <FaGoogle className="text-white" />
        </motion.button>
      )}
    </LampContainer>
  );
}
