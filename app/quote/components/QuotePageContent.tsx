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
  useTheme,
  alpha,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BreadcrumbNav from "@/app/components/BreadcrumbNav";

// Color Constants
const MAGENTA = "#c41e3a";
const BLUE_GREEN = "#008B8B";

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${MAGENTA} 0%, ${BLUE_GREEN} 100%)`,
  color: "white",
  padding: theme.spacing(12, 0, 8),
  position: "relative",
  overflow: "hidden",
  textAlign: "center",
}));

const FormCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[4],
  marginBottom: theme.spacing(4),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: MAGENTA,
  marginBottom: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  "&::before": {
    content: '""',
    width: 4,
    height: 30,
    backgroundColor: MAGENTA,
    borderRadius: 2,
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  fontSize: "1.1rem",
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  background: `linear-gradient(135deg, ${MAGENTA} 0%, ${BLUE_GREEN} 100%)`,
  color: "white",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[6],
  },
  "&:disabled": {
    opacity: 0.6,
  },
}));

interface QuoteFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  location: string;

  // Product/Service Details
  productCategory: string;
  productDescription: string;
  specifications: string;
  quantity: string;
  budget: string;

  // Requirements
  requirements: string[];
  customRequirements: string;

  // Additional Information
  timeline: string;
  additionalNotes: string;

  // Checkbox
  agreeToTerms: boolean;
}

export default function QuotePageContent() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const [formData, setFormData] = useState<QuoteFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    location: "",
    productCategory: "",
    productDescription: "",
    specifications: "",
    quantity: "",
    budget: "",
    requirements: [],
    customRequirements: "",
    timeline: "",
    additionalNotes: "",
    agreeToTerms: false,
  });

  const productCategories = [
    "Block Molding Machine",
    "Stone Crusher",
    "Fabrication Services",
    "Custom Engineering",
    "Machinery Installation",
    "Maintenance Services",
    "Other",
  ];

  const requirementsList = [
    "Installation Service",
    "Training Required",
    "Maintenance Support",
    "Custom Design",
    "Warranty Extension",
    "Technical Support",
  ];

  const timelineOptions = [
    "Urgent (1-2 weeks)",
    "Standard (2-4 weeks)",
    "Flexible (1-3 months)",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRequirementChange = (requirement: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.includes(requirement)
        ? prev.requirements.filter((r) => r !== requirement)
        : [...prev.requirements, requirement],
    }));
  };

  const validateForm = (): boolean => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.companyName ||
      !formData.productCategory ||
      !formData.productDescription
    ) {
      setSnackbar({
        open: true,
        message: "Please fill in all required fields",
        type: "error",
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbar({
        open: true,
        message: "Please enter a valid email address",
        type: "error",
      });
      return false;
    }

    if (!formData.agreeToTerms) {
      setSnackbar({
        open: true,
        message: "Please agree to our terms and conditions",
        type: "error",
      });
      return false;
    }

    return true;
  };

  const generateWhatsAppMessage = (): string => {
    const message = `
*NEW QUOTE REQUEST*

*Personal Information:*
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phoneNumber}
Company: ${formData.companyName}
Location: ${formData.location}

*Product/Service Details:*
Category: ${formData.productCategory}
Description: ${formData.productDescription}
Specifications: ${formData.specifications || "Not specified"}
Quantity: ${formData.quantity || "Not specified"}
Budget Range: ${formData.budget || "Not specified"}

*Requirements:*
${
  formData.requirements.length > 0
    ? formData.requirements.map((r) => `• ${r}`).join("\n")
    : "None specified"
}
${
  formData.customRequirements
    ? `\nCustom Requirements: ${formData.customRequirements}`
    : ""
}

*Timeline:* ${formData.timeline || "Not specified"}

*Additional Notes:*
${formData.additionalNotes || "None"}

---
This quote request was submitted from Steel Builders Website
Timestamp: ${new Date().toLocaleString("en-NG")}
    `;
    return message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const message = generateWhatsAppMessage();
      const encodedMessage = encodeURIComponent(message);
      const whatsappNumber = "2348136150837"; // Company WhatsApp number

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

      // Also send to backend for logging/record keeping
      const response = await fetch("/api/quote-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        // Open WhatsApp
        window.open(whatsappUrl, "_blank");

        // Show success message
        setSnackbar({
          open: true,
          message:
            "Thank you! Your quote request is being prepared. WhatsApp is opening...",
          type: "success",
        });

        // Reset form
        setTimeout(() => {
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            companyName: "",
            location: "",
            productCategory: "",
            productDescription: "",
            specifications: "",
            quantity: "",
            budget: "",
            requirements: [],
            customRequirements: "",
            timeline: "",
            additionalNotes: "",
            agreeToTerms: false,
          });
        }, 1500);
      } else {
        throw new Error("Failed to save quote request");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          "Error submitting quote. Please try again or contact us directly.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <BreadcrumbNav />

      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Request Your Custom Quote
          </Typography>
          <Typography
            variant="h6"
            sx={{ opacity: 0.9, maxWidth: 600, mx: "auto" }}
          >
            Tell us about your machinery needs and we'll prepare a personalized
            quote for you. Our team will follow up via WhatsApp.
          </Typography>
        </Container>
      </HeroSection>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          {/* Form Section */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <FormCard>
              <form onSubmit={handleSubmit}>
                {/* Section 1: Personal Information */}
                <SectionTitle>1. Personal Information</SectionTitle>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="First Name *"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Last Name *"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Email Address *"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number *"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Company Name *"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Location/City"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                {/* Section 2: Product/Service Details */}
                <SectionTitle>2. Product/Service Details</SectionTitle>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth required>
                      <InputLabel>Product/Service Category *</InputLabel>
                      <Select
                        name="productCategory"
                        value={formData.productCategory}
                        onChange={handleSelectChange}
                        label="Product/Service Category *"
                      >
                        {productCategories.map((category) => (
                          <MenuItem key={category} value={category}>
                            {category}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Product Description *"
                      name="productDescription"
                      value={formData.productDescription}
                      onChange={handleInputChange}
                      variant="outlined"
                      multiline
                      rows={4}
                      placeholder="Please describe what you need in detail"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Specifications/Requirements"
                      name="specifications"
                      value={formData.specifications}
                      onChange={handleInputChange}
                      variant="outlined"
                      multiline
                      rows={3}
                      placeholder="e.g., Capacity, Power, Size, Material, etc."
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Quantity"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      variant="outlined"
                      placeholder="e.g., 1, 5, 10 units"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Budget Range"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      variant="outlined"
                      placeholder="e.g., ₦500,000 - ₦1,000,000"
                    />
                  </Grid>
                </Grid>

                {/* Section 3: Additional Requirements */}
                <SectionTitle>3. Additional Services</SectionTitle>
                <Box sx={{ mb: 4 }}>
                  <FormGroup>
                    {requirementsList.map((requirement) => (
                      <FormControlLabel
                        key={requirement}
                        control={
                          <Checkbox
                            checked={formData.requirements.includes(
                              requirement
                            )}
                            onChange={() =>
                              handleRequirementChange(requirement)
                            }
                          />
                        }
                        label={requirement}
                      />
                    ))}
                  </FormGroup>
                  <TextField
                    fullWidth
                    label="Other Custom Requirements"
                    name="customRequirements"
                    value={formData.customRequirements}
                    onChange={handleInputChange}
                    variant="outlined"
                    multiline
                    rows={2}
                    sx={{ mt: 2 }}
                    placeholder="Any other specific needs?"
                  />
                </Box>

                {/* Section 4: Timeline & Additional Notes */}
                <SectionTitle>
                  4. Timeline & Additional Information
                </SectionTitle>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Required Timeline</InputLabel>
                      <Select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleSelectChange}
                        label="Required Timeline"
                      >
                        {timelineOptions.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}></Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Additional Notes"
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      variant="outlined"
                      multiline
                      rows={3}
                      placeholder="Any other information you'd like to share?"
                    />
                  </Grid>
                </Grid>

                {/* Agreement */}
                <Box sx={{ mb: 4 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                      />
                    }
                    label={
                      <Typography variant="body2">
                        I agree to share this information with Steel Builders
                        and receive a quote via WhatsApp. I understand that by
                        clicking submit, my request will be sent to WhatsApp. *
                      </Typography>
                    }
                  />
                </Box>

                {/* Submit Button */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  <SubmitButton
                    type="submit"
                    variant="contained"
                    endIcon={
                      loading ? (
                        <CircularProgress size={20} color="inherit" />
                      ) : (
                        <WhatsAppIcon />
                      )
                    }
                    disabled={loading}
                  >
                    {loading
                      ? "Processing..."
                      : "Send Quote Request via WhatsApp"}
                  </SubmitButton>
                </Box>
              </form>
            </FormCard>
          </Grid>

          {/* Sidebar: Info Cards */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Card sx={{ mb: 3, backgroundColor: alpha(MAGENTA, 0.05) }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  📋 How It Works
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: MAGENTA,
                        fontSize: "1.2rem",
                      }}
                    >
                      1.
                    </Typography>
                    <Typography variant="body2">
                      Fill in your details and project requirements
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: MAGENTA,
                        fontSize: "1.2rem",
                      }}
                    >
                      2.
                    </Typography>
                    <Typography variant="body2">
                      Click submit to open WhatsApp with your quote request
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: MAGENTA,
                        fontSize: "1.2rem",
                      }}
                    >
                      3.
                    </Typography>
                    <Typography variant="body2">
                      Our team reviews your request and sends you a detailed
                      quote
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mb: 3, backgroundColor: alpha(BLUE_GREEN, 0.05) }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  ✅ What We Need
                </Typography>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  <li>
                    <Typography variant="body2">
                      Clear project description
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">Your budget range</Typography>
                  </li>
                  <li>
                    <Typography variant="body2">Required timeline</Typography>
                  </li>
                  <li>
                    <Typography variant="body2">
                      Specific requirements
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body2">Contact information</Typography>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card sx={{ backgroundColor: alpha(MAGENTA, 0.1) }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                  📞 Need Immediate Help?
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  You can also contact us directly:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    color: MAGENTA,
                  }}
                >
                  WhatsApp: +234 813 615 0837
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    color: BLUE_GREEN,
                  }}
                >
                  Email: steelbuilderseng@gmail.com
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={snackbar.type === "success" ? 6000 : 4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.type}
          sx={{ width: "100%" }}
          icon={
            snackbar.type === "success" ? <CheckCircleIcon /> : <ErrorIcon />
          }
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Footer />
    </>
  );
}
