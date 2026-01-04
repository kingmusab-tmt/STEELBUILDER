"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, Container, Typography } from "@mui/material";
import { Home, NavigateNext } from "@mui/icons-material";
import { BLUE_GREEN } from "../theme/theme";

// Map of path segments to readable names
const pathNameMap: { [key: string]: string } = {
  products: "Products",
  services: "Services",
  about: "About Us",
  contact: "Contact",
  gallery: "Gallery",
  quote: "Request Quote",
  admin: "Admin",
  "admin/home": "Home Management",
  "admin/products": "Product Management",
  "admin/gallery": "Gallery Management",
  "admin/quotes": "Quote Management",
};

export default function BreadcrumbNav() {
  const pathname = usePathname();

  // Don't show breadcrumbs on homepage or login
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/unauthorized"
  ) {
    return null;
  }

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = [
    { name: "Home", path: "/" },
    ...pathSegments.map((segment, index) => {
      const path = "/" + pathSegments.slice(0, index + 1).join("/");
      const name =
        pathNameMap[pathSegments.slice(0, index + 1).join("/")] ||
        segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      return { name, path };
    }),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://steelbuilders.com.ng${crumb.path}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          borderBottom: "1px solid #e0e0e0",
          py: 1.5,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 0.5,
            }}
          >
            {breadcrumbs.map((crumb, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {index > 0 && (
                  <NavigateNext
                    sx={{ fontSize: "1.2rem", color: "text.secondary" }}
                  />
                )}
                {index === 0 ? (
                  <Link
                    href={crumb.path}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Home sx={{ fontSize: "1.2rem", color: BLUE_GREEN }} />
                    <Typography
                      variant="body2"
                      sx={{
                        color: BLUE_GREEN,
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {crumb.name}
                    </Typography>
                  </Link>
                ) : index === breadcrumbs.length - 1 ? (
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.primary",
                      fontWeight: 600,
                    }}
                  >
                    {crumb.name}
                  </Typography>
                ) : (
                  <Link href={crumb.path} style={{ textDecoration: "none" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: BLUE_GREEN,
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      {crumb.name}
                    </Typography>
                  </Link>
                )}
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </>
  );
}
