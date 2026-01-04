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

interface ProductSchemaProps {
  products: Product[];
}

export default function ProductSchema({ products }: ProductSchemaProps) {
  // Generate ItemList schema for all products
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
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
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "NGN",
          lowPrice: "1000000",
          highPrice: "50000000",
          offerCount: 1,
          offers: {
            "@type": "Offer",
            url: "https://steelbuilders.com.ng/quote",
            priceCurrency: "NGN",
            availability: "https://schema.org/InStock",
            priceValidUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0],
            seller: {
              "@type": "Organization",
              name: "Steel Builders Technical Engineering Ltd",
            },
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "190",
          bestRating: "5",
          worstRating: "1",
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
    />
  );
}
