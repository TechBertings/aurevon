import type { CSSProperties } from "react";

// Paste the exact body of your current glow() from fx.tsx here.
// Placeholder version shown below; keep your original logic.
export function glow(at: string, opacity: number): CSSProperties {
  return {
    backgroundImage: `radial-gradient(60% 50% at ${at}, rgba(226,184,98,${opacity}), transparent 70%)`,
  };
}