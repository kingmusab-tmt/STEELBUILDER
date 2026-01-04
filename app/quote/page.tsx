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
};

export default function QuotePage() {
  return <QuotePageContent />;
}
