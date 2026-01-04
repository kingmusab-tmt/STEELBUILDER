"use client";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
} from "@mui/material";
import {
  CheckCircle,
  Build,
  Handyman,
  Engineering,
  LocalShipping,
  Support,
  Verified,
  FlashOn,
  Handshake,
} from "@mui/icons-material";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BreadcrumbNav from "../../components/BreadcrumbNav";
import { MAGENTA, BLUE_GREEN, GOLD } from "../../theme/theme";

export default function ServicesPageContent() {
  const services = [
    {
      icon: <Engineering sx={{ fontSize: 50, color: MAGENTA }} />,
      title: "Industrial Machinery Fabrication",
      description:
        "We design and manufacture high-quality industrial machinery tailored to your specific needs, with precision engineering and quality materials.",
      features: [
        "Custom machine design and engineering",
        "CNC machining and metal fabrication",
        "Assembly and quality testing",
        "ISO certified manufacturing processes",
      ],
    },
    {
      icon: <FlashOn sx={{ fontSize: 50, color: BLUE_GREEN }} />,
      title: "Block Molding & Paving Machines",
      description:
        "Industry-leading block molding and paving stone machines designed for high production efficiency and durability.",
      features: [
        "Automatic block molding machines",
        "Paving stone production equipment",
        "High production capacity systems",
        "Easy operation and maintenance",
      ],
    },
    {
      icon: <Build sx={{ fontSize: 50, color: GOLD }} />,
      title: "Stone Crusher Machines",
      description:
        "Robust stone crushing equipment for aggregate production, capable of handling various rock types and sizes.",
      features: [
        "Jaw crushers for primary crushing",
        "Impact crushers for secondary crushing",
        "Cone crushers for fine aggregates",
        "Customizable feed sizes",
      ],
    },
    {
      icon: <LocalShipping sx={{ fontSize: 50, color: MAGENTA }} />,
      title: "Installation & Commissioning",
      description:
        "Professional installation services ensuring your machinery is set up correctly for optimal performance.",
      features: [
        "On-site installation and setup",
        "Machine commissioning and testing",
        "Staff training and handover",
        "Performance verification",
      ],
    },
    {
      icon: <Handyman sx={{ fontSize: 50, color: BLUE_GREEN }} />,
      title: "Maintenance & Repair Services",
      description:
        "Comprehensive maintenance programs and emergency repair services to keep your machinery running smoothly.",
      features: [
        "Preventive maintenance schedules",
        "Emergency repair services",
        "Spare parts supply and replacement",
        "24/7 technical support availability",
      ],
    },
    {
      icon: <Support sx={{ fontSize: 50, color: GOLD }} />,
      title: "Technical Support & Training",
      description:
        "Expert technical support and comprehensive operator training to maximize equipment efficiency and lifespan.",
      features: [
        "Operator training programs",
        "Technical troubleshooting",
        "Performance optimization guidance",
        "Documentation and manuals",
      ],
    },
  ];

  const processSteps = [
    {
      number: "01",
      title: "Consultation",
      description:
        "We meet with you to understand your requirements, production capacity needs, and specific challenges.",
    },
    {
      number: "02",
      title: "Design & Planning",
      description:
        "Our engineering team designs a customized solution tailored to your exact specifications.",
    },
    {
      number: "03",
      title: "Manufacturing",
      description:
        "We fabricate your machinery using quality materials and advanced manufacturing techniques.",
    },
    {
      number: "04",
      title: "Quality Testing",
      description:
        "Every machine undergoes rigorous testing to ensure it meets our high quality standards.",
    },
    {
      number: "05",
      title: "Installation",
      description:
        "Our technicians install and commission your equipment at your facility.",
    },
    {
      number: "06",
      title: "Support & Training",
      description:
        "We provide ongoing support, maintenance, and training for your operations team.",
    },
  ];

  const specializations = [
    "Block Molding Machines",
    "Paving Stone Machines",
    "Stone Crusher Machines",
    "Industrial Clamps",
    "Material Handling Equipment",
    "Custom Fabrication",
    "Machinery Maintenance",
    "Technical Support",
  ];

  return (
    <Box>
      <Header />
      <BreadcrumbNav />

      {/* Hero Section */}
      <Box
        component="section"
        aria-label="Services page hero"
        sx={{
          background: `linear-gradient(135deg, ${BLUE_GREEN} 0%, ${MAGENTA} 100%)`,
          color: "white",
          py: 8,
          mt: 0,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            Our Comprehensive Services
          </Typography>
          <Typography
            variant="h2"
            sx={{
              textAlign: "center",
              maxWidth: 800,
              mx: "auto",
              opacity: 0.95,
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              fontWeight: 400,
            }}
          >
            Complete Industrial Machinery Solutions from Design to Support
          </Typography>
        </Container>
      </Box>

      {/* Services Grid */}
      <Container
        maxWidth="lg"
        component="section"
        aria-label="Core services"
        sx={{ py: 8 }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            color: MAGENTA,
            fontWeight: "bold",
            fontSize: { xs: "1.75rem", md: "2.5rem" },
          }}
        >
          What We Offer
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s",
                  borderTop: `4px solid ${
                    index % 3 === 0
                      ? MAGENTA
                      : index % 3 === 1
                      ? BLUE_GREEN
                      : GOLD
                  }`,
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 2 }}>{service.icon}</Box>
                  <Typography
                    variant="h5"
                    sx={{ mb: 2, fontWeight: "bold", color: BLUE_GREEN }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ mb: 3, color: "text.secondary", fontSize: "0.95rem" }}
                  >
                    {service.description}
                  </Typography>
                  <List sx={{ py: 0 }}>
                    {service.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle
                            sx={{ fontSize: 18, color: BLUE_GREEN }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            sx: { fontSize: "0.9rem" },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Our Process Section */}
      <Box
        component="section"
        aria-label="Our process"
        sx={{
          bgcolor: "background.paper",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 8,
              color: BLUE_GREEN,
              fontWeight: "bold",
              fontSize: { xs: "1.75rem", md: "2.5rem" },
            }}
          >
            Our Process
          </Typography>
          <Grid container spacing={3}>
            {processSteps.map((step, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: "center",
                    height: "100%",
                    position: "relative",
                    backgroundColor: `${MAGENTA}08`,
                    borderLeft: `4px solid ${MAGENTA}`,
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${MAGENTA}, ${BLUE_GREEN})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2,
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "white",
                    }}
                  >
                    {step.number}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: "bold", color: MAGENTA }}
                  >
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                  {index < processSteps.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: "none", md: "block" },
                        position: "absolute",
                        right: "-30px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: BLUE_GREEN,
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      →
                    </Box>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Specializations Section */}
      <Container
        maxWidth="lg"
        component="section"
        aria-label="Specializations"
        sx={{ py: 8 }}
      >
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Box
              sx={{
                height: 400,
                borderRadius: 2,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
              }}
            >
              <Image
                src="/images/t7.jpg"
                alt="Steel Builders manufacturing facility with advanced machinery and equipment"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                mb: 4,
                color: MAGENTA,
                fontWeight: "bold",
              }}
            >
              Our Specializations
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 4,
                fontSize: "1.05rem",
                textAlign: "justify",
              }}
            >
              With over 9 years of experience in the industrial machinery
              sector, we have developed deep expertise across multiple
              specializations. Each service is backed by our team of skilled
              engineers and technicians committed to delivering excellence.
            </Typography>
            <Grid container spacing={2}>
              {specializations.map((spec, index) => (
                <Grid size={{ xs: 12, sm: 6 }} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      backgroundColor: `${BLUE_GREEN}08`,
                      borderRadius: 1,
                    }}
                  >
                    <Verified sx={{ color: BLUE_GREEN, mr: 2, fontSize: 24 }} />
                    <Typography sx={{ fontWeight: 500 }}>{spec}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>

      {/* Why Choose Our Services */}
      <Box
        component="section"
        aria-label="Why choose us"
        sx={{
          bgcolor: "background.paper",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 6,
              color: BLUE_GREEN,
              fontWeight: "bold",
              fontSize: { xs: "1.75rem", md: "2.5rem" },
            }}
          >
            Why Choose Our Services?
          </Typography>
          <Grid container spacing={4}>
            {[
              {
                title: "Expert Team",
                description:
                  "Our 800+ skilled engineers and technicians bring years of expertise to every project.",
                icon: <Engineering sx={{ fontSize: 40, color: MAGENTA }} />,
              },
              {
                title: "Quality Assurance",
                description:
                  "All services are performed to the highest standards with rigorous quality control.",
                icon: <Verified sx={{ fontSize: 40, color: BLUE_GREEN }} />,
              },
              {
                title: "Complete Solutions",
                description:
                  "From design to installation and ongoing support, we handle everything.",
                icon: <Handshake sx={{ fontSize: 40, color: GOLD }} />,
              },
              {
                title: "Timely Delivery",
                description:
                  "We respect your timeline and deliver projects on schedule every time.",
                icon: <FlashOn sx={{ fontSize: 40, color: MAGENTA }} />,
              },
              {
                title: "Competitive Pricing",
                description:
                  "Get premium quality services at competitive rates that respect your budget.",
                icon: <CheckCircle sx={{ fontSize: 40, color: BLUE_GREEN }} />,
              },
              {
                title: "Continuous Support",
                description:
                  "Our commitment doesn't end after delivery - we provide ongoing maintenance and support.",
                icon: <Support sx={{ fontSize: 40, color: GOLD }} />,
              },
            ].map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    textAlign: "center",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 10px 30px rgba(0, 179, 179, 0.2)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ mb: 2 }}>{item.icon}</Box>
                    <Typography
                      variant="h6"
                      sx={{ mb: 2, fontWeight: "bold", color: MAGENTA }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        component="section"
        aria-label="Call to action"
        sx={{
          background: `linear-gradient(45deg, ${MAGENTA}, ${BLUE_GREEN})`,
          color: "white",
          py: 8,
          textAlign: "center",
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
            Contact us today to discuss your industrial machinery needs and
            discover how our comprehensive services can help your business
            thrive.
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
              href="/contact"
              component="a"
              variant="contained"
              sx={{
                px: 6,
                py: 1.5,
                backgroundColor: "white",
                color: MAGENTA,
                fontWeight: "bold",
                fontSize: "1.1rem",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "white",
                  transform: "translateY(-3px)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                },
              }}
            >
              Get in Touch
            </Button>
            <Button
              href="/about"
              component="a"
              variant="outlined"
              sx={{
                px: 6,
                py: 1.5,
                borderColor: "white",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textTransform: "none",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "white",
                  color: MAGENTA,
                  transform: "translateY(-3px)",
                },
              }}
            >
              Learn More
            </Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
