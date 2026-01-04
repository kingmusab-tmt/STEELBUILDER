"use client";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Link from "next/link";
import { Dashboard, Image, ShoppingCart, Home } from "@mui/icons-material";
import { useSession } from "next-auth/react";

const AdminDashboardHome = () => {
  const { data: session } = useSession();

  const adminSections = [
    {
      title: "Home Page Management",
      description:
        "Manage hero images, achievements, clients, and testimonials",
      icon: Home,
      link: "/admin/home",
      color: "#FF1493",
    },
    {
      title: "Products Management",
      description: "Add, edit, and delete products with images",
      icon: ShoppingCart,
      link: "/admin/products",
      color: "#008B8B",
    },
    {
      title: "Gallery Management",
      description: "Manage project gallery images",
      icon: Image,
      link: "/admin/gallery",
      color: "#FF6347",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Dashboard sx={{ fontSize: 40, color: "#008B8B" }} />
          <Typography variant="h3" sx={{ fontWeight: 700, color: "#FF1493" }}>
            Admin Dashboard
          </Typography>
        </Box>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: "1.1rem" }}
        >
          Welcome, {session?.user?.name || "Admin"}! Manage your Steelbuilder
          website content below.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          gap: 3,
        }}
      >
        {adminSections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <Box key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  border: `2px solid ${section.color}20`,
                  "&:hover": {
                    boxShadow: `0 8px 24px ${section.color}30`,
                    transform: "translateY(-4px)",
                    borderColor: section.color,
                  },
                }}
              >
                <CardContent
                  sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
                >
                  <Box sx={{ mb: 2 }}>
                    <IconComponent
                      sx={{
                        fontSize: 48,
                        color: section.color,
                      }}
                    />
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{ mb: 1, fontWeight: 600, color: section.color }}
                  >
                    {section.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3, flexGrow: 1 }}
                  >
                    {section.description}
                  </Typography>
                  <Link href={section.link} style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: section.color,
                        "&:hover": {
                          backgroundColor: section.color,
                          opacity: 0.9,
                        },
                      }}
                    >
                      Manage
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default AdminDashboardHome;
