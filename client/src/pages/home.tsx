import React, { useEffect, useState } from "react";
import { useRandomImage, useTriggerNextImage } from "@/hooks/use-images";
import { GlitchText } from "@/components/glitch-text";
import { CreepyButton } from "@/components/creepy-button";
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

      {/* Main Image Container */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-black">
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
              initial={{ opacity: 0, scale: 1.2, filter: "brightness(0)" }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: "brightness(1)",
                transition: { duration: 3, ease: "easeOut" } 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.9, 
                filter: "brightness(0)",
                transition: { duration: 1 } 
              }}
              className="w-full h-full flex items-center justify-center"
            >
              {/* Fallback creepy image just in case url is broken, but relies on API */}
              <img 
                src={image.url} 
                alt={image.title || "Unknown entity"} 
                className="w-full h-full object-cover unsettling-filter animate-slow-zoom"
                crossOrigin="anonymous"
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* UI Overlay */}
      <div 
        className={`relative z-20 flex flex-col h-full w-full max-w-5xl mx-auto p-6 md:p-12 justify-between transition-opacity duration-75 ${showUI ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Header */}
        <header className="flex justify-between items-start animate-flicker w-full">
          <div>
            <GlitchText 
              text="ARCHIVE.OBSCURA" 
              as="h1" 
              className="font-creepy text-3xl md:text-5xl text-red-700/80 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]" 
            />
            <p className="font-mono text-xs text-muted-foreground tracking-widest mt-2 uppercase opacity-60">
              Auto-cycling sequence active
            </p>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground/40 font-mono text-[10px] tracking-widest">
            <span className={`w-2 h-2 rounded-full ${isFetching ? 'bg-primary animate-ping' : 'bg-muted-foreground'}`} />
            LIVE
          </div>
        </header>

        {/* Footer Controls & Meta */}
        <footer className="w-full flex flex-col md:flex-row items-end md:items-center justify-between gap-8 mt-auto">
          
          <div className="max-w-md w-full md:w-auto bg-black/40 p-4 border-l border-primary/30 backdrop-blur-sm">
            <AnimatePresence mode="wait">
              {image && (
                <motion.div
                  key={`meta-${image.url}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 1 }}
                >
                  <h3 className="font-mono text-sm md:text-base text-foreground/90 uppercase tracking-wider mb-1 line-clamp-2">
                    {image.title || "UNIDENTIFIED ANOMALY"}
                  </h3>
                  <p className="font-mono text-[10px] text-muted-foreground tracking-[0.2em] uppercase">
                    SOURCE: {image.source || "UNKNOWN ORIGIN"}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <CreepyButton 
            onClick={() => triggerNext()} 
            disabled={isFetching}
            className="w-full md:w-auto shrink-0"
          >
            {isFetching ? (
              <span className="flex items-center gap-3">
                <Eye className="w-4 h-4 animate-spin" />
                Manifesting...
              </span>
            ) : (
              "Reveal Next"
            )}
          </CreepyButton>
          
        </footer>
      </div>

      {/* Random eerie text that blinks in and out occasionally */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-30 mix-blend-overlay">
        <span className="font-creepy text-[15vw] text-primary/5 select-none animate-flicker">
          SEE YOU
        </span>
      </div>
    </div>
  );
}
