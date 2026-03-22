import type { Metadata } from "next";
import QuotePageContent from "./components/QuotePageContent";

export const metadata: Metadata = {
  title:
    "Request Quote | Steel Builders Technical Engineering Ltd - Get Your Machinery Quote",
  description:
    "Request a quote from Steel Builders for industrial machinery solutions. Get detailed quotes for block molding machines, stone crushers, fabrication services, and custom engineering solutions.",
  keywords: [
    "machinery quote",
    "block molding machine quote",
    "stone crusher quote",
    "fabrication quote",
    "industrial machinery price",
    "quote request form",
    "machinery consultation",
    "custom fabrication quote",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.steelbuilderstechengltd.com.ng/quote",
    siteName: "Steel Builders Technical Engineering Ltd",
    title: "Request Quote | Steel Builders Technical Engineering Ltd",
    description:
      "Request a quote for industrial machinery, fabrication services, and custom engineering solutions.",
    images: [
      {
        url: "/images/t7.webp",
        width: 1200,
        height: 630,
        alt: "Request a quote from Steel Builders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request Quote | Steel Builders",
    description:
      "Get pricing and project estimates for industrial machinery and fabrication services.",
    images: {
      url: "/images/t7.webp",
      alt: "Steel Builders quote request",
    },
  },
  alternates: {
    canonical: "https://www.steelbuilderstechengltd.com.ng/quote",
  },
};

export default function QuotePage() {
  return <QuotePageContent />;
}
