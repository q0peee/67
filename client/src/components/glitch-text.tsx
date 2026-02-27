import React from "react";
import { cn } from "@/lib/utils";

interface GlitchTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p";
}

export function GlitchText({ text, as: Component = "span", className, ...props }: GlitchTextProps) {
  return (
    <div className={cn("glitch-wrapper inline-block", className)}>
      <Component 
        className="glitch-text" 
        data-text={text}
        {...props}
      >
        {text}
      </Component>
    </div>
  );
}
