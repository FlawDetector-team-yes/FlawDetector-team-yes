// app/sitemap.ts

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://flaw-detector-team-yes-seven.vercel.app";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: `${baseUrl}/vulnerability-db`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/me`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/doc/terms-of-service`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/doc/privacy-policy`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/me/my-profile`,
      lastModified: new Date(),
      priority: 0.64,
    },
    {
      url: `${baseUrl}/me/clip`,
      lastModified: new Date(),
      priority: 0.51,
    },
    {
      url: `${baseUrl}/me/setting`,
      lastModified: new Date(),
      priority: 0.51,
    },
  ];
}
