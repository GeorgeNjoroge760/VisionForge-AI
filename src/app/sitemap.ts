import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const publicPages = [
    "",
    "/features",
    "/pricing",
    "/about",
    "/blog",
  ];

  return publicPages.map((page) => ({
    url: `${SITE_CONFIG.url}${page}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: page === "" ? 1 : 0.8,
  }));
}
