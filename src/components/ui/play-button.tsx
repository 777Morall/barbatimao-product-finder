
import * as React from "react";
import { cn } from "@/lib/utils";

interface PlayButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
}

const PlayButton = React.forwardRef<HTMLButtonElement, PlayButtonProps>(
  ({ className, size = "md", variant = "primary", ...props }, ref) => {
    return (
      <button
        className={cn(
          "relative rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2",
          {
            "bg-primary text-white": variant === "primary",
            "bg-secondary text-primary": variant === "secondary",
            "bg-transparent border-2 border-primary/80 text-primary": variant === "outline",
            "w-10 h-10": size === "sm",
            "w-14 h-14": size === "md",
            "w-20 h-20": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      >
        <span className="sr-only">Play</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={cn("transition-transform", {
            "w-5 h-5 translate-x-0.5": size === "sm",
            "w-6 h-6 translate-x-0.5": size === "md",
            "w-8 h-8 translate-x-1": size === "lg",
          })}
        >
          <path
            fillRule="evenodd"
            d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    );
  }
);

PlayButton.displayName = "PlayButton";

export { PlayButton };
