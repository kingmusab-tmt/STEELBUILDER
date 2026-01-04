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
} from "@mui/material";
import {
  CheckCircle,
  Engineering,
  Verified,
  Groups,
  LocationOn,
  Factory,
  Rocket,
  EmojiEvents,
  Timeline,
} from "@mui/icons-material";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BreadcrumbNav from "../../components/BreadcrumbNav";
import { MAGENTA, BLUE_GREEN, GOLD } from "../../theme/theme";

export default function AboutPageContent() {
  const coreValues = [
    {
      icon: <Verified sx={{ fontSize: 40, color: MAGENTA }} />,
      title: "Quality Excellence",
      description:
        "We maintain the highest standards in fabrication, installation, and maintenance of industrial machinery.",
    },
    {
      icon: <Groups sx={{ fontSize: 40, color: BLUE_GREEN }} />,
      title: "Customer Focus",
      description:
        "Our clients' success is our priority. We deliver tailored solutions that meet specific industrial needs.",
    },
    {
      icon: <Rocket sx={{ fontSize: 40, color: GOLD }} />,
      title: "Innovation",
      description:
        "We embrace cutting-edge technology and innovative approaches to engineering challenges.",
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40, color: MAGENTA }} />,
      title: "Reliability",
      description:
        "We build lasting relationships through consistent delivery of reliable, durable machinery.",
    },
  ];

  const whatWeDo = [
    "Fabrication of industrial machinery and equipment",
    "Installation of block molding machines and paving stone machines",
    "Manufacturing of stone crusher machines",
    "Industrial clamps and material handling equipment",
    "Maintenance and repair services for industrial equipment",
    "Custom engineering solutions for various industries",
    "Production of locally built machines in Nigeria",
    "Block making and paving stone machinery",
  ];

  const whyChooseUs = [
    {
      title: "Locally Built Excellence",
      description:
        "We manufacture high-quality industrial machines right here in Nigeria, ensuring availability and easy maintenance.",
    },
    {
      title: "Proven Track Record",
      description:
        "With over 9 years of experience and 600+ completed projects, we have demonstrated our expertise across various industries.",
    },
    {
      title: "Comprehensive Services",
      description:
        "From fabrication to installation and ongoing maintenance, we provide end-to-end solutions for your industrial needs.",
    },
    {
      title: "Quality Assurance",
      description:
        "All our machines are fully certified and tested before dispatch, giving you total peace of mind.",
    },
    {
      title: "Expert Team",
      description:
        "Our team of 800+ skilled engineers and technicians are committed to delivering excellence in every project.",
    },
    {
      title: "Innovative Solutions",
      description:
        "We continuously innovate to provide cutting-edge machinery that meets evolving industry demands.",
    },
  ];

  return (
    <Box>
      <Header />
      <BreadcrumbNav />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://steelbuilders.com.ng/#organization",
            name: "Steel Builders Technical Engineering Ltd",
            alternateName: "Steel Builders",
            description:
              "Leading manufacturer of industrial machinery in Nigeria, specializing in fabrication, installation, and maintenance of block molding machines, stone crushers, and industrial equipment.",
            url: "https://steelbuilders.com.ng",
            logo: {
              "@type": "ImageObject",
              url: "https://steelbuilders.com.ng/images/logo.png",
              width: "250",
              height: "60",
            },
            image: [
              "https://steelbuilders.com.ng/images/t7.jpg",
              "https://steelbuilders.com.ng/images/t1.jpg",
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress:
                "Epe Along Epe-Ikorodu Road, Behind Conoil Filling Station",
              addressLocality: "Epe",
              addressRegion: "Lagos State",
              addressCountry: "Nigeria",
            },
            geo: {
              "@type": "GeoCoordinates",
              latitude: "6.5795",
              longitude: "3.9827",
            },
            sameAs: [
              "https://www.instagram.com/steel_builders_tech_eng_ltd/",
              "https://web.facebook.com/p/Steelbuilders-technical-engineering-100075628998773/",
            ],
            foundingDate: "2017",
            numberOfEmployees: {
              "@type": "QuantitativeValue",
              value: 800,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              bestRating: "5",
              worstRating: "1",
              ratingCount: "190",
            },
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "Customer Service",
              areaServed: "NG",
              availableLanguage: ["English"],
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Industrial Machinery Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Block Molding Machine Manufacturing",
                    description:
                      "Custom block molding machines manufactured locally in Nigeria",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Stone Crusher Machine Manufacturing",
                    description:
                      "Industrial stone crusher machines for various applications",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Industrial Equipment Installation",
                    description:
                      "Professional installation services for industrial machinery",
                  },
                },
              ],
            },
          }),
        }}
      />

      {/* BreadcrumbList Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://steelbuilders.com.ng/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "About Us",
                item: "https://steelbuilders.com.ng/about",
              },
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <Box
        component="section"
        aria-label="About page hero"
        sx={{
          background: `linear-gradient(135deg, ${MAGENTA} 0%, ${BLUE_GREEN} 100%)`,
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
            About Steel Builders Technical Engineering Ltd
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
            Leading Experts in Fabrication, Installation, and Maintenance of
            Industrial Machinery
          </Typography>
        </Container>
      </Box>

      {/* Company Overview Section */}
      <Container
        maxWidth="lg"
        component="section"
        aria-label="Company overview"
        sx={{ py: 8 }}
      >
        <Grid container spacing={6} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                mb: 3,
                color: BLUE_GREEN,
                fontWeight: "bold",
              }}
            >
              Who We Are
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                fontSize: "1.1rem",
                textAlign: "justify",
              }}
            >
              Steel Builders Technical Engineering Ltd is a premier industrial
              company specializing in the fabrication, installation, and
              maintenance of industrial machines. Based in Lagos, Nigeria, we
              have established ourselves as a trusted name in the engineering
              and manufacturing sector.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                fontSize: "1.1rem",
                textAlign: "justify",
              }}
            >
              Our company is dedicated to providing innovative, locally-built
              solutions that meet international quality standards. We pride
              ourselves on manufacturing machines that are tested, certified,
              and built to withstand the demanding requirements of modern
              industry.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                fontSize: "1.1rem",
                textAlign: "justify",
              }}
            >
              With a strong commitment to excellence in casting engineering, we
              deliver products with excellent material intake capacity, easy
              installation and maintenance, high production efficiency, and
              exceptional reliability.
            </Typography>
          </Grid>
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
                alt="Steel Builders Technical Engineering industrial manufacturing facility showcasing machinery production"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{
                  objectFit: "cover",
                }}
                priority
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Mission & Vision Section */}
      <Box
        component="section"
        aria-label="Mission and vision"
        sx={{
          bgcolor: "background.paper",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: "100%",
                  background: `linear-gradient(135deg, ${MAGENTA}15 0%, ${BLUE_GREEN}15 100%)`,
                  borderLeft: `5px solid ${MAGENTA}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Rocket sx={{ fontSize: 50, color: MAGENTA, mr: 2 }} />
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{ fontWeight: "bold", color: MAGENTA }}
                  >
                    Our Mission
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1.1rem", textAlign: "justify" }}
                >
                  To provide world-class industrial machinery solutions through
                  innovative engineering, exceptional craftsmanship, and
                  unwavering commitment to quality. We aim to empower Nigerian
                  industries with locally-manufactured equipment that meets
                  global standards while offering superior after-sales support
                  and maintenance services.
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: "100%",
                  background: `linear-gradient(135deg, ${BLUE_GREEN}15 0%, ${GOLD}15 100%)`,
                  borderLeft: `5px solid ${BLUE_GREEN}`,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Timeline sx={{ fontSize: 50, color: BLUE_GREEN, mr: 2 }} />
                  <Typography
                    variant="h4"
                    component="h3"
                    sx={{ fontWeight: "bold", color: BLUE_GREEN }}
                  >
                    Our Vision
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "1.1rem", textAlign: "justify" }}
                >
                  To become the leading manufacturer and service provider of
                  industrial machinery in West Africa, recognized for
                  excellence, innovation, and reliability. We envision a future
                  where Nigerian-made industrial equipment is the first choice
                  for businesses across the continent, driving industrial growth
                  and economic development.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Core Values Section */}
      <Container
        maxWidth="lg"
        component="section"
        aria-label="Core values"
        sx={{ py: 8 }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            color: MAGENTA,
            fontWeight: "bold",
          }}
        >
          Our Core Values
        </Typography>
        <Grid container spacing={4}>
          {coreValues.map((value, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 10px 30px rgba(0, 179, 179, 0.3)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ mb: 2 }}>{value.icon}</Box>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, fontWeight: "bold", color: BLUE_GREEN }}
                  >
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* What We Do Section */}
      <Box
        component="section"
        aria-label="What we do"
        sx={{
          bgcolor: "background.paper",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 6,
              color: BLUE_GREEN,
              fontWeight: "bold",
            }}
          >
            What We Do
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  borderTop: `4px solid ${MAGENTA}`,
                }}
              >
                <Factory sx={{ fontSize: 60, color: MAGENTA, mb: 2 }} />
                <Typography
                  variant="h5"
                  component="h3"
                  sx={{ mb: 3, fontWeight: "bold", color: BLUE_GREEN }}
                >
                  Our Specializations
                </Typography>
                <List>
                  {whatWeDo.map((item, index) => (
                    <ListItem key={index} sx={{ py: 0.5 }}>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: BLUE_GREEN }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{
                          sx: { fontSize: "1rem" },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: "100%",
                  minHeight: 400,
                  borderRadius: 2,
                  overflow: "hidden",
                  position: "relative",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}
              >
                <Image
                  src="/images/t1.jpg"
                  alt="Steel Builders industrial machinery projects showcasing block molding machines and equipment"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us Section */}
      <Container
        maxWidth="lg"
        component="section"
        aria-label="Why choose us"
        sx={{ py: 8 }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            color: MAGENTA,
            fontWeight: "bold",
          }}
        >
          Why Choose Steel Builders?
        </Typography>
        <Grid container spacing={3}>
          {whyChooseUs.map((reason, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateX(10px)",
                    boxShadow: "0 5px 20px rgba(0, 179, 179, 0.3)",
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <CheckCircle
                      sx={{ color: BLUE_GREEN, mr: 2, mt: 0.5, fontSize: 30 }}
                    />
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{ mb: 1, fontWeight: "bold", color: MAGENTA }}
                      >
                        {reason.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {reason.description}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Company Information Section */}
      <Box
        component="section"
        aria-label="Company information"
        sx={{
          bgcolor: "background.paper",
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            component="h2"
            sx={{
              textAlign: "center",
              mb: 6,
              color: BLUE_GREEN,
              fontWeight: "bold",
            }}
          >
            Company Information
          </Typography>
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  borderTop: `4px solid ${MAGENTA}`,
                }}
              >
                <LocationOn sx={{ fontSize: 60, color: MAGENTA, mb: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: "bold", color: BLUE_GREEN }}
                >
                  Our Location
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Epe Along Epe-Ikorodu Road
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Behind Conoil Filling Station
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Epe, Lagos State, Nigeria
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  borderTop: `4px solid ${BLUE_GREEN}`,
                }}
              >
                <Groups sx={{ fontSize: 60, color: BLUE_GREEN, mb: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: "bold", color: BLUE_GREEN }}
                >
                  Our Community
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  7,222+ Instagram Followers
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  324+ Showcased Projects
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Growing Community of Satisfied Clients
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={2}
                sx={{
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  borderTop: `4px solid ${GOLD}`,
                }}
              >
                <Engineering sx={{ fontSize: 60, color: GOLD, mb: 2 }} />
                <Typography
                  variant="h6"
                  sx={{ mb: 2, fontWeight: "bold", color: BLUE_GREEN }}
                >
                  Industry Type
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Industrial Company
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Manufacturing & Engineering
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Machinery Fabrication
                </Typography>
              </Paper>
            </Grid>
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
            Ready to Work With Us?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Contact us today to discuss your industrial machinery needs and
            discover how we can help your business grow.
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a href="/contact" style={{ textDecoration: "none" }}>
              <Paper
                elevation={5}
                sx={{
                  px: 6,
                  py: 1.5,
                  backgroundColor: "white",
                  color: MAGENTA,
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  },
                }}
              >
                Contact Us
              </Paper>
            </a>
            <a href="/services" style={{ textDecoration: "none" }}>
              <Paper
                elevation={5}
                sx={{
                  px: 6,
                  py: 1.5,
                  backgroundColor: "transparent",
                  border: "2px solid white",
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    backgroundColor: "white",
                    color: MAGENTA,
                    transform: "translateY(-3px)",
                  },
                }}
              >
                Our Services
              </Paper>
            </a>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
