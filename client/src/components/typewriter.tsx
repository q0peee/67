import React, { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
}

export function Typewriter({ text, speed = 100 }: TypewriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    setDisplayedText("");
    setIndex(0);
    setIsDeleting(false);
    setErrorText("");
  }, [text]);

  useEffect(() => {
    if (!text) return;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Chance to make an error
        if (Math.random() < 0.05 && !errorText && index < text.length) {
          const randomChars = Math.random().toString(36).substring(7);
          setErrorText(randomChars);
          setDisplayedText(prev => prev + randomChars);
          return;
        }

        if (errorText) {
          setIsDeleting(true);
          return;
        }

        if (index < text.length) {
          setDisplayedText(prev => prev + text[index]);
          setIndex(prev => prev + 1);
        }
      } else {
        if (errorText.length > 0) {
          setErrorText(prev => prev.slice(0, -1));
          setDisplayedText(prev => prev.slice(0, -1));
        } else {
          setIsDeleting(false);
        }
      }
    }, speed + (Math.random() * 50));

    return () => clearTimeout(timeout);
  }, [index, text, isDeleting, errorText, speed]);

  return (
    <div className="font-mono text-xs md:text-sm text-red-700/80 min-h-[1.5em] tracking-wider uppercase">
      {displayedText}
      <span className="animate-pulse ml-1 border-r-2 border-red-700/80">&nbsp;</span>
    </div>
  );
}
