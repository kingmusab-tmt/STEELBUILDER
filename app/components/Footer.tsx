import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  useTheme,
  Divider,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  LocationOn,
  Phone,
  Email,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { MAGENTA, BLUE_GREEN, GOLD } from "../theme/theme";

// Styled components
const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4, 0),
  borderTop: `3px solid ${BLUE_GREEN}`,
  marginTop: "auto",
}));

const FooterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
  color: MAGENTA,
  fontSize: "1.2rem",
  position: "relative",
  "&:after": {
    content: '""',
    position: "absolute",
    bottom: -8,
    left: 0,
    width: 40,
    height: 3,
    backgroundColor: GOLD,
  },
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  display: "block",
  marginBottom: theme.spacing(1),
  textDecoration: "none",
  transition: "all 0.3s ease",
  "&:hover": {
    color: MAGENTA,
    paddingLeft: theme.spacing(1),
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  backgroundColor: BLUE_GREEN,
  color: "white",
  margin: theme.spacing(0, 0.5),
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: MAGENTA,
    transform: "translateY(-3px)",
  },
}));

const CompanyLogo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(2),
  textDecoration: "none",
  color: "inherit",
  justifyContent: "center",
  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
  },
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.secondary,
}));

// Component
const Footer: React.FC = () => {
  const theme = useTheme();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ];

  const companyLinks = [
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Request Quote", href: "/quote" },
  ];

  const socialIcons = [
    { icon: <FacebookIcon />, href: "#" },
    { icon: <TwitterIcon />, href: "#" },
    { icon: <InstagramIcon />, href: "#" },
    { icon: <LinkedInIcon />, href: "#" },
    { icon: <YouTubeIcon />, href: "#" },
  ];

  return (
    <FooterContainer as="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info & Logo */}
          <Grid size={{ xs: 12, md: 4 }}>
            <CompanyLogo>
              <Image
                src="/images/logo.png"
                alt="Company Logo"
                width={150}
                height={50}
                style={{ objectFit: "contain" }}
              />
            </CompanyLogo>
            <Typography variant="body2" color="text.secondary" paragraph>
              We provide innovative solutions and exceptional services to meet
              all your needs. Our commitment to quality and customer
              satisfaction sets us apart.
            </Typography>
            <Box display="flex">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex" }}
                >
                  <SocialIcon>{social.icon}</SocialIcon>
                </a>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FooterTitle variant="h6">Quick Links</FooterTitle>
            {navItems.map((item) => (
              <FooterLink key={item.label} href={item.href} underline="none">
                {item.label}
              </FooterLink>
            ))}
          </Grid>

          {/* Company Links */}
          <Grid size={{ xs: 12, sm: 6, md: 2 }}>
            <FooterTitle variant="h6">Company</FooterTitle>
            {companyLinks.map((item) => (
              <FooterLink key={item.label} href={item.href} underline="none">
                {item.label}
              </FooterLink>
            ))}
          </Grid>

          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 4 }}>
            <FooterTitle variant="h6">Contact Us</FooterTitle>
            <ContactItem>
              <LocationOn sx={{ color: BLUE_GREEN, mr: 1 }} />
              <Typography variant="body2">
                123 Company Street, City, State 12345
              </Typography>
            </ContactItem>
            <ContactItem>
              <Phone sx={{ color: BLUE_GREEN, mr: 1 }} />
              <Typography variant="body2">+1 (123) 456-7890</Typography>
            </ContactItem>
            <ContactItem>
              <Email sx={{ color: BLUE_GREEN, mr: 1 }} />
              <Typography variant="body2">info@company.com</Typography>
            </ContactItem>

            {/* Newsletter Signup */}
            <Box mt={3}>
              <Typography
                variant="body1"
                fontWeight="bold"
                color={MAGENTA}
                gutterBottom
              >
                Subscribe to our Newsletter
              </Typography>
              <Box display="flex" mt={1}>
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{
                    flexGrow: 1,
                    padding: "8px 12px",
                    border: `1px solid ${BLUE_GREEN}`,
                    borderRadius: "4px 0 0 4px",
                    outline: "none",
                    backgroundColor:
                      theme.palette.mode === "dark" ? "#2a2a2a" : "#ffffff",
                    color: theme.palette.text.primary,
                  }}
                />
                <button
                  style={{
                    backgroundColor: MAGENTA,
                    color: "white",
                    border: "none",
                    padding: "0 15px",
                    borderRadius: "0 4px 4px 0",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Subscribe
                </button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4, borderColor: BLUE_GREEN }} />
        {/* Copyright */}
        <Box textAlign="center" pt={1}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Steel Builders Technical Engineering
            Ltd. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Designed and Developed by{" "}
            <Link
              href="https://triplemultipurposetechnology.com.ng"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: MAGENTA,
                textDecoration: "none",
                fontWeight: "bold",
                "&:hover": {
                  color: BLUE_GREEN,
                  textDecoration: "underline",
                },
              }}
            >
              Triple Multipurpose Technology
            </Link>
          </Typography>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
