"use client";
import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  CheckCircle,
  WhatsApp,
  Close,
  Search,
  Download,
  NavigateBefore,
  NavigateNext,
} from "@mui/icons-material";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BreadcrumbNav from "../../components/BreadcrumbNav";
import ProductSchema from "./ProductSchema";
import SingleProductSchema from "./SingleProductSchema";
import { MAGENTA, BLUE_GREEN, GOLD } from "../../theme/theme";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  images: string[];
  specifications: string[];
  applications: string[];
  features: string[];
  createdAt: string;
}

export default function ProductsPageContent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [cardImageIndices, setCardImageIndices] = useState<
    Record<string, number>
  >({});
  const [detailImageIndex, setDetailImageIndex] = useState(0);

  const categories = [
    "All",
    "Block Molding",
    "Stone Crushing",
    "Paving Stones",
    "Material Handling",
    "Custom Solutions",
  ];

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = useCallback(() => {
    let filtered = products;

    if (categoryFilter !== "All") {
      filtered = filtered.filter((p) => p.category === categoryFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, categoryFilter]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setDetailImageIndex(0);
    setDetailsOpen(true);
  };

  const handleWhatsApp = (product: Product) => {
    const phoneNumber = "+2348135533480"; // Replace with actual WhatsApp number
    const message = encodeURIComponent(
      `Hello, I'm interested in the ${product.name}. Could you please provide more information about pricing and availability?`,
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleDownloadSpecs = (product: Product) => {
    const specs = `
${product.name}

Description:
${product.description}

Specifications:
${product.specifications.map((s) => `- ${s}`).join("\n")}

Features:
${product.features.map((f) => `- ${f}`).join("\n")}

Applications:
${product.applications.map((a) => `- ${a}`).join("\n")}
    `;

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(specs),
    );
    element.setAttribute(
      "download",
      `${product.name.replace(/\s+/g, "_")}.txt`,
    );
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Add Product Schema for SEO */}
      {products.length > 0 && <ProductSchema products={products} />}

      <Header />
      <BreadcrumbNav />

      {/* Hero Section */}
      <Box
        component="section"
        aria-label="Products page hero"
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
            Our Product Catalog
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
            High-Quality Industrial Machinery and Equipment Solutions
          </Typography>
        </Container>
      </Box>

      {/* Search and Filter Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: BLUE_GREEN }} />,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
          Showing {filteredProducts.length} of {products.length} products
        </Typography>

        {/* Products Grid */}
        <Grid container spacing={4}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => {
              const allImages = [
                product.image,
                ...(product.images || []),
              ].filter(Boolean);
              const currentCardIdx = cardImageIndices[product.id] || 0;
              const hasMultiple = allImages.length > 1;
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.3s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
                      },
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: 240,
                        position: "relative",
                        backgroundColor: `${BLUE_GREEN}20`,
                      }}
                    >
                      <Image
                        src={allImages[currentCardIdx] || product.image}
                        alt={`${product.name} view ${currentCardIdx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{
                          objectFit: "cover",
                        }}
                      />
                      {hasMultiple && (
                        <>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardImageIndices((prev) => ({
                                ...prev,
                                [product.id]:
                                  (currentCardIdx - 1 + allImages.length) %
                                  allImages.length,
                              }));
                            }}
                            sx={{
                              position: "absolute",
                              left: 4,
                              top: "50%",
                              transform: "translateY(-50%)",
                              backgroundColor: "rgba(0,0,0,0.5)",
                              color: "white",
                              padding: "4px",
                              "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.75)",
                              },
                            }}
                          >
                            <NavigateBefore fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              setCardImageIndices((prev) => ({
                                ...prev,
                                [product.id]:
                                  (currentCardIdx + 1) % allImages.length,
                              }));
                            }}
                            sx={{
                              position: "absolute",
                              right: 4,
                              top: "50%",
                              transform: "translateY(-50%)",
                              backgroundColor: "rgba(0,0,0,0.5)",
                              color: "white",
                              padding: "4px",
                              "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.75)",
                              },
                            }}
                          >
                            <NavigateNext fontSize="small" />
                          </IconButton>
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 8,
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              gap: 0.5,
                            }}
                          >
                            {allImages.map((_, i) => (
                              <Box
                                key={i}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCardImageIndices((prev) => ({
                                    ...prev,
                                    [product.id]: i,
                                  }));
                                }}
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  backgroundColor:
                                    i === currentCardIdx
                                      ? "white"
                                      : "rgba(255,255,255,0.5)",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s",
                                }}
                              />
                            ))}
                          </Box>
                        </>
                      )}
                    </CardMedia>
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{
                          backgroundColor: `${BLUE_GREEN}20`,
                          color: BLUE_GREEN,
                          mb: 2,
                        }}
                      />
                      <Typography
                        variant="h6"
                        sx={{
                          mb: 1,
                          fontWeight: "bold",
                          color: MAGENTA,
                          minHeight: "2.5rem",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "text.secondary",
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {product.description}
                      </Typography>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0, display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => handleProductClick(product)}
                        sx={{
                          backgroundColor: BLUE_GREEN,
                          "&:hover": {
                            backgroundColor: MAGENTA,
                          },
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<WhatsApp />}
                        onClick={() => handleWhatsApp(product)}
                        sx={{
                          backgroundColor: "#25D366",
                          "&:hover": {
                            backgroundColor: "#20BA5A",
                          },
                        }}
                      >
                        WhatsApp
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              );
            })
          ) : (
            <Grid size={{ xs: 12 }}>
              <Box sx={{ textAlign: "center", py: 6 }}>
                <Typography variant="h6" color="text.secondary">
                  No products found matching your criteria
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>

      {/* Product Details Modal */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedProduct && (
          <>
            {/* Add Single Product Schema for selected product */}
            <SingleProductSchema product={selectedProduct} />

            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                color: MAGENTA,
                fontWeight: "bold",
              }}
            >
              {selectedProduct.name}
              <Close
                onClick={() => setDetailsOpen(false)}
                sx={{ cursor: "pointer" }}
              />
            </DialogTitle>
            <DialogContent
              dividers
              sx={{ maxHeight: "70vh", overflow: "auto" }}
            >
              {/* Image Gallery */}
              {(() => {
                const allDetailImages = [
                  selectedProduct.image,
                  ...(selectedProduct.images || []),
                ].filter(Boolean);
                return (
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        position: "relative",
                        height: 220,
                        width: "100%",
                        borderRadius: 1,
                        overflow: "hidden",
                        mb: 1,
                      }}
                    >
                      <Image
                        src={allDetailImages[detailImageIndex]}
                        alt={`${selectedProduct.name} view ${detailImageIndex + 1}`}
                        fill
                        sizes="100vw"
                        style={{ objectFit: "cover" }}
                      />
                      {allDetailImages.length > 1 && (
                        <>
                          <IconButton
                            size="small"
                            onClick={() =>
                              setDetailImageIndex(
                                (prev) =>
                                  (prev - 1 + allDetailImages.length) %
                                  allDetailImages.length,
                              )
                            }
                            sx={{
                              position: "absolute",
                              left: 6,
                              top: "50%",
                              transform: "translateY(-50%)",
                              backgroundColor: "rgba(0,0,0,0.5)",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.75)",
                              },
                            }}
                          >
                            <NavigateBefore />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() =>
                              setDetailImageIndex(
                                (prev) => (prev + 1) % allDetailImages.length,
                              )
                            }
                            sx={{
                              position: "absolute",
                              right: 6,
                              top: "50%",
                              transform: "translateY(-50%)",
                              backgroundColor: "rgba(0,0,0,0.5)",
                              color: "white",
                              "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.75)",
                              },
                            }}
                          >
                            <NavigateNext />
                          </IconButton>
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 8,
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              gap: 0.5,
                            }}
                          >
                            {allDetailImages.map((_, i) => (
                              <Box
                                key={i}
                                onClick={() => setDetailImageIndex(i)}
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  backgroundColor:
                                    i === detailImageIndex
                                      ? "white"
                                      : "rgba(255,255,255,0.5)",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s",
                                }}
                              />
                            ))}
                          </Box>
                        </>
                      )}
                    </Box>
                    {/* Thumbnails */}
                    {allDetailImages.length > 1 && (
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          overflowX: "auto",
                          pb: 0.5,
                        }}
                      >
                        {allDetailImages.map((img, i) => (
                          <Box
                            key={i}
                            onClick={() => setDetailImageIndex(i)}
                            sx={{
                              position: "relative",
                              width: 56,
                              height: 56,
                              borderRadius: 1,
                              overflow: "hidden",
                              flexShrink: 0,
                              cursor: "pointer",
                              border:
                                i === detailImageIndex
                                  ? `2px solid ${BLUE_GREEN}`
                                  : "2px solid transparent",
                              opacity: i === detailImageIndex ? 1 : 0.65,
                              transition: "opacity 0.2s, border-color 0.2s",
                              "&:hover": { opacity: 1 },
                            }}
                          >
                            <Image
                              src={img}
                              alt={`Thumbnail ${i + 1}`}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </Box>
                        ))}
                      </Box>
                    )}
                  </Box>
                );
              })()}

              <Typography
                variant="body1"
                sx={{ mb: 3, fontStyle: "italic", color: "text.secondary" }}
              >
                {selectedProduct.description}
              </Typography>

              {selectedProduct.features.length > 0 && (
                <>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: BLUE_GREEN, fontWeight: "bold" }}
                  >
                    Key Features
                  </Typography>
                  <List sx={{ mb: 3 }}>
                    {selectedProduct.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
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
                </>
              )}

              {selectedProduct.specifications.length > 0 && (
                <>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: BLUE_GREEN, fontWeight: "bold" }}
                  >
                    Specifications
                  </Typography>
                  <List sx={{ mb: 3 }}>
                    {selectedProduct.specifications.map((spec, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle sx={{ fontSize: 18, color: MAGENTA }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={spec}
                          primaryTypographyProps={{
                            sx: { fontSize: "0.9rem" },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}

              {selectedProduct.applications.length > 0 && (
                <>
                  <Typography
                    variant="h6"
                    sx={{ mb: 2, color: BLUE_GREEN, fontWeight: "bold" }}
                  >
                    Applications
                  </Typography>
                  <List sx={{ mb: 3 }}>
                    {selectedProduct.applications.map((app, idx) => (
                      <ListItem key={idx} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckCircle sx={{ fontSize: 18, color: GOLD }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={app}
                          primaryTypographyProps={{
                            sx: { fontSize: "0.9rem" },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </DialogContent>
            <DialogActions sx={{ p: 2, gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Download />}
                onClick={() => handleDownloadSpecs(selectedProduct)}
              >
                Download Specs
              </Button>
              <Button
                variant="contained"
                startIcon={<WhatsApp />}
                onClick={() => {
                  handleWhatsApp(selectedProduct);
                  setDetailsOpen(false);
                }}
                sx={{
                  backgroundColor: "#25D366",
                  "&:hover": {
                    backgroundColor: "#20BA5A",
                  },
                }}
              >
                Contact via WhatsApp
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Footer />
    </Box>
  );
}
