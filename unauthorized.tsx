"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.png"; // Your logo path
import { signOut, useSession } from "next-auth/react";
import { Logout } from "@mui/icons-material";

export default function Unauthorized() {
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        py: 8,
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 4 }}>
        <Image
          src={Logo}
          alt="SABAMUENT Logo"
          width={150}
          height={150}
          priority
        />
      </Box>

      {/* Error Message */}
      <Typography
        variant="h3"
        component="h5"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        401 - Unauthorized
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, maxWidth: 500 }}
      >
        You don&apos;t have permission to access this page. Please sign in or
        contact your administrator.
      </Typography>
      <Button
        onClick={handleLogout}
        variant="contained"
        startIcon={<Logout />}
        sx={{
          backgroundColor: "#FF1493",
          "&:hover": { backgroundColor: "#FF1493", opacity: 0.9 },
        }}
      >
        Logout
      </Button>
      {/* Action Buttons */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link href="/login" passHref>
          <Button component="a" variant="contained" size="large">
            Sign In
          </Button>
        </Link>

        <Link href="/" passHref>
          <Button component="a" variant="outlined" size="large">
            Return Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
}

export const metadata = {
  title: "Unauthorized Access | SABAMUENT",
  description: "You need proper permissions to access this resource",
};
