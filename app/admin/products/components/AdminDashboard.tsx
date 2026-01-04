"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Alert,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { Edit, Delete, Add, CloudUpload, ArrowBack } from "@mui/icons-material";
import { MAGENTA, BLUE_GREEN } from "../../../theme/theme";
import AdminHeader from "@/app/admin/components/AdminHeader";
import {
  uploadFileToServer,
  isValidImageFile,
  isValidFileSize,
} from "@/utils/uploadHandler";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specifications: string[];
  applications: string[];
  features: string[];
  createdAt: string;
}

interface FormData {
  name: string;
  category: string;
  description: string;
  image: string;
  specifications: string;
  applications: string;
  features: string;
}

export default function AdminProductsDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    description: "",
    image: "",
    specifications: "",
    applications: "",
    features: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch {
      setMessage("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        category: product.category,
        description: product.description,
        image: product.image,
        specifications: product.specifications.join("\n"),
        applications: product.applications.join("\n"),
        features: product.features.join("\n"),
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        category: "",
        description: "",
        image: "",
        specifications: "",
        applications: "",
        features: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingId(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!isValidImageFile(file)) {
      setMessage("Invalid file type. Please upload an image file.");
      return;
    }

    if (!isValidFileSize(file)) {
      setMessage("File is too large. Maximum size is 5MB.");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const response = await uploadFileToServer(file);
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Update form with the uploaded image URL
      setFormData((prev) => ({
        ...prev,
        image: response.link,
      }));

      setMessage("Image uploaded successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error: any) {
      setMessage(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      // Reset file input
      e.target.value = "";
    }
  };

  const handleSaveProduct = async () => {
    if (!formData.name || !formData.category) {
      setMessage("Name and Category are required");
      return;
    }

    const productData = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      image: formData.image,
      specifications: formData.specifications
        .split("\n")
        .filter((s) => s.trim()),
      applications: formData.applications.split("\n").filter((a) => a.trim()),
      features: formData.features.split("\n").filter((f) => f.trim()),
    };

    try {
      let response;
      if (editingId) {
        response = await fetch(`/api/products/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        if (!response.ok) {
          const error = await response.json();
          setMessage(
            `Error updating product: ${error.error || "Unknown error"}`
          );
          return;
        }
        setMessage("Product updated successfully");
      } else {
        response = await fetch("/api/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        if (!response.ok) {
          const error = await response.json();
          setMessage(
            `Error creating product: ${error.error || "Unknown error"}`
          );
          return;
        }
        setMessage("Product created successfully");
      }

      handleCloseDialog();
      fetchProducts();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Save error:", error);
      setMessage("Error saving product");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Product deleted successfully");
        fetchProducts();
        setTimeout(() => setMessage(""), 3000);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error || "Failed to delete product"}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Error deleting product");
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 8, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <>
      <AdminHeader />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => router.push("/admin")}
            sx={{ mb: 2 }}
          >
            Back to Dashboard
          </Button>
          <Typography
            variant="h3"
            sx={{ mb: 2, fontWeight: "bold", color: MAGENTA }}
          >
            Admin Dashboard - Products Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your product catalog - Add, edit, or delete products
          </Typography>
        </Box>

        {message && (
          <Alert
            severity={message.includes("Error") ? "error" : "success"}
            onClose={() => setMessage("")}
            sx={{ mb: 3 }}
          >
            {message}
          </Alert>
        )}

        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => handleOpenDialog()}
            sx={{
              backgroundColor: BLUE_GREEN,
              "&:hover": { backgroundColor: MAGENTA },
            }}
          >
            Add New Product
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: `${BLUE_GREEN}20` }}>
                <TableCell sx={{ fontWeight: "bold", color: MAGENTA }}>
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: MAGENTA }}>
                  Category
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: MAGENTA }}>
                  Description
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: MAGENTA }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 300,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {product.description}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(product)}
                      sx={{ color: BLUE_GREEN }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteProduct(product.id)}
                      sx={{ color: MAGENTA }}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {products.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography color="text.secondary">
              No products yet. Create your first product!
            </Typography>
          </Box>
        )}

        {/* Product Form Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ color: MAGENTA, fontWeight: "bold" }}>
            {editingId ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogContent
            sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g., QTJ4-40 Block Making Machine"
            />
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="e.g., Block Molding"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              placeholder="Product description..."
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Product Image
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                disabled={uploading}
                fullWidth
                sx={{
                  textTransform: "none",
                  borderColor: BLUE_GREEN,
                  color: BLUE_GREEN,
                  "&:hover": { backgroundColor: `${BLUE_GREEN}10` },
                }}
              >
                {uploading ? "Uploading..." : "Upload Image"}
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </Button>
              {uploading && (
                <LinearProgress variant="determinate" value={uploadProgress} />
              )}
              {formData.image && (
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "#f5f5f5",
                    borderRadius: 1,
                    fontSize: "0.875rem",
                    wordBreak: "break-all",
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Current Image URL:
                  </Typography>
                  <Typography
                    variant="caption"
                    display="block"
                    sx={{ mt: 0.5, color: BLUE_GREEN }}
                  >
                    {formData.image}
                  </Typography>
                </Box>
              )}
            </Box>
            <TextField
              fullWidth
              label="Specifications (one per line)"
              name="specifications"
              value={formData.specifications}
              onChange={handleInputChange}
              multiline
              rows={3}
              placeholder="Power: 9.6 kW&#10;Cycle Time: 35-40 seconds"
            />
            <TextField
              fullWidth
              label="Features (one per line)"
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              multiline
              rows={3}
              placeholder="Stationary & Semi-Automatic&#10;Powerful vibration system"
            />
            <TextField
              fullWidth
              label="Applications (one per line)"
              name="applications"
              value={formData.applications}
              onChange={handleInputChange}
              multiline
              rows={3}
              placeholder="Concrete blocks&#10;Paving stones"
            />
          </DialogContent>
          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveProduct}
              sx={{
                backgroundColor: BLUE_GREEN,
                "&:hover": { backgroundColor: MAGENTA },
              }}
            >
              {editingId ? "Update Product" : "Create Product"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
