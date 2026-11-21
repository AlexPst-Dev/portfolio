import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/site";

// Bump when the home page content changes, so crawlers know to come back
const LAST_CONTENT_UPDATE = new Date("2026-11-21");

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/`, lastModified: LAST_CONTENT_UPDATE }];
}
