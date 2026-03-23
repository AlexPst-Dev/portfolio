/**
 * SEO note:
 * This file generates robots.txt with permissive crawl rules and sitemap reference.
 */
import type { MetadataRoute } from "next";

const BASE_URL = "https://www.portfolio.alx-pst.tech";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
