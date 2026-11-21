import { Hanken_Grotesk, JetBrains_Mono, Unbounded } from "next/font/google";

/*
 * The site's type: Unbounded for display (the name, headings), Hanken Grotesk
 * for text, JetBrains Mono for small technical labels. Each sets a CSS
 * variable on <html> (see app/layout.tsx).
 */

export const unbounded = Unbounded({ subsets: ["latin"], variable: "--f-unbounded", display: "swap" });
export const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--f-hanken", display: "swap" });
// Only small labels use it, so it doesn't compete with the hero fonts for bandwidth
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--f-jetbrains",
  display: "swap",
  preload: false,
});

export const fontVariables = `${unbounded.variable} ${hanken.variable} ${jetbrains.variable}`;
