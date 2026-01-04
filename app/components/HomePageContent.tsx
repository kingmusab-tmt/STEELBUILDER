"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import FAQSection from "@/app/components/FAQSection";
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
  CircularProgress,
  Rating,
  alpha,
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
import { MAGENTA, BLUE_GREEN, GOLD, LIGHT_MAGENTA } from "@/app/theme/theme";
import { styled } from "@mui/material/styles";

interface HeroImage {
  id: string;
  url: string;
  title: string;
}

interface Achievement {
  id: string;
  number: number;
  label: string;
  suffix: string;
}

interface Client {
  id: string;
  name: string;
  logo: string;
}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  message: string;
  rating: number;
  image: string;
}

const ClientLogoWrapper = styled(Box)({
  height: 100,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "contain",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const TestimonialCard = styled(Card)(({ theme }) => ({
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

export default function HomePageContent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [galleryImages, setGalleryImages] = useState<
    { image: string; title: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Load all data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [heroRes, achievementRes, clientRes, testimonialRes, galleryRes] =
          await Promise.all([
            fetch("/api/hero-images"),
            fetch("/api/achievements"),
            fetch("/api/clients"),
            fetch("/api/testimonials"),
            fetch("/api/gallery"),
          ]);

        if (heroRes.ok) setHeroImages(await heroRes.json());
        if (achievementRes.ok) setAchievements(await achievementRes.json());
        if (clientRes.ok) setClients(await clientRes.json());
        if (testimonialRes.ok) setTestimonials(await testimonialRes.json());
        if (galleryRes.ok) setGalleryImages(await galleryRes.json());
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Auto-rotate hero background images
  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages]);

  // Animate numbers
  useEffect(() => {
    const animateNumbers = () => {
      const numberElements = document.querySelectorAll(".achievement-number");

      numberElements.forEach((element) => {
        const target = parseInt(element.getAttribute("data-target") || "0");
        const suffix = element.getAttribute("data-suffix") || "+";
        const increment = Math.ceil(target / 100);
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current > target) {
            element.textContent = `${target}${suffix}`;
            clearInterval(timer);
          } else {
            element.textContent = `${current}${suffix}`;
          }
        }, 20);
      });
    };

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
  }, [achievements]);

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
    },
    {
      icon: <Engineering sx={{ fontSize: 40, color: MAGENTA }} />,
      title: "Plasma & Laser Cutting",
      description:
        "Precise cuts on various thicknesses of steel plate with clean edges and tight tolerances.",
    },
    {
      icon: <Settings sx={{ fontSize: 40, color: GOLD }} />,
      title: "Welding & Assembly",
      description:
        "Professional MIG, TIG, and stick welding services for complex structures and components.",
    },
    {
      icon: <Factory sx={{ fontSize: 40, color: BLUE_GREEN }} />,
      title: "Bending & Rolling",
      description:
        "Custom shaping of steel sheets, plates, and beams for architectural and industrial needs.",
    },
    {
      icon: <Build sx={{ fontSize: 40, color: MAGENTA }} />,
      title: "Galvanizing & Finishing",
      description:
        "Protective hot-dip galvanizing and finishing services, including painting and powder coating.",
    },
    {
      icon: <PrecisionManufacturing sx={{ fontSize: 40, color: GOLD }} />,
      title: "Installation & Maintenance",
      description:
        "Professional installation and maintenance services for all industrial machinery.",
    },
  ];

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const displayHeroImages = heroImages.length > 0 ? heroImages : [];
  const currentImage =
    displayHeroImages[currentHeroImage]?.url || "/images/t7.jpg";

  return (
    <Box>
      <Header />

      {/* Hero Section */}
      <Box
        id="hero"
        sx={{
          height: "100vh",
          background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${currentImage})`,
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
        {/* Navigation Arrows */}
        {displayHeroImages.length > 1 && (
          <>
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
                  (currentHeroImage - 1 + displayHeroImages.length) %
                    displayHeroImages.length
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
                setCurrentHeroImage(
                  (currentHeroImage + 1) % displayHeroImages.length
                )
              }
            >
              <NavigateNext />
            </IconButton>
          </>
        )}

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
              href="/quote"
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
              href="/contact"
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
          backgroundColor: theme.palette.background.paper,
          py: 8,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
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
                href="/about"
                sx={{
                  backgroundColor: MAGENTA,
                  "&:hover": { backgroundColor: "#c1006a" },
                  px: 4,
                  py: 1.5,
                }}
              >
                Learn More
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: 300,
                  borderRadius: 2,
                  width: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/images/logo.png"
                  alt="Steel Builders Technical Engineering Team"
                  fill
                  style={{
                    objectFit: "fill",
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
                    boxShadow:
                      theme.palette.mode === "dark"
                        ? `0 10px 20px rgba(227, 0, 126, 0.3)`
                        : `0 10px 20px rgba(18, 93, 184, 0.76)`,
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
                    href="/services"
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
          backgroundColor: theme.palette.background.paper,
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
            {achievements.map((achievement) => (
              <Grid size={{ xs: 6, md: 3 }} key={achievement.id}>
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
                    data-target={achievement.number}
                    data-suffix={achievement.suffix || "+"}
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

      {/* Clients Section */}
      <Container
        id="clients"
        maxWidth="lg"
        sx={{
          py: 8,
          minHeight: "60vh",
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
          Our Trusted Clients
        </Typography>
        <Typography
          variant="h6"
          component="p"
          sx={{ textAlign: "center", mb: 6, maxWidth: 700, mx: "auto" }}
        >
          We have had the privilege of working with leading companies across
          various industries.
        </Typography>
        <Box sx={{ position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              left: -20,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: theme.palette.background.paper,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              zIndex: 10,
              "&:hover": {
                backgroundColor: MAGENTA,
                color: "white",
              },
            }}
            onClick={() => {
              const container = document.getElementById(
                "clients-scroll-container"
              );
              if (container) {
                container.scrollBy({ left: -300, behavior: "smooth" });
              }
            }}
          >
            <NavigateBefore />
          </IconButton>

          <IconButton
            sx={{
              position: "absolute",
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: theme.palette.background.paper,
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              zIndex: 10,
              "&:hover": {
                backgroundColor: MAGENTA,
                color: "white",
              },
            }}
            onClick={() => {
              const container = document.getElementById(
                "clients-scroll-container"
              );
              if (container) {
                container.scrollBy({ left: 300, behavior: "smooth" });
              }
            }}
          >
            <NavigateNext />
          </IconButton>

          <Box
            id="clients-scroll-container"
            sx={{
              display: "flex",
              overflowX: "auto",
              gap: 5,
              py: 2,
              scrollBehavior: "smooth",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {clients.map((client, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minWidth: 200,
                  flexShrink: 0,
                }}
              >
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 120,
                    width: 200,
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <ClientLogoWrapper
                    sx={{
                      backgroundImage: `url(${client.logo})`,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Card>
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ mt: 2, maxWidth: 160, fontSize: "0.85rem" }}
                >
                  {client.name}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Testimonials Section */}
      <Box
        sx={{
          background: alpha(theme.palette.primary.main, 0.03),
          py: 8,
          minHeight: "70vh",
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
            What Our Clients Say
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ textAlign: "center", mb: 6, maxWidth: 700, mx: "auto" }}
          >
            Hear from our satisfied clients about their experience working with
            Steel Builders.
          </Typography>
          <Box sx={{ position: "relative" }}>
            <IconButton
              sx={{
                position: "absolute",
                left: -20,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: theme.palette.background.paper,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                zIndex: 10,
                "&:hover": {
                  backgroundColor: BLUE_GREEN,
                  color: "white",
                },
              }}
              onClick={() => {
                const container = document.getElementById(
                  "testimonials-scroll-container"
                );
                if (container) {
                  container.scrollBy({ left: -350, behavior: "smooth" });
                }
              }}
            >
              <NavigateBefore />
            </IconButton>

            <IconButton
              sx={{
                position: "absolute",
                right: -20,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: theme.palette.background.paper,
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                zIndex: 10,
                "&:hover": {
                  backgroundColor: BLUE_GREEN,
                  color: "white",
                },
              }}
              onClick={() => {
                const container = document.getElementById(
                  "testimonials-scroll-container"
                );
                if (container) {
                  container.scrollBy({ left: 350, behavior: "smooth" });
                }
              }}
            >
              <NavigateNext />
            </IconButton>

            <Box
              id="testimonials-scroll-container"
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 3,
                py: 2,
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {testimonials.map((testimonial, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: 380,
                    // flexShrink: 0,
                  }}
                >
                  <TestimonialCard>
                    <CardContent sx={{ p: 3, flexGrow: 1 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Box
                          sx={{
                            width: 50,
                            height: 50,
                            borderRadius: "50%",
                            backgroundImage: `url(${testimonial.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            mr: 2,
                          }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {testimonial.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {testimonial.company}
                          </Typography>
                        </Box>
                      </Box>
                      <Rating
                        value={testimonial.rating}
                        readOnly
                        sx={{ mb: 2 }}
                      />
                      <Typography variant="body1" color="text.secondary">
                        &quot;{testimonial.message}&quot;
                      </Typography>
                    </CardContent>
                  </TestimonialCard>
                </Box>
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <Container
          id="gallery"
          maxWidth="lg"
          sx={{
            py: 8,
            minHeight: "60vh",
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

          <Box sx={{ position: "relative" }}>
            <IconButton
              sx={{
                position: "absolute",
                left: -20,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: theme.palette.background.paper,
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

            <IconButton
              sx={{
                position: "absolute",
                right: -20,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: theme.palette.background.paper,
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

            <Box
              id="gallery-scroll-container"
              sx={{
                display: "flex",
                overflowX: "auto",
                gap: 3,
                py: 2,
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              {galleryImages.slice(0, 6).map((item, index) => (
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
      )}

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
            href="/contact"
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

      {/* FAQ Section */}
      <FAQSection />

      <Footer />

      <style>{`
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
      `}</style>
    </Box>
  );
}
