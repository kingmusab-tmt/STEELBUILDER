import type { Metadata } from "next";
import HomePageContent from "./components/HomePageContent";

// Enterprise-Level SEO Metadata
export const metadata: Metadata = {
  title:
    "Steel Builders Technical Engineering Ltd - Leading Industrial Machinery Manufacturer in Nigeria",
  description:
    "Steel Builders Technical Engineering Ltd is Nigeria's premier industrial machinery manufacturer. We specialize in fabrication, installation, and maintenance of block molding machines, stone crushers, and industrial equipment. 600+ completed projects, 190+ clients, 800+ skilled engineers.",
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
    "machine installation Lagos",
    "fabrication company Nigeria",
    "industrial solutions Lagos",
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
    url: "https://steelbuilders.com.ng",
    siteName: "Steel Builders Technical Engineering Ltd",
    title:
      "Steel Builders Technical Engineering Ltd - Leading Industrial Machinery Manufacturer",
    description:
      "Nigeria's premier manufacturer of industrial machinery. Specializing in block molding machines, stone crushers, and custom fabrication with 600+ projects and 800+ skilled engineers.",
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
      "Steel Builders Technical Engineering Ltd - Industrial Machinery Experts",
    description:
      "Leading manufacturer of industrial machinery in Nigeria. 600+ projects, 190+ clients, 9+ years of excellence.",
    images: {
      url: "/images/t7.jpg",
      alt: "Steel Builders Technical Engineering Ltd Facility",
    },
  },
  alternates: {
    canonical: "https://steelbuilders.com.ng",
    languages: {
      "en-NG": "https://steelbuilders.com.ng",
      "en-US": "https://steelbuilders.com.ng",
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
    "contact:phone_number": "+234 813 615 0837",
    "contact:email": "steelbuilderseng@gmail.com",
  },
};

// Enhanced JSON-LD Structured Data for SEO (LocalBusiness Schema)
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://steelbuilders.com.ng",
  name: "Steel Builders Technical Engineering Ltd",
  legalName: "Steel Builders Technical Engineering Ltd",
  description:
    "Leading industrial machinery manufacturer in Nigeria specializing in block molding machines, stone crushers, and custom fabrication.",
  url: "https://steelbuilders.com.ng",
  telephone: "+234 813 615 0837",
  email: "steelbuilderseng@gmail.com",
  logo: "https://steelbuilders.com.ng/images/logo.png",
  image: "https://steelbuilders.com.ng/images/t7.jpg",
  foundingDate: "2015",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: "800+",
  },
  priceRange: "NGN1500000-NGN50000000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Epe Industrial Area",
    addressLocality: "Epe",
    addressRegion: "LA",
    postalCode: "106101",
    addressCountry: "NG",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "6.5795",
    longitude: "3.9827",
  },
  areaServed: [
    {
      "@type": "State",
      name: "Lagos",
      address: {
        "@type": "Country",
        name: "NG",
      },
    },
    {
      "@type": "State",
      name: "Ogun",
      address: {
        "@type": "Country",
        name: "NG",
      },
    },
    {
      "@type": "State",
      name: "Oyo",
      address: {
        "@type": "Country",
        name: "NG",
      },
    },
    {
      "@type": "State",
      name: "Abuja",
      address: {
        "@type": "Country",
        name: "NG",
      },
    },
    {
      "@type": "Country",
      name: "NG",
    },
  ],
  sameAs: [
    "https://www.facebook.com/steelbuilders",
    "https://www.instagram.com/steelbuilders",
    "https://www.twitter.com/steelbuilders",
    "https://www.linkedin.com/company/steel-builders",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+234 813 615 0837",
      contactType: "Sales",
      email: "steelbuilderseng@gmail.com",
      areaServed: "NG",
      availableLanguage: ["en"],
    },
    {
      "@type": "ContactPoint",
      telephone: "+234 813 615 0837",
      contactType: "Support",
      email: "steelbuilderseng@gmail.com",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "190",
    bestRating: "5",
    worstRating: "1",
  },
  potentialAction: {
    "@type": "TradeAction",
    name: "Request Quote",
    target: "https://steelbuilders.com.ng/quote",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomePageContent />
    </>
  );
}
