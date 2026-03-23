"use client";

import Image from "next/image";
import logo from "@/public/images/logo.png";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import {
  Container,
  Paper,
  Box,
  Button,
  Typography,
  Alert,
  useTheme,
} from "@mui/material";
import LoadingSpinner from "../components/loadingSpinner";

function Login() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const { data: session } = useSession();

  const theme = useTheme();

  // Session redirection effect
  useEffect(() => {
    if (session) {
      const role = (session.user.role || "").toLowerCase();
      if (role === "admin") {
        router.push("/admin");
      } else {
        router.push("/userDashboard");
      }
    }
  }, [session, router]);

  // Clear error after timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");
    try {
      await signIn("google", { callbackUrl: "/login" });
    } catch (error) {
      setError("Failed to sign in with Google");
      setGoogleLoading(false);
    }
  };

  // Dont render if session exists (will redirect)
  if (session) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <LoadingSpinner />
      </Box>
    );
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            width: "100%",
            maxWidth: 1000,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          {/* Left Side - Branding */}
          <Box
            sx={{
              flex: 1,
              backgroundColor: "WhiteSmoke",
              color: "blue",
              display: { xs: "none", md: "flex" },
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              p: 4,
              gap: 3,
            }}
          >
            <Image
              src={logo}
              alt="Company Logo"
              width={120}
              height={120}
              style={{ objectFit: "contain" }}
            />
            <Typography variant="h4" fontWeight="bold" textAlign="center">
              Welcome Back!
            </Typography>
            <Typography variant="body1" textAlign="center">
              Sign in to access your account and continue your journey with us.
            </Typography>
          </Box>

          {/* Right Side - Login Form */}
          <Box
            sx={{
              flex: 1,
              p: { xs: 3, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {/* Mobile Logo */}
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Image
                src={logo}
                alt="Company Logo"
                width={80}
                height={80}
                style={{ objectFit: "contain" }}
              />
            </Box>

            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
              color="primary.main"
              textAlign={{ xs: "center", md: "left" }}
            >
              Sign In
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 4 }}
              textAlign={{ xs: "center", md: "left" }}
            >
              Continue with your Google account
            </Typography>

            <Box sx={{ width: "100%" }}>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                fullWidth
                variant="outlined"
                size="large"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                startIcon={
                  googleLoading ? (
                    <LoadingSpinner />
                  ) : (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                      style={{ display: "block" }}
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                    </svg>
                  )
                }
                sx={{
                  py: 1.5,
                  mb: 3,
                  fontSize: "1rem",
                }}
              >
                Sign in with Google
              </Button>

              <Box textAlign="center">
                <Typography variant="body1">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    style={{
                      color: theme.palette.primary.main,
                      textDecoration: "none",
                      fontWeight: "bold",
                    }}
                  >
                    Create an account
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default Login;
