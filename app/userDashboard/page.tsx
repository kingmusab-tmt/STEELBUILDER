"use client";

import React, { useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import {
  AccountCircle,
  Email,
  ExitToApp,
  Home,
  Business,
  PhotoLibrary,
  Engineering,
  Phone,
} from "@mui/icons-material";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { MAGENTA, BLUE_GREEN } from "@/app/theme/theme";

export default function UserDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  // Redirect admins to admin dashboard
  useEffect(() => {
    if (session?.user?.role === "Admin") {
      router.push("/admin");
    }
  }, [session, router]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  if (status === "loading") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          {/* Welcome Section */}
          <Paper
            elevation={3}
            sx={{
              p: 4,
              mb: 4,
              borderRadius: 3,
              background: "linear-gradient(135deg, #008B8B 0%, #20B2AA 100%)",
              color: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: MAGENTA,
                    fontSize: "2rem",
                  }}
                  src={session?.user?.image || undefined}
                >
                  {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Welcome, {session?.user?.name || "User"}!
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9, mt: 1 }}>
                    Your personalized dashboard
                  </Typography>
                </Box>
              </Box>
              <Button
                onClick={handleLogout}
                variant="contained"
                startIcon={<ExitToApp />}
                sx={{
                  bgcolor: MAGENTA,
                  "&:hover": { bgcolor: MAGENTA, opacity: 0.9 },
                  px: 3,
                  py: 1.5,
                }}
              >
                Logout
              </Button>
            </Box>
          </Paper>

          {/* User Information */}
          <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Account Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, 1fr)",
                },
                gap: 3,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AccountCircle sx={{ color: BLUE_GREEN, fontSize: 30 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Name
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {session?.user?.name || "Not provided"}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Email sx={{ color: BLUE_GREEN, fontSize: 30 }} />
                <Box>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {session?.user?.email || "Not provided"}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Quick Links */}
          <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Explore Our Services
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "repeat(2, 1fr)",
                  md: "repeat(4, 1fr)",
                },
                gap: 3,
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 4,
                  },
                }}
                onClick={() => router.push("/")}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Home sx={{ fontSize: 50, color: BLUE_GREEN, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Home
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    Visit our homepage
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 4,
                  },
                }}
                onClick={() => router.push("/products")}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Engineering
                    sx={{ fontSize: 50, color: BLUE_GREEN, mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Products
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    Browse our catalog
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 4,
                  },
                }}
                onClick={() => router.push("/gallery")}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <PhotoLibrary
                    sx={{ fontSize: 50, color: BLUE_GREEN, mb: 2 }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Gallery
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    View our work
                  </Typography>
                </CardContent>
              </Card>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 4,
                  },
                }}
                onClick={() => router.push("/contact")}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <Phone sx={{ fontSize: 50, color: BLUE_GREEN, mb: 2 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Contact
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 1 }}
                  >
                    Get in touch
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Paper>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
