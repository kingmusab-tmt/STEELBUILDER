import type { Metadata } from "next";
import AboutPageContent from "./components/AboutPageContent";

// Enterprise-Level SEO Metadata
export const metadata: Metadata = {
  title:
    "About Us | Steel Builders Technical Engineering Ltd - Leading Industrial Machinery Manufacturer in Nigeria",
  description:
    "Steel Builders Technical Engineering Ltd is Nigeria's premier industrial machinery manufacturer. We specialize in fabrication, installation, and maintenance of block molding machines, stone crushers, and industrial equipment. Located in Lagos with 9+ years of experience and 600+ successful projects.",
  keywords: [
    "industrial machinery Nigeria",
    "block molding machine manufacturer",
    "stone crusher machine Lagos",
    "industrial equipment fabrication",
    "machinery installation Nigeria",
    "steel fabrication Lagos",
    "industrial clamps Nigeria",
    "paving stone machine",
    "locally built machinery Nigeria",
    "engineering company Lagos",
    "Steel Builders Technical Engineering",
    "industrial machinery maintenance",
    "material handling equipment",
    "custom fabrication Nigeria",
    "West Africa industrial machinery",
  ],
  authors: [{ name: "Steel Builders Technical Engineering Ltd" }],
  creator: "Steel Builders Technical Engineering Ltd",
  publisher: "Steel Builders Technical Engineering Ltd",
  applicationName: "Steel Builders Technical Engineering Ltd",
  category: "Industrial Manufacturing",
  classification: "Engineering and Manufacturing",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://steelbuilders.com.ng/about",
    siteName: "Steel Builders Technical Engineering Ltd",
    title:
      "About Steel Builders Technical Engineering Ltd - Nigeria's Leading Industrial Machinery Manufacturer",
    description:
      "Discover Steel Builders Technical Engineering Ltd, Nigeria's premier manufacturer of industrial machinery. Specializing in block molding machines, stone crushers, and custom fabrication with 9+ years of excellence, 600+ projects, and 800+ skilled engineers.",
    images: [
      {
        url: "/images/t7.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Builders Technical Engineering Ltd - Industrial Machinery Manufacturing Facility",
        type: "image/jpeg",
      },
      {
        url: "/images/t1.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Builders Industrial Projects and Machinery",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@steelbuilders",
    creator: "@steelbuilders",
    title:
      "About Steel Builders Technical Engineering Ltd - Industrial Machinery Experts",
    description:
      "Nigeria's leading manufacturer of industrial machinery. We fabricate, install, and maintain block molding machines, stone crushers, and industrial equipment. 9+ years of excellence.",
    images: {
      url: "/images/t7.jpg",
      alt: "Steel Builders Technical Engineering Ltd Facility",
    },
  },
  alternates: {
    canonical: "https://steelbuilders.com.ng/about",
    languages: {
      "en-NG": "https://steelbuilders.com.ng/about",
      "en-US": "https://steelbuilders.com.ng/about",
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  other: {
    "geo.region": "NG-LA",
    "geo.placename": "Epe, Lagos State",
    "geo.position": "6.5795;3.9827",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
