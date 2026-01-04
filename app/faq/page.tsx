import type { Metadata } from "next";
import FAQPageContent from "./components/FAQPageContent";

export const metadata: Metadata = {
  title:
    "FAQ | Steel Builders Technical Engineering Ltd - Frequently Asked Questions",
  description:
    "Get answers to frequently asked questions about Steel Builders' industrial machinery, block molding machines, stone crushers, installation, maintenance, pricing, and support services in Nigeria.",
  keywords: [
    "industrial machinery FAQ",
    "block molding machine questions",
    "stone crusher FAQ",
    "machinery installation questions",
    "industrial equipment support",
    "Steel Builders FAQ Nigeria",
    "machinery pricing questions",
    "equipment maintenance FAQ",
    "industrial machinery support",
    "fabrication services FAQ",
  ],
  openGraph: {
    title: "Frequently Asked Questions | Steel Builders",
    description:
      "Find answers to common questions about industrial machinery, installation, maintenance, and support services.",
    images: [
      {
        url: "/images/t7.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Builders FAQ",
      },
    ],
  },
};

export default function FAQPage() {
  return <FAQPageContent />;
}
