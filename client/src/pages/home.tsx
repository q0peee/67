import React, { useEffect, useState } from "react";
import { useRandomImage, useTriggerNextImage } from "@/hooks/use-images";
import { GlitchText } from "@/components/glitch-text";
import { CreepyButton } from "@/components/creepy-button";
import { Typewriter } from "@/components/typewriter";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { data: image, isLoading, isError, isFetching } = useRandomImage();
  const triggerNext = useTriggerNextImage();
  const [showUI, setShowUI] = useState(true);

  // Randomly hide UI elements to increase uneasiness
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setShowUI(false);
        setTimeout(() => setShowUI(true), 150 + Math.random() * 500);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center cursor-crosshair">
      {/* Global Atmospherics */}
      <div className="scanlines" />
      <div className="vignette" />
      <div className="noise-bg" />

      {/* Main Container */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-2xl px-6">
        {/* Image Container */}
        <div className="w-full aspect-[4/3] relative overflow-hidden bg-black/50 border border-red-950/30 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-muted-foreground flex flex-col items-center gap-4 animate-pulse"
              >
                <EyeOff className="w-8 h-8 opacity-50" />
                <span className="font-mono text-xs uppercase tracking-[0.5em] opacity-50">Searching the void...</span>
              </motion.div>
            ) : isError ? (
              <motion.div 
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-primary flex flex-col items-center gap-4"
              >
                <AlertTriangle className="w-12 h-12 animate-flicker" />
                <GlitchText text="CONNECTION SEVERED" as="h2" className="text-2xl" />
              </motion.div>
            ) : image ? (
              <motion.div
                key={image.url}
                initial={{ opacity: 0, scale: 1.1, filter: "brightness(0)" }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  filter: "brightness(1)",
                  transition: { duration: 2, ease: "easeOut" } 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  filter: "brightness(0)",
                  transition: { duration: 0.5 } 
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <img 
                  src={image.url} 
                  alt={image.title || "Unknown entity"} 
                  className="max-w-full max-h-full object-contain unsettling-filter"
                  crossOrigin="anonymous"
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Text Area */}
        <div className="w-full text-center">
          <AnimatePresence mode="wait">
            {image && (
              <motion.div
                key={`text-${image.url}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center gap-2"
              >
                <Typewriter text={image.title || "UNIDENTIFIED ANOMALY"} />
                <p className="font-mono text-[9px] text-red-900/40 tracking-[0.3em] uppercase">
                  ORIGIN: {image.source || "VOID"}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* UI Overlay */}
      <div 
        className={`absolute inset-0 z-20 flex flex-col h-full w-full p-6 md:p-12 pointer-events-none transition-opacity duration-75 ${showUI ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Header */}
        <header className="flex justify-between items-start animate-flicker w-full">
          <div>
            <GlitchText 
              text="ARCHIVE.OBSCURA" 
              as="h1" 
              className="font-creepy text-2xl md:text-4xl text-red-900/60" 
            />
          </div>
          <div className="flex items-center gap-2 text-red-900/30 font-mono text-[10px] tracking-widest">
            <span className={`w-1.5 h-1.5 rounded-full ${isFetching ? 'bg-red-600 animate-pulse' : 'bg-red-900/30'}`} />
            FEED_ACTIVE
          </div>
        </header>

        {/* Footer Trigger */}
        <footer className="mt-auto pointer-events-auto flex justify-center md:justify-end">
          <CreepyButton 
            onClick={() => triggerNext()} 
            disabled={isFetching}
            className="w-full md:w-auto"
          >
            {isFetching ? "..." : "Next Sequence"}
          </CreepyButton>
        </footer>
      </div>

      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 opacity-5 select-none">
        <span className="font-creepy text-[10vw] text-red-600">
          STAY AWAY
        </span>
      </div>
    </div>
  );
}
