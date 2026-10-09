import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/** The design system's named type steps (--text-* in src/index.css). Listed so
 *  cn() treats text-display etc. as font sizes, not colors. */
const TYPE_STEPS = ["display", "eyebrow"]

const twMerge = extendTailwindMerge({
  extend: { theme: { text: TYPE_STEPS } },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
