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
  Card,
  CardMedia,
  LinearProgress,
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  Image as ImageIcon,
  CloudUpload,
  ArrowBack,
} from "@mui/icons-material";
import Image from "next/image";
import { MAGENTA, BLUE_GREEN } from "../../../theme/theme";
import AdminHeader from "@/app/admin/components/AdminHeader";
import {
  uploadFileToServer,
  isValidImageFile,
  isValidFileSize,
} from "@/utils/uploadHandler";

interface GalleryItem {
  id: string;
  title: string;
  image: string;
  createdAt: string;
}

interface FormData {
  title: string;
  image: string;
}

export default function AdminGalleryDashboard() {
  const router = useRouter();
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    image: "",
  });

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setGallery(data);
    } catch {
      setMessage("Error fetching gallery");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item?: GalleryItem) => {
    if (item) {
      setEditingId(item.id);
      setFormData({
        title: item.title,
        image: item.image,
      });
    } else {
      setEditingId(null);
      setFormData({
        title: "",
        image: "",
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

  const handleSaveItem = async () => {
    if (!formData.title || !formData.image) {
      setMessage("Title and Image URL are required");
      return;
    }

    try {
      let response;
      if (editingId) {
        response = await fetch(`/api/gallery/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setMessage("Gallery item updated successfully");
      } else {
        response = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        setMessage("Gallery item created successfully");
      }

      if (response.ok) {
        handleCloseDialog();
        fetchGallery();
      }
    } catch {
      setMessage("Error saving gallery item");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this gallery item?")) {
      return;
    }

    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Gallery item deleted successfully");
        fetchGallery();
      }
    } catch {
      setMessage("Error deleting gallery item");
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
            Admin Dashboard - Gallery Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your project gallery - Add, edit, or delete gallery items
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
            Add New Gallery Item
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: `${BLUE_GREEN}20` }}>
                <TableCell sx={{ fontWeight: "bold", color: MAGENTA }}>
                  Preview
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: MAGENTA }}>
                  Title
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: MAGENTA }}>
                  Image URL
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: MAGENTA }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {gallery.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box
                      sx={{
                        position: "relative",
                        width: 80,
                        height: 60,
                        borderRadius: 1,
                        overflow: "hidden",
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                        style={{ objectFit: "cover" }}
                      />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{item.title}</TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 200,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.image}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDialog(item)}
                      sx={{ color: BLUE_GREEN }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteItem(item.id)}
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

        {gallery.length === 0 && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <Typography color="text.secondary">
              No gallery items yet. Create your first item!
            </Typography>
          </Box>
        )}

        {/* Gallery Item Form Dialog */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ color: MAGENTA, fontWeight: "bold" }}>
            {editingId ? "Edit Gallery Item" : "Add New Gallery Item"}
          </DialogTitle>
          <DialogContent
            sx={{ pt: 3, display: "flex", flexDirection: "column", gap: 2 }}
          >
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., Block Molding Machine Installation"
              required
            />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Gallery Image
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
            {formData.image && (
              <Card>
                <CardMedia
                  sx={{
                    height: 200,
                    position: "relative",
                    backgroundColor: "grey.200",
                  }}
                >
                  {formData.image.startsWith("/") ||
                  formData.image.startsWith("http") ? (
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      sizes="100vw"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <ImageIcon sx={{ fontSize: 60, color: "grey.400" }} />
                    </Box>
                  )}
                </CardMedia>
              </Card>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 2, gap: 1 }}>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleSaveItem}
              sx={{
                backgroundColor: BLUE_GREEN,
                "&:hover": { backgroundColor: MAGENTA },
              }}
            >
              {editingId ? "Update Item" : "Create Item"}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}
