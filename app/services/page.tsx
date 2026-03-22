import type { Metadata } from "next";
import ServicesPageContent from "./components/ServicesPageContent";

// Enterprise-Level SEO Metadata
export const metadata: Metadata = {
  title:
    "Services | Steel Builders Technical Engineering Ltd - Industrial Machinery Solutions",
  description:
    "Steel Builders offers comprehensive industrial machinery services including fabrication, block molding machines, stone crushers, installation, maintenance, and technical support for businesses across Nigeria.",
  keywords: [
    "industrial machinery services",
    "block molding machine manufacturer",
    "stone crusher manufacturing",
    "machinery installation services",
    "industrial equipment maintenance",
    "fabrication services Nigeria",
    "machinery repair and maintenance",
    "technical support Nigeria",
    "industrial machinery installation",
    "machinery commissioning",
    "operator training",
    "equipment maintenance services",
    "custom fabrication Nigeria",
    "industrial solutions Lagos",
  ],
  authors: [{ name: "Steel Builders Technical Engineering Ltd" }],
  creator: "Steel Builders Technical Engineering Ltd",
  publisher: "Steel Builders Technical Engineering Ltd",
  applicationName: "Steel Builders Technical Engineering Ltd",
  category: "Industrial Services",
  classification: "Manufacturing and Engineering Services",
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
    url: "https://www.steelbuilderstechengltd.com.ng/services",
    siteName: "Steel Builders Technical Engineering Ltd",
    title:
      "Professional Industrial Machinery Services | Steel Builders Technical Engineering",
    description:
      "Comprehensive industrial machinery services from design to installation and ongoing support. Specializing in block molding machines, stone crushers, and custom fabrication solutions.",
    images: [
      {
        url: "/images/t7.webp",
        width: 1200,
        height: 630,
        alt: "Steel Builders industrial machinery manufacturing and installation services",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@steelbuilders",
    creator: "@steelbuilders",
    title:
      "Industrial Machinery Services | Steel Builders Technical Engineering Ltd",
    description:
      "Expert machinery fabrication, installation, and maintenance services. Serving industries across Nigeria with high-quality equipment solutions.",
    images: {
      url: "/images/t7.webp",
      alt: "Steel Builders services and equipment",
    },
  },
  alternates: {
    canonical: "https://www.steelbuilderstechengltd.com.ng/services",
    languages: {
      "en-NG": "https://www.steelbuilderstechengltd.com.ng/services",
      "en-US": "https://www.steelbuilderstechengltd.com.ng/services",
    },
  },
  other: {
    "geo.region": "NG-LA",
    "geo.placename": "Epe, Lagos State",
    "geo.position": "6.5795;3.9827",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
