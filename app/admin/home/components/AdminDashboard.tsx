"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tabs,
  Tab,
  CircularProgress,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AdminHeader from "@/app/admin/components/AdminHeader";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  uploadFileToServer,
  isValidImageFile,
  isValidFileSize,
} from "@/utils/uploadHandler";

interface HeroImage {
  id: string;
  url: string;
  title: string;
  order: number;
}

interface Achievement {
  id: string;
  number: number;
  label: string;
  suffix: string;
  order: number;
}

interface Client {
  id: string;
  name: string;
  logo: string;
  order: number;
}

interface Testimonial {
  id: string;
  name: string;
  company: string;
  message: string;
  rating: number;
  image: string;
  order: number;
}

const StyledTableCell = styled(TableCell)({
  fontWeight: 500,
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingType, setUploadingType] = useState<string>("");

  // Hero Images State
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [heroDialogOpen, setHeroDialogOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<HeroImage | null>(null);
  const [heroForm, setHeroForm] = useState({ url: "", title: "" });

  // Achievements State
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [achievementDialogOpen, setAchievementDialogOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] =
    useState<Achievement | null>(null);
  const [achievementForm, setAchievementForm] = useState({
    number: 0,
    label: "",
    suffix: "+" as "+" | "%",
  });

  // Clients State
  const [clients, setClients] = useState<Client[]>([]);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [clientForm, setClientForm] = useState({ name: "", logo: "" });

  // Testimonials State
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimonialDialogOpen, setTestimonialDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] =
    useState<Testimonial | null>(null);
  const [testimonialForm, setTestimonialForm] = useState({
    name: "",
    company: "",
    message: "",
    rating: 5,
    image: "",
  });

  // Load data on mount
  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setLoading(true);
    try {
      const [heroRes, achievementRes, clientRes, testimonialRes] =
        await Promise.all([
          fetch("/api/hero-images"),
          fetch("/api/achievements"),
          fetch("/api/clients"),
          fetch("/api/testimonials"),
        ]);

      if (heroRes.ok) setHeroImages(await heroRes.json());
      if (achievementRes.ok) setAchievements(await achievementRes.json());
      if (clientRes.ok) setClients(await clientRes.json());
      if (testimonialRes.ok) setTestimonials(await testimonialRes.json());
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // File Upload Handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
    onSuccess: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!isValidImageFile(file)) {
      alert("Invalid file type. Please upload an image file.");
      return;
    }

    if (!isValidFileSize(file)) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    setUploading(true);
    setUploadingType(fieldName);
    setUploadProgress(0);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => Math.min(prev + 10, 90));
      }, 100);

      const response = await uploadFileToServer(file);
      clearInterval(progressInterval);
      setUploadProgress(100);

      onSuccess(response.link);
    } catch (error: any) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setUploadingType("");
      // Reset file input
      e.target.value = "";
    }
  };

  // Hero Images Handlers
  const handleAddHero = () => {
    setEditingHero(null);
    setHeroForm({ url: "", title: "" });
    setHeroDialogOpen(true);
  };

  const handleEditHero = (hero: HeroImage) => {
    setEditingHero(hero);
    setHeroForm({ url: hero.url, title: hero.title });
    setHeroDialogOpen(true);
  };

  const handleSaveHero = async () => {
    if (!heroForm.url || !heroForm.title) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (editingHero) {
        const res = await fetch(`/api/hero-images/${editingHero.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(heroForm),
        });
        if (res.ok) {
          setHeroImages(
            heroImages.map((h) =>
              h.id === editingHero.id ? { ...h, ...heroForm } : h
            )
          );
        }
      } else {
        const res = await fetch("/api/hero-images", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...heroForm, order: heroImages.length + 1 }),
        });
        if (res.ok) {
          const newHero = await res.json();
          setHeroImages([newHero, ...heroImages]);
        }
      }
      setHeroDialogOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteHero = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/hero-images/${id}`, { method: "DELETE" });
      if (res.ok) {
        setHeroImages(heroImages.filter((h) => h.id !== id));
      }
    } catch (error) {
      throw error;
    }
  };

  // Achievement Handlers
  const handleAddAchievement = () => {
    setEditingAchievement(null);
    setAchievementForm({ number: 0, label: "", suffix: "+" });
    setAchievementDialogOpen(true);
  };

  const handleEditAchievement = (achievement: Achievement) => {
    setEditingAchievement(achievement);
    setAchievementForm({
      number: achievement.number,
      label: achievement.label,
      suffix: (achievement.suffix || "+") as "+" | "%",
    });
    setAchievementDialogOpen(true);
  };

  const handleSaveAchievement = async () => {
    if (!achievementForm.number || !achievementForm.label) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (editingAchievement) {
        const res = await fetch(`/api/achievements/${editingAchievement.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(achievementForm),
        });
        if (res.ok) {
          setAchievements(
            achievements.map((a) =>
              a.id === editingAchievement.id ? { ...a, ...achievementForm } : a
            )
          );
        }
      } else {
        // Create new achievement
        const res = await fetch("/api/achievements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(achievementForm),
        });
        if (res.ok) {
          const newAchievement = await res.json();
          setAchievements([...achievements, newAchievement]);
        }
      }
      setAchievementDialogOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteAchievement = async (id: string) => {
    if (!confirm("Are you sure you want to delete this achievement?")) return;
    try {
      const res = await fetch(`/api/achievements/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAchievements(achievements.filter((a) => a.id !== id));
      }
    } catch (error) {
      throw error;
    }
  };

  // Client Handlers
  const handleAddClient = () => {
    setEditingClient(null);
    setClientForm({ name: "", logo: "" });
    setClientDialogOpen(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setClientForm({ name: client.name, logo: client.logo });
    setClientDialogOpen(true);
  };

  const handleSaveClient = async () => {
    if (!clientForm.name || !clientForm.logo) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (editingClient) {
        const res = await fetch(`/api/clients/${editingClient.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(clientForm),
        });
        if (res.ok) {
          setClients(
            clients.map((c) =>
              c.id === editingClient.id ? { ...c, ...clientForm } : c
            )
          );
        }
      } else {
        const res = await fetch("/api/clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...clientForm, order: clients.length + 1 }),
        });
        if (res.ok) {
          const newClient = await res.json();
          setClients([newClient, ...clients]);
        }
      }
      setClientDialogOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/clients/${id}`, { method: "DELETE" });
      if (res.ok) {
        setClients(clients.filter((c) => c.id !== id));
      }
    } catch (error) {
      throw error;
    }
  };

  // Testimonial Handlers
  const handleAddTestimonial = () => {
    setEditingTestimonial(null);
    setTestimonialForm({
      name: "",
      company: "",
      message: "",
      rating: 5,
      image: "",
    });
    setTestimonialDialogOpen(true);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setTestimonialForm({
      name: testimonial.name,
      company: testimonial.company,
      message: testimonial.message,
      rating: testimonial.rating,
      image: testimonial.image,
    });
    setTestimonialDialogOpen(true);
  };

  const handleSaveTestimonial = async () => {
    if (
      !testimonialForm.name ||
      !testimonialForm.company ||
      !testimonialForm.message
    ) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (editingTestimonial) {
        const res = await fetch(`/api/testimonials/${editingTestimonial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(testimonialForm),
        });
        if (res.ok) {
          setTestimonials(
            testimonials.map((t) =>
              t.id === editingTestimonial.id ? { ...t, ...testimonialForm } : t
            )
          );
        }
      } else {
        const res = await fetch("/api/testimonials", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...testimonialForm,
            order: testimonials.length + 1,
          }),
        });
        if (res.ok) {
          const newTestimonial = await res.json();
          setTestimonials([newTestimonial, ...testimonials]);
        }
      }
      setTestimonialDialogOpen(false);
    } catch (error) {
      throw error;
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials(testimonials.filter((t) => t.id !== id));
      }
    } catch (error) {
      throw error;
    }
  };

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

  return (
    <>
      <AdminHeader />
      <Header />
      <Container maxWidth="lg" sx={{ py: 4, minHeight: "100vh" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.push("/admin")}
            sx={{
              textTransform: "none",
              color: "#008B8B",
              "&:hover": { backgroundColor: "#008B8B10" },
            }}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h3" sx={{ fontWeight: 700 }}>
            Admin Dashboard - Home Page
          </Typography>
        </Box>

        <Paper sx={{ borderRadius: 2 }}>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab
              label="Hero Images"
              id="admin-tab-0"
              aria-controls="admin-tabpanel-0"
            />
            <Tab
              label="Achievements"
              id="admin-tab-1"
              aria-controls="admin-tabpanel-1"
            />
            <Tab
              label="Clients"
              id="admin-tab-2"
              aria-controls="admin-tabpanel-2"
            />
            <Tab
              label="Testimonials"
              id="admin-tab-3"
              aria-controls="admin-tabpanel-3"
            />
          </Tabs>

          {/* Hero Images Tab */}
          <TabPanel value={tabValue} index={0}>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddHero}
                sx={{ mb: 2 }}
              >
                Add Hero Image
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <StyledTableCell>Title</StyledTableCell>
                    <StyledTableCell>Image URL</StyledTableCell>
                    <StyledTableCell>Preview</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {heroImages.map((hero) => (
                    <TableRow key={hero.id}>
                      <TableCell>{hero.title}</TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 300,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {hero.url}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            width: 80,
                            height: 60,
                            backgroundImage: `url(${hero.url})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: 1,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleEditHero(hero)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteHero(hero.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Achievements Tab */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddAchievement}
                sx={{ mb: 2 }}
              >
                Add Achievement
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <StyledTableCell>Label</StyledTableCell>
                    <StyledTableCell>Number</StyledTableCell>
                    <StyledTableCell>Suffix</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {achievements.map((achievement) => (
                    <TableRow key={achievement.id}>
                      <TableCell>{achievement.label}</TableCell>
                      <TableCell>{achievement.number}</TableCell>
                      <TableCell>{achievement.suffix || "+"}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleEditAchievement(achievement)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleDeleteAchievement(achievement.id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Clients Tab */}
          <TabPanel value={tabValue} index={2}>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddClient}
                sx={{ mb: 2 }}
              >
                Add Client
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <StyledTableCell>Company Name</StyledTableCell>
                    <StyledTableCell>Logo URL</StyledTableCell>
                    <StyledTableCell>Preview</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell>{client.name}</TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 300,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {client.logo}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            width: 80,
                            height: 60,
                            backgroundImage: `url(${client.logo})`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                            borderRadius: 1,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleEditClient(client)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClient(client.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          {/* Testimonials Tab */}
          <TabPanel value={tabValue} index={3}>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddTestimonial}
                sx={{ mb: 2 }}
              >
                Add Testimonial
              </Button>
            </Box>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Company</StyledTableCell>
                    <StyledTableCell>Message</StyledTableCell>
                    <StyledTableCell>Rating</StyledTableCell>
                    <StyledTableCell align="right">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {testimonials.map((testimonial) => (
                    <TableRow key={testimonial.id}>
                      <TableCell>{testimonial.name}</TableCell>
                      <TableCell>{testimonial.company}</TableCell>
                      <TableCell
                        sx={{
                          maxWidth: 300,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {testimonial.message}
                      </TableCell>
                      <TableCell>{"⭐".repeat(testimonial.rating)}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          onClick={() => handleEditTestimonial(testimonial)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleDeleteTestimonial(testimonial.id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Paper>
      </Container>

      {/* Hero Image Dialog */}
      <Dialog
        open={heroDialogOpen}
        onClose={() => setHeroDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingHero ? "Edit Hero Image" : "Add Hero Image"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Title"
            value={heroForm.title}
            onChange={(e) =>
              setHeroForm({ ...heroForm, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Hero Image
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              disabled={uploading && uploadingType === "hero"}
              fullWidth
              sx={{
                textTransform: "none",
                borderColor: "#008B8B",
                color: "#008B8B",
                "&:hover": { backgroundColor: "#008B8B10" },
              }}
            >
              {uploading && uploadingType === "hero"
                ? "Uploading..."
                : "Upload Image"}
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) =>
                  handleFileUpload(e, "hero", (url) =>
                    setHeroForm({ ...heroForm, url })
                  )
                }
                disabled={uploading}
              />
            </Button>
            {uploading && uploadingType === "hero" && (
              <LinearProgress variant="determinate" value={uploadProgress} />
            )}
            {heroForm.url && (
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
                  sx={{ mt: 0.5, color: "#008B8B" }}
                >
                  {heroForm.url}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setHeroDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveHero} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Achievement Dialog */}
      <Dialog
        open={achievementDialogOpen}
        onClose={() => setAchievementDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Achievement</DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Label"
            value={achievementForm.label}
            onChange={(e) =>
              setAchievementForm({ ...achievementForm, label: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Number"
            type="number"
            value={achievementForm.number}
            onChange={(e) =>
              setAchievementForm({
                ...achievementForm,
                number: parseInt(e.target.value) || 0,
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Suffix"
            value={achievementForm.suffix}
            onChange={(e) =>
              setAchievementForm({
                ...achievementForm,
                suffix: e.target.value as "+" | "%",
              })
            }
            SelectProps={{
              native: true,
            }}
          >
            <option value="+">+ (Plus)</option>
            <option value="%">% (Percent)</option>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAchievementDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveAchievement} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Client Dialog */}
      <Dialog
        open={clientDialogOpen}
        onClose={() => setClientDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingClient ? "Edit Client" : "Add Client"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Company Name"
            value={clientForm.name}
            onChange={(e) =>
              setClientForm({ ...clientForm, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Client Logo
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              disabled={uploading && uploadingType === "client"}
              fullWidth
              sx={{
                textTransform: "none",
                borderColor: "#008B8B",
                color: "#008B8B",
                "&:hover": { backgroundColor: "#008B8B10" },
              }}
            >
              {uploading && uploadingType === "client"
                ? "Uploading..."
                : "Upload Logo"}
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) =>
                  handleFileUpload(e, "client", (url) =>
                    setClientForm({ ...clientForm, logo: url })
                  )
                }
                disabled={uploading}
              />
            </Button>
            {uploading && uploadingType === "client" && (
              <LinearProgress variant="determinate" value={uploadProgress} />
            )}
            {clientForm.logo && (
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
                  Current Logo URL:
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ mt: 0.5, color: "#008B8B" }}
                >
                  {clientForm.logo}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClientDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveClient} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Testimonial Dialog */}
      <Dialog
        open={testimonialDialogOpen}
        onClose={() => setTestimonialDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingTestimonial ? "Edit Testimonial" : "Add Testimonial"}
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <TextField
            fullWidth
            label="Name"
            value={testimonialForm.name}
            onChange={(e) =>
              setTestimonialForm({ ...testimonialForm, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Company"
            value={testimonialForm.company}
            onChange={(e) =>
              setTestimonialForm({
                ...testimonialForm,
                company: e.target.value,
              })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Message"
            value={testimonialForm.message}
            onChange={(e) =>
              setTestimonialForm({
                ...testimonialForm,
                message: e.target.value,
              })
            }
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Rating (1-5)"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={testimonialForm.rating}
            onChange={(e) =>
              setTestimonialForm({
                ...testimonialForm,
                rating: parseInt(e.target.value),
              })
            }
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Testimonial Image
            </Typography>
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              disabled={uploading && uploadingType === "testimonial"}
              fullWidth
              sx={{
                textTransform: "none",
                borderColor: "#008B8B",
                color: "#008B8B",
                "&:hover": { backgroundColor: "#008B8B10" },
              }}
            >
              {uploading && uploadingType === "testimonial"
                ? "Uploading..."
                : "Upload Image"}
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={(e) =>
                  handleFileUpload(e, "testimonial", (url) =>
                    setTestimonialForm({ ...testimonialForm, image: url })
                  )
                }
                disabled={uploading}
              />
            </Button>
            {uploading && uploadingType === "testimonial" && (
              <LinearProgress variant="determinate" value={uploadProgress} />
            )}
            {testimonialForm.image && (
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
                  sx={{ mt: 0.5, color: "#008B8B" }}
                >
                  {testimonialForm.image}
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTestimonialDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSaveTestimonial} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Footer />
    </>
  );
}
