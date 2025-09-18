"use client";

import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import {
  Construction,
  Engineering,
  Settings,
  Factory,
  Build,
  PrecisionManufacturing,
  ArrowForward,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import Image from "next/image";

// Custom color definitions
const MAGENTA = "#E3007E";
const BLUE_GREEN = "#00B3B3";
const GOLD = "#FFD700";
const LIGHT_MAGENTA = "#f062a7";

// Hero background images (replace with your actual images)
const heroImages = [
  "/images/t7.jpg",
  "/images/t8.jpg",
  "/images/t9.jpg",
  "/images/t10.jpg",
  "/images/t11.jpg",
  "/images/t12.jpg",
  "/images/t13.jpg",
  "/images/t14.jpg",
  "/images/t15.jpg",
  "/images/t16.jpg",
  "/images/t17.jpg",
];

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Auto-rotate hero background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Add this inside your component function
  useEffect(() => {
    const animateNumbers = () => {
      const numberElements = document.querySelectorAll(".achievement-number");

      numberElements.forEach((element) => {
        const target = parseInt(element.getAttribute("data-target") || "0");
        const increment = Math.ceil(target / 100);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current > target) {
            element.textContent = `${target}+`;
            clearInterval(timer);
          } else {
            element.textContent = `${current}+`;
          }
        }, 20);
      });
    };

    // Use Intersection Observer to trigger animation when section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumbers();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const achievementsSection = document.getElementById("achievements");
    if (achievementsSection) {
      observer.observe(achievementsSection);
    }

    return () => {
      if (achievementsSection) {
        observer.unobserve(achievementsSection);
      }
    };
  }, []);

  // Smooth scrolling function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const services = [
    {
      icon: <Construction sx={{ fontSize: 40, color: BLUE_GREEN }} />,
      title: "Custom Steel Fabrication",
      description:
        "Bespoke fabrication services to turn your designs into high-quality, precision-engineered steel components.",
      details: "/services/fabrication",
    },
    {
      icon: <Engineering sx={{ fontSize: 40, color: MAGENTA }} />,
      title: "Plasma & Laser Cutting",
      description:
        "Precise cuts on various thicknesses of steel plate with clean edges and tight tolerances.",
      details: "/services/cutting",
    },
    {
      icon: <Settings sx={{ fontSize: 40, color: GOLD }} />,
      title: "Welding & Assembly",
      description:
        "Professional MIG, TIG, and stick welding services for complex structures and components.",
      details: "/services/welding",
    },
    {
      icon: <Factory sx={{ fontSize: 40, color: BLUE_GREEN }} />,
      title: "Bending & Rolling",
      description:
        "Custom shaping of steel sheets, plates, and beams for architectural and industrial needs.",
      details: "/services/bending",
    },
    {
      icon: <Build sx={{ fontSize: 40, color: MAGENTA }} />,
      title: "Galvanizing & Finishing",
      description:
        "Protective hot-dip galvanizing and finishing services, including painting and powder coating.",
      details: "/services/finishing",
    },
    {
      icon: <PrecisionManufacturing sx={{ fontSize: 40, color: GOLD }} />,
      title: "Installation & Maintenance",
      description:
        "Professional installation and maintenance services for all industrial machinery.",
      details: "/services/installation",
    },
  ];

  const achievements = [
    { number: "600+", label: "Completed projects" },
    { number: "190+", label: "Customers and partners" },
    { number: "800+", label: "Employees" },
    { number: "9+", label: "Years of expertise" },
  ];

  const galleryItems = [
    { image: "/images/t1.jpg", title: "Industrial Machinery Fabrication" },
    { image: "/images/t2.jpg", title: "Precision Cutting Workshop" },
    { image: "/images/t3.jpg", title: "Large Scale Installation" },
    { image: "/images/t4.jpg", title: "Custom Steel Components" },
    { image: "/images/t5.jpg", title: "Quality Control Process" },
    { image: "/images/t6.jpg", title: "Finished Product Showcase" },
  ];

  return (
    <Box>
      <Header />
      {/* Hero Section - Full Viewport Height */}
      <Box
        id="hero"
        sx={{
          height: "100vh",
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImages[currentHeroImage]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Navigation Arrows for Hero */}
        <IconButton
          sx={{
            position: "absolute",
            left: 20,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: MAGENTA },
          }}
          onClick={() =>
            setCurrentHeroImage(
              (currentHeroImage - 1 + heroImages.length) % heroImages.length
            )
          }
        >
          <NavigateBefore />
        </IconButton>
        <IconButton
          sx={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: MAGENTA },
          }}
          onClick={() =>
            setCurrentHeroImage((currentHeroImage + 1) % heroImages.length)
          }
        >
          <NavigateNext />
        </IconButton>

        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: isMobile ? "2.5rem" : "3.5rem",
              fontWeight: "bold",
              mb: 2,
              background: `linear-gradient(45deg, ${MAGENTA}, ${BLUE_GREEN})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Steel Builders Technical Engineering Ltd
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, maxWidth: 800, mx: "auto" }}>
            Leading experts in fabrication, installation, and maintenance of
            industrial machinery
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => scrollToSection("services")}
              sx={{
                backgroundColor: MAGENTA,
                "&:hover": { backgroundColor: "#c1006a" },
                px: 4,
                py: 1.5,
              }}
            >
              Request for Quote
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => scrollToSection("contact")}
              sx={{
                color: "white",
                borderColor: BLUE_GREEN,
                "&:hover": {
                  borderColor: BLUE_GREEN,
                  backgroundColor: "rgba(0, 179, 179, 0.1)",
                },
                px: 4,
                py: 1.5,
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Container>

        {/* Scroll Indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 40,
            animation: "bounce 2s infinite",
            cursor: "pointer",
          }}
          onClick={() => scrollToSection("services")}
        >
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRight: "2px solid white",
              borderBottom: "2px solid white",
              transform: "rotate(45deg)",
            }}
          />
        </Box>
      </Box>

      {/* About Section */}
      <Box
        id="about"
        sx={{
          backgroundColor: "#f9f9f9",
          py: 8,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            {/* Corrected Grid item props */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  mb: 3,
                  color: BLUE_GREEN,
                  fontWeight: "bold",
                }}
              >
                About Us
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, fontSize: "1.1rem", textAlign: "justify" }}
              >
                Steel Builders Technical Engineering Ltd is a leading provider
                of industrial machinery solutions. With years of experience in
                fabrication, installation, and maintenance, we deliver
                high-quality products and services to industries across the
                region.
              </Typography>
              <Typography
                variant="body1"
                sx={{ mb: 3, fontSize: "1.1rem", textAlign: "justify" }}
              >
                Our team of skilled engineers and technicians are committed to
                excellence, ensuring that every project meets the highest
                standards of quality and safety.
              </Typography>
              <Button
                variant="contained"
                size="large"
                onClick={() => scrollToSection("contact")}
                sx={{
                  backgroundColor: MAGENTA,
                  "&:hover": { backgroundColor: "#c1006a" },
                  px: 4,
                  py: 1.5,
                }}
              >
                Contact Us
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: 300,
                  // backgroundColor: "#e0e0e0",
                  borderRadius: 2,
                  width: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative", // Added for proper image positioning
                  overflow: "hidden", // Ensure image doesn't overflow rounded corners
                }}
              >
                <Image
                  src="/images/logo.png" // Use a specific about image
                  alt="Steel Builders Technical Engineering Team"
                  fill
                  style={{
                    objectFit: "fill",
                  }}
                  onError={(e) => {
                    // Fallback to a placeholder if the image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    // Show the fallback icon
                    const fallback = document.querySelector(
                      ".about-fallback"
                    ) as HTMLElement;
                    if (fallback) {
                      fallback.style.display = "block";
                    }
                  }}
                />
                {/* Fallback icon that only shows if image fails to load */}
                <Build
                  className="about-fallback"
                  sx={{
                    fontSize: 100,
                    color: "#bdbdbd",
                    display: "none", // Hidden by default
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services Section */}
      <Container
        id="services"
        maxWidth="lg"
        sx={{
          py: 4,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            color: MAGENTA,
            fontWeight: "bold",
          }}
        >
          Our Services
        </Typography>
        <Grid container spacing={3}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={index}>
              <Card
                sx={{
                  height: "95%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: `0 10px 20px rgba(18, 93, 184, 0.76)`,
                  },
                }}
              >
                <CardContent sx={{ p: 2, flexGrow: 1 }}>
                  <Box
                    sx={{ mb: 2, display: "flex", justifyContent: "center" }}
                  >
                    {service.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    component="h5"
                    sx={{
                      mb: 2,
                      color: BLUE_GREEN,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "center", pb: 3 }}>
                  <Button
                    endIcon={<ArrowForward />}
                    href={service.details}
                    sx={{
                      color: MAGENTA,
                      fontWeight: "bold",
                      "&:hover": {
                        backgroundColor: LIGHT_MAGENTA,
                      },
                    }}
                  >
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Achievements Section */}
      <Box
        id="achievements"
        sx={{
          backgroundColor: "#f9f9f9",
          py: 8,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 2,
              color: BLUE_GREEN,
              fontWeight: "bold",
            }}
          >
            Our Achievements
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ textAlign: "center", mb: 6, maxWidth: 700, mx: "auto" }}
          >
            We are proud of our track record in delivering excellence and
            building lasting partnerships.
          </Typography>
          <Grid container spacing={4}>
            {achievements.map((achievement, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      background: `linear-gradient(45deg, ${MAGENTA}, ${BLUE_GREEN})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      mb: 1,
                    }}
                    className="achievement-number"
                    data-target={achievement.number.replace(/\D/g, "")}
                  >
                    0
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {achievement.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Gallery Section */}
      <Container
        id="gallery"
        maxWidth="lg"
        sx={{
          py: 8,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 2,
            color: MAGENTA,
            fontWeight: "bold",
          }}
        >
          Gallery
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ textAlign: "center", mb: 6, maxWidth: 700, mx: "auto" }}
        >
          Explore a selection of our high-quality past projects. From raw
          materials to finished components, we deliver excellence.
        </Typography>

        {/* Gallery Navigation and Container */}
        <Box sx={{ position: "relative" }}>
          {/* Left Navigation Button */}
          <IconButton
            sx={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              zIndex: 10,
              "&:hover": {
                backgroundColor: MAGENTA,
                color: "white",
              },
            }}
            onClick={() => {
              const gallery = document.getElementById(
                "gallery-scroll-container"
              );
              if (gallery) {
                gallery.scrollBy({ left: -300, behavior: "smooth" });
              }
            }}
          >
            <NavigateBefore />
          </IconButton>

          {/* Right Navigation Button */}
          <IconButton
            sx={{
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              zIndex: 10,
              "&:hover": {
                backgroundColor: MAGENTA,
                color: "white",
              },
            }}
            onClick={() => {
              const gallery = document.getElementById(
                "gallery-scroll-container"
              );
              if (gallery) {
                gallery.scrollBy({ left: 300, behavior: "smooth" });
              }
            }}
          >
            <NavigateNext />
          </IconButton>

          {/* Gallery Scroll Container */}
          <Box
            id="gallery-scroll-container"
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 3,
              py: 2,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                display: "none", // Hide scrollbar for cleaner look
              },
              msOverflowStyle: "none", // Hide scrollbar for IE and Edge
              scrollbarWidth: "none", // Hide scrollbar for Firefox
            }}
          >
            {galleryItems.map((item, index) => (
              <Box
                key={index}
                sx={{
                  minWidth: 300,
                  height: 250,
                  backgroundColor: "#e0e0e0",
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    "& .gallery-overlay": {
                      opacity: 1,
                    },
                  },
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  onError={(e) => {
                    // Fallback to a placeholder if the image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                {/* Fallback icon that only shows if image fails to load */}
                <Factory
                  sx={{
                    fontSize: 60,
                    color: "#bdbdbd",
                    position: "absolute",
                    display: "none",
                    "&.fallback-visible": {
                      display: "block",
                    },
                  }}
                  className="gallery-fallback"
                />

                <Box
                  className="gallery-overlay"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(to bottom, transparent 0%, ${MAGENTA} 100%)`,
                    opacity: 0,
                    transition: "opacity 0.3s",
                    display: "flex",
                    alignItems: "flex-end",
                    p: 2,
                    color: "white",
                    zIndex: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    {item.title}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* View More Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            variant="outlined"
            endIcon={<ArrowForward />}
            href="/gallery"
            sx={{
              color: MAGENTA,
              borderColor: MAGENTA,
              fontWeight: "bold",
              px: 4,
              py: 1.5,
              "&:hover": {
                backgroundColor: MAGENTA,
                color: "white",
                borderColor: MAGENTA,
              },
            }}
          >
            View More Projects
          </Button>
        </Box>
      </Container>

      {/* CTA Section */}
      <Box
        id="contact"
        sx={{
          background: `linear-gradient(45deg, ${MAGENTA}, ${BLUE_GREEN})`,
          color: "white",
          py: 8,
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h2"
            sx={{ mb: 3, fontWeight: "bold" }}
          >
            Ready to Get Started?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Contact us today for a free consultation and quote on our industrial
            machinery solutions.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "white",
              color: MAGENTA,
              "&:hover": { backgroundColor: "#f5f5f5" },
              px: 6,
              py: 1.5,
              fontWeight: "bold",
            }}
          >
            Request a Quote
          </Button>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}

// Add this CSS for the bounce animation
const styles = `
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}
`;

// Add the styles to the document head
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}
