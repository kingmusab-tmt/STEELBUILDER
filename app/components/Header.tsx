"use client";
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Box,
  Container,
  Typography,
  Button,
  ListItemButton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Logo from "../public/logo.png";

// Custom color definitions
const MAGENTA = "#E3007E";
const BLUE_GREEN = "#00B3B3";
const GOLD = "#FFD700";

// Styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  padding: "0.5rem 0",
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  [theme.breakpoints.down("md")]: {
    flexGrow: 0,
    margin: "0 auto",
  },
}));

const NavLinksContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const SocialIconsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: "#333333",
  fontWeight: 500,
  fontSize: "0.9rem",
  textTransform: "none",
  "&:hover": {
    color: MAGENTA,
    backgroundColor: "transparent",
  },
}));

// Component
const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Products", href: "/products" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ];

  const socialIcons = [
    { icon: <FacebookIcon sx={{ color: BLUE_GREEN }} />, href: "#" },
    { icon: <TwitterIcon sx={{ color: BLUE_GREEN }} />, href: "#" },
    { icon: <InstagramIcon sx={{ color: MAGENTA }} />, href: "#" },
    { icon: <LinkedInIcon sx={{ color: BLUE_GREEN }} />, href: "#" },
  ];

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const drawerContent = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <Image
          src="/images/logo.png"
          alt="SteelbuilderEng Logo"
          width={120}
          height={40}
          style={{ objectFit: "contain" }}
        />
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton component="a" href={item.href}>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  sx: {
                    color: "#333",
                    "&:hover": { color: MAGENTA },
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, py: 2 }}>
        {socialIcons.map((social, index) => (
          <IconButton key={index} size="small">
            {social.icon}
          </IconButton>
        ))}
      </Box>
    </Box>
  );

  return (
    <StyledAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Social Media Icons (Left on desktop, hidden on mobile) */}
          <SocialIconsContainer>
            {socialIcons.map((social, index) => (
              <IconButton key={index} size="small" href={social.href}>
                {social.icon}
              </IconButton>
            ))}
          </SocialIconsContainer>

          {/* Logo (Centered) */}
          <LogoContainer>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {/* Company Logo Image */}
              <Image
                src="/images/logo.png"
                alt="Company Logo"
                width={150}
                height={50}
                style={{ objectFit: "contain" }}
              />
            </Box>
          </LogoContainer>

          {/* Navigation Links (Right on desktop) */}
          <NavLinksContainer>
            {navItems.map((item) => (
              <NavButton key={item.label} href={item.href}>
                {item.label}
              </NavButton>
            ))}
          </NavLinksContainer>

          {/* Mobile menu button */}
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                color: MAGENTA,
                position: "absolute",
                right: 0,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent()}
      </Drawer>
    </StyledAppBar>
  );
};

export default Header;
