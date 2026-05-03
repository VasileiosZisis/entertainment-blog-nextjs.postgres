import type { MetadataRoute } from "next";
import { getAbsoluteUrl, SITE_ORIGIN } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login"],
    },
    sitemap: getAbsoluteUrl("/sitemap.xml"),
    host: SITE_ORIGIN,
  };
}
