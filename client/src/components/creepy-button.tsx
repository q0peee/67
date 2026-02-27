import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CreepyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function CreepyButton({ children, className, onMouseEnter, onMouseLeave, ...props }: CreepyButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={cn(
        "relative px-8 py-3 bg-transparent border border-border text-muted-foreground uppercase tracking-[0.3em] text-sm",
        "transition-all duration-700 ease-out overflow-hidden group",
        "hover:border-primary hover:text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]",
        "active:scale-95 active:duration-100",
        className
      )}
      onMouseEnter={(e) => {
        setIsHovered(true);
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        onMouseLeave?.(e);
      }}
      {...props}
    >
      <div 
        className={cn(
          "absolute inset-0 bg-primary/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0",
          isHovered && "animate-flicker"
        )} 
      />
      <span className="relative z-10 font-mono">
        {children}
      </span>
      
      {/* Subtle blood drip effect on hover */}
      {isHovered && (
        <span className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_10px_#ff0000] animate-pulse" />
      )}
    </button>
  );
}
