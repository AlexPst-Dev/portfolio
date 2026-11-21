import {
  Anybody,
  Archivo,
  Bricolage_Grotesque,
  Figtree,
  Geologica,
  Hanken_Grotesk,
  JetBrains_Mono,
  Martian_Mono,
  Unbounded,
} from "next/font/google";

/* One type pairing per proposal, so each reads as its own world. */

// 01 Pipeline: a width axis that stretches as each stage runs
export const archivo = Archivo({ subsets: ["latin"], axes: ["wdth"], variable: "--f-archivo", display: "swap" });
export const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--f-jetbrains", display: "swap" });

// 02 Conversation: optical sizes for big display lines next to chat text
export const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
  variable: "--f-bricolage",
  display: "swap",
});
export const figtree = Figtree({ subsets: ["latin"], variable: "--f-figtree", display: "swap" });

// 03 Étincelle: round, wide display that matches the spark character
export const unbounded = Unbounded({ subsets: ["latin"], variable: "--f-unbounded", display: "swap" });
export const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--f-hanken", display: "swap" });

// 04 Plan: sharpened grotesque and a measuring mono
export const geologica = Geologica({
  subsets: ["latin"],
  axes: ["SHRP", "CRSV"],
  variable: "--f-geologica",
  display: "swap",
});
export const martian = Martian_Mono({ subsets: ["latin"], axes: ["wdth"], variable: "--f-martian", display: "swap" });

// 05 Index: extreme width range for kinetic type
export const anybody = Anybody({ subsets: ["latin"], axes: ["wdth"], variable: "--f-anybody", display: "swap" });
