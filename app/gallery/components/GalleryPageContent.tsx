"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CircularProgress,
  Dialog,
  IconButton,
  Fade,
} from "@mui/material";
import { Close, NavigateBefore, NavigateNext } from "@mui/icons-material";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BreadcrumbNav from "../../components/BreadcrumbNav";
import { MAGENTA, BLUE_GREEN } from "../../theme/theme";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  createdAt: string;
}

export default function GalleryPageContent() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [displayedItems, setDisplayedItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<HTMLDivElement>(null);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setGallery(data);
      setDisplayedItems(data.slice(0, ITEMS_PER_PAGE));
      setHasMore(data.length > ITEMS_PER_PAGE);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedItems.length;
      const nextItems = gallery.slice(
        currentLength,
        currentLength + ITEMS_PER_PAGE
      );
      setDisplayedItems((prev) => [...prev, ...nextItems]);
      setHasMore(currentLength + nextItems.length < gallery.length);
      setLoadingMore(false);
    }, 500);
  }, [displayedItems.length, gallery, hasMore, loadingMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loadingMore, loadMore]);

  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
    setImageDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setImageDialogOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (!selectedImage) return;

    const currentIndex = gallery.findIndex(
      (item) => item.id === selectedImage.id
    );
    let newIndex = currentIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : gallery.length - 1;
    } else {
      newIndex = currentIndex < gallery.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedImage(gallery[newIndex]);
  };

  if (loading) {
    return (
      <Box>
        <Header />
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box>
      <Header />
      <BreadcrumbNav />

      {/* Hero Section */}
      <Box
        component="section"
        aria-label="Gallery page hero"
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
            Project Gallery
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
            Showcasing Our Industrial Machinery Projects and Installations
          </Typography>
        </Container>
      </Box>

      {/* Gallery Grid */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography
          variant="body1"
          sx={{ mb: 4, color: "text.secondary", textAlign: "center" }}
        >
          {gallery.length} {gallery.length === 1 ? "project" : "projects"} in
          our gallery
        </Typography>

        <Grid container spacing={3}>
          {displayedItems.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.id}>
              <Fade
                in
                timeout={500}
                style={{ transitionDelay: `${(index % 6) * 100}ms` }}
              >
                <Card
                  sx={{
                    height: 300,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                      "& .overlay": {
                        opacity: 1,
                      },
                    },
                  }}
                  onClick={() => handleImageClick(item)}
                >
                  <CardMedia
                    sx={{
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  </CardMedia>
                  <Box
                    className="overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 100%)`,
                      display: "flex",
                      alignItems: "flex-end",
                      p: 2,
                      opacity: 0,
                      transition: "opacity 0.3s",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Box>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Loading More Indicator */}
        {loadingMore && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress size={30} />
          </Box>
        )}

        {/* Intersection Observer Target */}
        {hasMore && <div ref={observerTarget} style={{ height: "20px" }} />}

        {/* End Message */}
        {!hasMore && displayedItems.length > 0 && (
          <Box sx={{ textAlign: "center", py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              You&apos;ve reached the end of the gallery
            </Typography>
          </Box>
        )}

        {/* Empty State */}
        {displayedItems.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No gallery items yet
            </Typography>
          </Box>
        )}
      </Container>

      {/* Image Viewer Dialog */}
      <Dialog
        open={imageDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            boxShadow: "none",
          },
        }}
      >
        {selectedImage && (
          <Box sx={{ position: "relative", minHeight: "80vh" }}>
            <IconButton
              onClick={handleCloseDialog}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <Close />
            </IconButton>

            <IconButton
              onClick={() => handleNavigate("prev")}
              sx={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <NavigateBefore fontSize="large" />
            </IconButton>

            <IconButton
              onClick={() => handleNavigate("next")}
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                transform: "translateY(-50%)",
                color: "white",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1,
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                },
              }}
            >
              <NavigateNext fontSize="large" />
            </IconButton>

            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                sizes="100vw"
                style={{
                  objectFit: "contain",
                }}
                priority
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                p: 3,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {selectedImage.title}
              </Typography>
            </Box>
          </Box>
        )}
      </Dialog>

      <Footer />
    </Box>
  );
}
