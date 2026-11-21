import type { MetadataRoute } from "next";
import { SITE_URL } from "@/app/lib/site";

// Everything may be crawled
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
