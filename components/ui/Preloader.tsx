"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsLoading(false), 500); // Small delay after 100%
                    return 100;
                }
                return prev + 1;
            });
        }, 25); // 100 steps * 25ms = 2500ms total

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ y: 0 }}
                    exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0b0e11] text-white"
                >
                    <motion.div
                        initial={{ opacity: 0.5, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                        className="mb-8 text-center"
                    >
                        <h1 className="text-5xl font-bold tracking-tighter sm:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Volex<span className="text-profit">Trade</span>
                        </h1>
                    </motion.div>

                    <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden relative">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-profit"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear" }}
                        />
                    </div>

                    <div className="mt-4 font-mono text-sm text-gray-500">
                        {progress}%
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
