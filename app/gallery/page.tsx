import type { Metadata } from "next";
import GalleryPageContent from "./components/GalleryPageContent";

export const metadata: Metadata = {
  title:
    "Gallery | Steel Builders Technical Engineering Ltd - Project Showcase",
  description:
    "Browse our gallery of industrial machinery projects, installations, and manufacturing work. See our block molding machines, stone crushers, and custom fabrication projects in action.",
  keywords: [
    "industrial machinery gallery",
    "block molding projects",
    "stone crusher installations",
    "manufacturing projects Nigeria",
    "machinery installations",
    "industrial equipment showcase",
    "fabrication projects",
    "construction machinery gallery",
  ],
  authors: [{ name: "Steel Builders Technical Engineering Ltd" }],
  creator: "Steel Builders Technical Engineering Ltd",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://steelbuilders.com.ng/gallery",
    siteName: "Steel Builders Technical Engineering Ltd",
    title: "Project Gallery | Steel Builders Technical Engineering",
    description:
      "Explore our portfolio of industrial machinery projects and installations across Nigeria.",
    images: [
      {
        url: "/images/t7.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Builders project gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Gallery | Steel Builders",
    description: "View our industrial machinery projects and installations.",
    images: {
      url: "/images/t7.jpg",
      alt: "Steel Builders gallery",
    },
  },
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
