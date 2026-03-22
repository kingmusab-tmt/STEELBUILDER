import type { Metadata } from "next";
import ContactPageContent from "./components/ContactPageContent";

// Enterprise-Level SEO Metadata
export const metadata: Metadata = {
  title:
    "Contact Us | Steel Builders Technical Engineering Ltd - Get in Touch for Industrial Machinery Solutions",
  description:
    "Contact Steel Builders Technical Engineering Ltd for industrial machinery solutions. Visit us at Local Government, Epe along epe-ikorodu road behind conoil filling station lagos Nigeria Epe, Lagos 105101, Lagos. Call +234 813 553 3480, +234 814 534 9351 or email steelbuilderstechnicalengineer@gmail.com. Get quotes for block molding machines, stone crushers, and custom fabrication.",
  keywords: [
    "contact Steel Builders Nigeria",
    "industrial machinery quote Lagos",
    "block molding machine price",
    "stone crusher consultation Nigeria",
    "machinery fabrication inquiry",
    "Steel Builders contact information",
    "industrial equipment Lagos",
    "engineering consultation Nigeria",
    "machinery installation quote",
    "custom fabrication inquiry",
    "Steel Builders Epe Lagos",
    "industrial machinery support",
    "machinery maintenance contact",
    "fabrication services Lagos",
    "block making machine consultation",
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
    url: "https://www.steelbuilderstechengltd.com.ng/contact",
    siteName: "Steel Builders Technical Engineering Ltd",
    title:
      "Contact Steel Builders Technical Engineering Ltd - Industrial Machinery Experts in Lagos, Nigeria",
    description:
      "Get in touch with Steel Builders Technical Engineering Ltd for industrial machinery solutions. Located in Epe, Lagos State. Call +234 813 553 3480, +234 814 534 9351 for block molding machines, stone crushers, and custom fabrication services.",
    images: [
      {
        url: "/images/t7.webp",
        width: 1200,
        height: 630,
        alt: "Steel Builders Technical Engineering Ltd - Contact Our Industrial Machinery Experts",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@steelbuilders",
    creator: "@steelbuilders",
    title:
      "Contact Steel Builders Technical Engineering Ltd - Industrial Machinery Solutions",
    description:
      "Reach out to Steel Builders for industrial machinery solutions. Local Government, Epe along epe-ikorodu road behind conoil filling station lagos Nigeria Epe, Lagos 105101, Lagos. Call +234 813 553 3480, +234 814 534 9351 for quotes and consultations.",
    images: {
      url: "/images/t7.webp",
      alt: "Steel Builders Technical Engineering Ltd Contact",
    },
  },
  alternates: {
    canonical: "https://www.steelbuilderstechengltd.com.ng/contact",
    languages: {
      "en-NG": "https://www.steelbuilderstechengltd.com.ng/contact",
      "en-US": "https://www.steelbuilderstechengltd.com.ng/contact",
    },
  },
  other: {
    "geo.region": "NG-LA",
    "geo.placename": "Epe, Lagos State",
    "geo.position": "6.5795;3.9827",
    "contact:phone_number": "+234 813 553 3480, +234 814 534 9351",
    "contact:email": "steelbuilderstechnicalengineer@gmail.com",
    "contact:street_address": "Epe",
    "contact:locality": "Lagos State",
    "contact:country_name": "Nigeria",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
