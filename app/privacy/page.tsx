import type { Metadata } from "next";
import PrivacyPageContent from "./components/PrivacyPageContent";

export const metadata: Metadata = {
  title:
    "Privacy Policy | Steel Builders Technical Engineering Ltd - Data Protection & Security",
  description:
    "Steel Builders Technical Engineering Ltd privacy policy. Learn how we collect, use, protect and manage your personal information when you use our website and services in Nigeria.",
  keywords: [
    "privacy policy",
    "data protection",
    "Steel Builders privacy",
    "personal information security",
    "GDPR compliance Nigeria",
    "data privacy policy",
    "customer data protection",
    "information security",
    "privacy statement",
    "data handling policy",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.steelbuilderstechengltd.com.ng/privacy",
    siteName: "Steel Builders Technical Engineering Ltd",
    title: "Privacy Policy | Steel Builders Technical Engineering Ltd",
    description:
      "Our commitment to protecting your privacy and personal information. Learn about our data collection and security practices.",
    images: [
      {
        url: "/images/t7.webp",
        width: 1200,
        height: 630,
        alt: "Steel Builders Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Steel Builders Technical Engineering Ltd",
    description:
      "Learn how Steel Builders collects, protects, and manages your personal information.",
    images: {
      url: "/images/t7.webp",
      alt: "Steel Builders Privacy Policy",
    },
  },
  alternates: {
    canonical: "https://www.steelbuilderstechengltd.com.ng/privacy",
  },
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
