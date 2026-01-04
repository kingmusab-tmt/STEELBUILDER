import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin/",
          "/login/",
          "/unauthorized/",
          "/api/",
          "/_next/",
          "/private/",
          "/userDashboard/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: ["MJ12bot", "SemrushBot", "DotBot"],
        disallow: "/",
      },
    ],
    sitemap: "https://steelbuilders.com.ng/sitemap.xml",
    host: "https://steelbuilders.com.ng",
  };
}
