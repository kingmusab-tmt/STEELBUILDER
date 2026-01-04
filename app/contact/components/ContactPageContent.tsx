"use client";

import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  Alert,
  Snackbar,
  IconButton,
  Divider,
  Card,
  CardContent,
  useTheme,
  alpha,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BreadcrumbNav from "@/app/components/BreadcrumbNav";
import Link from "next/link";

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(12, 0, 8),
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url(/images/t7.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.1,
    zIndex: 0,
  },
}));

const ContactCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "all 0.3s ease-in-out",
  borderRadius: theme.spacing(2),
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: theme.shadows[8],
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: 64,
  height: 64,
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  marginBottom: theme.spacing(2),
  "& svg": {
    fontSize: 32,
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: "1.1rem",
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[6],
  },
}));

const SocialIconButton = styled(IconButton)(({ theme }) => ({
  background: alpha(theme.palette.primary.main, 0.1),
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    transform: "scale(1.1)",
  },
}));

const MapContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "450px",
  borderRadius: theme.spacing(2),
  overflow: "hidden",
  boxShadow: theme.shadows[4],
  "& iframe": {
    width: "100%",
    height: "100%",
    border: "none",
  },
}));

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

export default function ContactPageContent() {
  const theme = useTheme();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: <PhoneIcon />,
      title: "Phone Number",
      content: "+234 813 615 0837",
      link: "tel:+2348136150837",
    },
    {
      icon: <EmailIcon />,
      title: "Email Address",
      content: "steelbuilderseng@gmail.com",
      link: "mailto:steelbuilderseng@gmail.com",
    },
    {
      icon: <LocationOnIcon />,
      title: "Office Address",
      content: "Epe, Lagos State, Nigeria",
      link: "https://maps.google.com/?q=Epe,Lagos+State,Nigeria",
    },
    {
      icon: <AccessTimeIcon />,
      title: "Business Hours",
      content: "Mon - Sat: 8:00 AM - 6:00 PM",
      link: null,
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = "Subject must be at least 3 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSnackbar({
        open: true,
        message: "Please fix the errors in the form",
        severity: "error",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // For now, we'll send via WhatsApp
      const whatsappMessage = `*New Contact Form Submission*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n*Subject:* ${formData.subject}\n\n*Message:*\n${formData.message}`;
      const whatsappUrl = `https://wa.me/2348136150837?text=${encodeURIComponent(
        whatsappMessage
      )}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, "_blank");

      setSnackbar({
        open: true,
        message:
          "Your message is being sent via WhatsApp. Thank you for contacting us!",
        severity: "success",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleWhatsAppClick = () => {
    const message =
      "Hello! I would like to inquire about your industrial machinery services.";
    const whatsappUrl = `https://wa.me/2348136150837?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <Header />
      <BreadcrumbNav />
      <Box sx={{ minHeight: "100vh", pt: 8 }}>
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                textAlign: "center",
                mb: 2,
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                maxWidth: "800px",
                mx: "auto",
                opacity: 0.95,
                fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
              }}
            >
              Have a project in mind? We&apos;re here to help. Contact us today
              for industrial machinery solutions.
            </Typography>
          </Container>
        </HeroSection>

        {/* Contact Information Cards */}
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {contactInfo.map((info, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                <ContactCard>
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      textAlign: "center",
                      p: 3,
                    }}
                  >
                    <IconWrapper>{info.icon}</IconWrapper>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {info.title}
                    </Typography>
                    {info.link ? (
                      <Typography
                        component="a"
                        href={info.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: theme.palette.text.secondary,
                          textDecoration: "none",
                          "&:hover": {
                            color: theme.palette.primary.main,
                            textDecoration: "underline",
                          },
                        }}
                      >
                        {info.content}
                      </Typography>
                    ) : (
                      <Typography color="text.secondary">
                        {info.content}
                      </Typography>
                    )}
                  </CardContent>
                </ContactCard>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Contact Form & Map Section */}
        <Container maxWidth="lg" sx={{ pb: 8 }}>
          <Grid container spacing={6}>
            {/* Contact Form */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  background: theme.palette.background.paper,
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 700, mb: 1 }}
                >
                  Send Us a Message
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </Typography>

                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <StyledTextField
                        fullWidth
                        label="Your Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        error={!!errors.name}
                        helperText={errors.name}
                        required
                        disabled={isSubmitting}
                      />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <StyledTextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!errors.email}
                        helperText={errors.email}
                        required
                        disabled={isSubmitting}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <StyledTextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        required
                        disabled={isSubmitting}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <StyledTextField
                        fullWidth
                        label="Subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        error={!!errors.subject}
                        helperText={errors.subject}
                        required
                        disabled={isSubmitting}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <StyledTextField
                        fullWidth
                        label="Your Message"
                        name="message"
                        multiline
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        error={!!errors.message}
                        helperText={errors.message}
                        required
                        disabled={isSubmitting}
                      />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                      <SubmitButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        endIcon={<SendIcon />}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </SubmitButton>
                    </Grid>
                  </Grid>
                </form>

                <Divider sx={{ my: 4 }} />

                {/* Social Media & Quick Contact */}
                <Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    Connect With Us
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                    <SocialIconButton
                      onClick={handleWhatsAppClick}
                      aria-label="WhatsApp"
                      sx={{
                        "&:hover": {
                          background: "#25D366",
                          color: "#fff",
                        },
                      }}
                    >
                      <WhatsAppIcon />
                    </SocialIconButton>
                    <Link
                      href="https://facebook.com/steelbuilders"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIconButton
                        aria-label="Facebook"
                        sx={{
                          "&:hover": {
                            background: "#1877F2",
                            color: "#fff",
                          },
                        }}
                      >
                        <FacebookIcon />
                      </SocialIconButton>
                    </Link>
                    <Link
                      href="https://instagram.com/steelbuilders"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <SocialIconButton
                        aria-label="Instagram"
                        sx={{
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                            color: "#fff",
                          },
                        }}
                      >
                        <InstagramIcon />
                      </SocialIconButton>
                    </Link>
                  </Box>
                  <Button
                    variant="outlined"
                    startIcon={<WhatsAppIcon />}
                    fullWidth
                    onClick={handleWhatsAppClick}
                    sx={{
                      borderColor: "#25D366",
                      color: "#25D366",
                      "&:hover": {
                        borderColor: "#25D366",
                        background: alpha("#25D366", 0.1),
                      },
                    }}
                  >
                    Chat on WhatsApp
                  </Button>
                </Box>
              </Paper>
            </Grid>

            {/* Map */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontWeight: 700, mb: 3 }}
                >
                  Our Location
                </Typography>
                <MapContainer>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.1234567890123!2d3.9827!3d6.5795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzQnNDYuMiJOIDPCsDU4JzU3LjciRQ!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Steel Builders Technical Engineering Ltd Location"
                  />
                </MapContainer>

                {/* Additional Info */}
                <Paper elevation={2} sx={{ mt: 3, p: 3, borderRadius: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Visit Our Facility
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    We welcome site visits by appointment. See our manufacturing
                    processes, quality control measures, and completed machinery
                    firsthand.
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    <strong>Address:</strong> Epe, Lagos State, Nigeria
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Directions:</strong> Located in the industrial area
                    of Epe, easily accessible from Lagos-Epe Expressway.
                  </Typography>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Why Contact Us Section */}
        <Box
          sx={{ background: alpha(theme.palette.primary.main, 0.03), py: 8 }}
        >
          <Container maxWidth="lg">
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{ fontWeight: 700, mb: 6 }}
            >
              Why Choose Steel Builders?
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: "Expert Consultation",
                  description:
                    "Get professional advice from our experienced engineers on the best machinery solutions for your needs.",
                },
                {
                  title: "Custom Solutions",
                  description:
                    "We design and fabricate machinery tailored to your specific requirements and production goals.",
                },
                {
                  title: "Quick Response",
                  description:
                    "We respond to all inquiries within 24 hours and provide detailed quotes promptly.",
                },
                {
                  title: "Ongoing Support",
                  description:
                    "Benefit from our comprehensive after-sales service, maintenance, and technical support.",
                },
              ].map((item, index) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
}
