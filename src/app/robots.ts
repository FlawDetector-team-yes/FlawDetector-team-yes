import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://flaw-detector-team-yes-seven.vercel.app/sitemap.xml",
  };
}

/*
User-Agent: *
Allow: /
Disallow: /private/
Sitemap: https://flaw-detector-team-yes-seven.vercel.app//sitemap.xml
*/
