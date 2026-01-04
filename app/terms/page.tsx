import type { Metadata } from "next";
import TermsPageContent from "./components/TermsPageContent";

export const metadata: Metadata = {
  title: "Terms of Service | Steel Builders Technical Engineering Ltd - Service Agreement",
  description:
    "Steel Builders Technical Engineering Ltd terms of service and conditions. Understand your rights and obligations when using our industrial machinery products and services in Nigeria.",
  keywords: [
    "terms of service",
    "service agreement",
    "Steel Builders terms",
    "terms and conditions",
    "user agreement",
    "service conditions Nigeria",
    "legal terms",
    "usage policy",
    "service terms",
    "customer agreement",
  ],
  openGraph: {
    title: "Terms of Service | Steel Builders Technical Engineering Ltd",
    description:
      "Our terms of service outline the rules and regulations for using Steel Builders' products and services.",
    images: [
      {
        url: "/images/t7.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Builders Terms of Service",
      },
    ],
  },
};

export default function TermsPage() {
  return <TermsPageContent />;
}
