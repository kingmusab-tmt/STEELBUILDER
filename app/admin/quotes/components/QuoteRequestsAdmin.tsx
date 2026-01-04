"use client";

import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Chip,
  IconButton,
  useTheme,
  Tab,
  Tabs,
  Pagination,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import AdminHeader from "@/app/admin/components/AdminHeader";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const MAGENTA = "#c41e3a";
const BLUE_GREEN = "#008B8B";

const StyledTableCell = styled(TableCell)({
  fontWeight: 500,
});

interface QuoteRequest {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  location: string;
  productCategory: string;
  productDescription: string;
  specifications?: string;
  quantity?: string;
  budget?: string;
  requirements: string[];
  customRequirements?: string;
  timeline?: string;
  additionalNotes?: string;
  submittedAt: string;
}

function TabPanel(props: any) {
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

export default function QuoteRequestsAdmin() {
  const theme = useTheme();
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch("/api/quote-requests");
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuote = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote request?")) return;

    try {
      const response = await fetch(`/api/quote-requests/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setQuotes(quotes.filter((q) => q._id !== id));
      }
    } catch (error) {
      throw error;
    }
  };

  const handleOpenDetails = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setDetailsOpen(true);
  };

  const handleOpenWhatsApp = (quote: QuoteRequest) => {
    const message = `
Hi, I would like to follow up on my quote request:
Customer: ${quote.firstName} ${quote.lastName}
Company: ${quote.companyName}
Product: ${quote.productCategory}
Submitted: ${new Date(quote.submittedAt).toLocaleDateString()}
    `;
    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = quote.phoneNumber.replace(/\D/g, "");
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  const downloadCSV = () => {
    const headers = [
      "Date",
      "Name",
      "Company",
      "Email",
      "Phone",
      "Category",
      "Description",
      "Budget",
      "Timeline",
    ];
    const rows = quotes.map((q) => [
      new Date(q.submittedAt).toLocaleDateString(),
      `${q.firstName} ${q.lastName}`,
      q.companyName,
      q.email,
      q.phoneNumber,
      q.productCategory,
      q.productDescription,
      q.budget || "Not specified",
      q.timeline || "Not specified",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((cell) => `"${(cell || "").toString().replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quote-requests-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const paginatedQuotes = quotes.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  const pageCount = Math.ceil(quotes.length / itemsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Header />
      <AdminHeader />

      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{ mb: 2, fontWeight: "bold", color: MAGENTA }}
          >
            Quote Requests Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            View and manage all customer quote requests
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
          <Paper sx={{ p: 3, flex: 1, minWidth: 200 }}>
            <Typography variant="h6" color="text.secondary">
              Total Requests
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: MAGENTA }}
            >
              {quotes.length}
            </Typography>
          </Paper>
          <Paper sx={{ p: 3, flex: 1, minWidth: 200 }}>
            <Typography variant="h6" color="text.secondary">
              This Month
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: BLUE_GREEN }}
            >
              {
                quotes.filter((q) => {
                  const date = new Date(q.submittedAt);
                  const now = new Date();
                  return (
                    date.getMonth() === now.getMonth() &&
                    date.getFullYear() === now.getFullYear()
                  );
                }).length
              }
            </Typography>
          </Paper>
        </Box>

        {/* Download Button */}
        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={downloadCSV}
            sx={{
              backgroundColor: BLUE_GREEN,
              "&:hover": { backgroundColor: MAGENTA },
            }}
          >
            Download as CSV
          </Button>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Customer Name</StyledTableCell>
                <StyledTableCell>Company</StyledTableCell>
                <StyledTableCell>Product Category</StyledTableCell>
                <StyledTableCell>Budget</StyledTableCell>
                <StyledTableCell>Timeline</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedQuotes.map((quote) => (
                <TableRow key={quote._id} hover>
                  <TableCell>
                    {new Date(quote.submittedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {quote.firstName} {quote.lastName}
                  </TableCell>
                  <TableCell>{quote.companyName}</TableCell>
                  <TableCell>
                    <Chip
                      label={quote.productCategory}
                      size="small"
                      sx={{
                        backgroundColor: MAGENTA,
                        color: "white",
                      }}
                    />
                  </TableCell>
                  <TableCell>{quote.budget || "Not specified"}</TableCell>
                  <TableCell>{quote.timeline || "Not specified"}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      size="small"
                      onClick={() => handleOpenDetails(quote)}
                      title="View Details"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleOpenWhatsApp(quote)}
                      title="Message on WhatsApp"
                      sx={{ color: "#25D366" }}
                    >
                      <OpenInNewIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteQuote(quote._id)}
                      title="Delete"
                      sx={{ color: "error.main" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {pageCount > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={(e, value) => setPage(value)}
            />
          </Box>
        )}

        {/* Details Dialog */}
        <Dialog
          open={detailsOpen}
          onClose={() => setDetailsOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Quote Request Details</DialogTitle>
          <DialogContent dividers>
            {selectedQuote && (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Personal Information
                  </Typography>
                  <Typography variant="body2">
                    <strong>Name:</strong> {selectedQuote.firstName}{" "}
                    {selectedQuote.lastName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Email:</strong> {selectedQuote.email}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Phone:</strong> {selectedQuote.phoneNumber}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Company:</strong> {selectedQuote.companyName}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Location:</strong>{" "}
                    {selectedQuote.location || "Not specified"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Product Details
                  </Typography>
                  <Typography variant="body2">
                    <strong>Category:</strong> {selectedQuote.productCategory}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Description:</strong>{" "}
                    {selectedQuote.productDescription}
                  </Typography>
                  {selectedQuote.specifications && (
                    <Typography variant="body2">
                      <strong>Specifications:</strong>{" "}
                      {selectedQuote.specifications}
                    </Typography>
                  )}
                  {selectedQuote.quantity && (
                    <Typography variant="body2">
                      <strong>Quantity:</strong> {selectedQuote.quantity}
                    </Typography>
                  )}
                  {selectedQuote.budget && (
                    <Typography variant="body2">
                      <strong>Budget:</strong> {selectedQuote.budget}
                    </Typography>
                  )}
                </Box>

                {selectedQuote.requirements.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Requirements
                    </Typography>
                    {selectedQuote.requirements.map((req, idx) => (
                      <Chip
                        key={idx}
                        label={req}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                )}

                {selectedQuote.customRequirements && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Custom Requirements
                    </Typography>
                    <Typography variant="body2">
                      {selectedQuote.customRequirements}
                    </Typography>
                  </Box>
                )}

                {selectedQuote.timeline && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Timeline
                    </Typography>
                    <Typography variant="body2">
                      {selectedQuote.timeline}
                    </Typography>
                  </Box>
                )}

                {selectedQuote.additionalNotes && (
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Additional Notes
                    </Typography>
                    <Typography variant="body2">
                      {selectedQuote.additionalNotes}
                    </Typography>
                  </Box>
                )}

                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Submitted
                  </Typography>
                  <Typography variant="body2">
                    {new Date(selectedQuote.submittedAt).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDetailsOpen(false)}>Close</Button>
            {selectedQuote && (
              <Button
                variant="contained"
                onClick={() => {
                  handleOpenWhatsApp(selectedQuote);
                  setDetailsOpen(false);
                }}
                sx={{ backgroundColor: "#25D366" }}
              >
                Message on WhatsApp
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </Container>

      <Footer />
    </>
  );
}
