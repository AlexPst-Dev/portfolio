/**
 * SEO note:
 * This file generates robots.txt with permissive crawl rules and sitemap reference.
 */
import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/app/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
