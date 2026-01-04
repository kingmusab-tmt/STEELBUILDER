"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  AppBar,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import { Logout, Home, Refresh } from "@mui/icons-material";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const AdminHeader = () => {
  const { data: session, update } = useSession();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleRefreshSession = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch("/api/auth/refresh-session", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to refresh session");
      }

      const data = await response.json();

      // Update the session in NextAuth
      await update({
        ...session,
        user: {
          ...session?.user,
          ...data.user,
        },
      });
    } catch (error) {
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#008B8B", boxShadow: 2 }}>
      <Container maxWidth="lg">
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", px: 0 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Link
              href="/admin"
              style={{
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "white",
              }}
            >
              <Home />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Admin Dashboard
              </Typography>
            </Link>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" sx={{ color: "white" }}>
              {session?.user?.name}
            </Typography>
            <Button
              onClick={handleRefreshSession}
              disabled={isRefreshing}
              variant="contained"
              startIcon={
                isRefreshing ? <CircularProgress size={20} /> : <Refresh />
              }
              sx={{
                backgroundColor: "#1E90FF",
                "&:hover": { backgroundColor: "#1E90FF", opacity: 0.9 },
                "&:disabled": { backgroundColor: "#1E90FF", opacity: 0.6 },
              }}
              title="Refresh session to get latest role from database"
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminHeader;
