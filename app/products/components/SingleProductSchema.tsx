"use client";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specifications?: string[];
  applications?: string[];
  features?: string[];
}

interface SingleProductSchemaProps {
  product: Product;
}

export default function SingleProductSchema({
  product,
}: SingleProductSchemaProps) {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://steelbuilders.com.ng/products#${product.id}`,
    name: product.name,
    description: product.description,
    image: product.image.startsWith("http")
      ? product.image
      : `https://steelbuilders.com.ng${product.image}`,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Steel Builders",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Steel Builders Technical Engineering Ltd",
      url: "https://steelbuilders.com.ng",
      logo: "https://steelbuilders.com.ng/images/logo.png",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "NGN",
      lowPrice: "1000000",
      highPrice: "50000000",
      availability: "https://schema.org/InStock",
      priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      url: "https://steelbuilders.com.ng/quote",
      seller: {
        "@type": "Organization",
        name: "Steel Builders Technical Engineering Ltd",
        url: "https://steelbuilders.com.ng",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "190",
      bestRating: "5",
      worstRating: "1",
    },
    additionalProperty: [
      ...(product.specifications || []).map((spec, index) => ({
        "@type": "PropertyValue",
        name: "Specification",
        value: spec,
        position: index + 1,
      })),
    ],
    applicationCategory: product.applications || [],
    featureList: product.features || [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
    />
  );
}
