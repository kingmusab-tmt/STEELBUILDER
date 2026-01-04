import type { Metadata } from "next";
import PrivacyPageContent from "./components/PrivacyPageContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Steel Builders Technical Engineering Ltd - Data Protection & Security",
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
    title: "Privacy Policy | Steel Builders Technical Engineering Ltd",
    description:
      "Our commitment to protecting your privacy and personal information. Learn about our data collection and security practices.",
    images: [
      {
        url: "/images/t7.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Builders Privacy Policy",
      },
    ],
  },
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
