import type { Metadata } from "next";
import ProductsPageContent from "./components/ProductsPageContent";

export const metadata: Metadata = {
  title:
    "Products | Steel Builders Technical Engineering Ltd - Industrial Machinery Catalog",
  description:
    "Browse our comprehensive catalog of industrial machinery products including block molding machines, stone crushers, paving stone equipment, and more. All products come with specifications, features, and applications.",
  keywords: [
    "industrial machinery products",
    "block molding machines",
    "stone crusher equipment",
    "paving stone machines",
    "industrial equipment catalog",
    "machinery specifications",
    "manufacturing equipment",
    "construction machinery",
    "concrete block machines",
  ],
  authors: [{ name: "Steel Builders Technical Engineering Ltd" }],
  creator: "Steel Builders Technical Engineering Ltd",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://steelbuilders.com.ng/products",
    siteName: "Steel Builders Technical Engineering Ltd",
    title: "Industrial Machinery Products Catalog",
    description:
      "Explore our range of industrial machinery products with detailed specifications and applications.",
    images: [
      {
        url: "/images/t7.jpg",
        width: 1200,
        height: 630,
        alt: "Steel Builders industrial machinery products",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industrial Machinery Products | Steel Builders",
    description:
      "Browse industrial equipment and machinery products with full specifications.",
    images: {
      url: "/images/t7.jpg",
      alt: "Steel Builders products",
    },
  },
};

export default function ProductsPage() {
  return <ProductsPageContent />;
}
