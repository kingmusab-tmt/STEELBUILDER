"use client";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BreadcrumbNav from "@/app/components/BreadcrumbNav";
import {
  Box,
  Container,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { MAGENTA, BLUE_GREEN } from "@/app/theme/theme";

// WebPage Schema for SEO
const termsSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Service",
  description:
    "Steel Builders Technical Engineering Ltd terms and conditions for using our products and services",
  url: "https://steelbuilders.com.ng/terms",
  isPartOf: {
    "@type": "WebSite",
    name: "Steel Builders Technical Engineering Ltd",
    url: "https://steelbuilders.com.ng",
  },
  inLanguage: "en-NG",
  datePublished: "2024-01-01",
  dateModified: "2026-01-04",
  publisher: {
    "@type": "LocalBusiness",
    name: "Steel Builders Technical Engineering Ltd",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Epe Industrial Area",
      addressLocality: "Lagos",
      addressRegion: "Lagos",
      postalCode: "106101",
      addressCountry: "NG",
    },
  },
};

export default function TermsPageContent() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using the Steel Builders Technical Engineering Ltd website and services, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.",
    },
    {
      title: "2. Services Description",
      content:
        "Steel Builders Technical Engineering Ltd provides industrial machinery manufacturing, fabrication, installation, and maintenance services, including:",
      items: [
        "Block molding machines and industrial equipment manufacturing",
        "Custom fabrication and welding services",
        "Stone crushers and processing equipment",
        "Installation and commissioning services",
        "Maintenance, repair, and technical support",
        "Consultation and project management services",
      ],
    },
    {
      title: "3. User Obligations",
      content:
        "When using our services and website, you agree to:",
      items: [
        "Provide accurate and complete information in all communications",
        "Maintain the confidentiality of your account credentials",
        "Use our services only for lawful purposes",
        "Not engage in any activity that disrupts or interferes with our services",
        "Respect intellectual property rights of Steel Builders and third parties",
        "Comply with all applicable Nigerian and international laws",
        "Not attempt to gain unauthorized access to our systems",
      ],
    },
    {
      title: "4. Quotes and Pricing",
      content:
        "Regarding our pricing and quotations:",
      items: [
        "All quotes are valid for 30 days unless otherwise stated",
        "Prices are subject to change based on material costs and specifications",
        "Final pricing will be confirmed in writing before project commencement",
        "Additional charges may apply for custom specifications or rush orders",
        "All prices are in Nigerian Naira (NGN) unless specified otherwise",
        "Quotes do not include shipping, installation, or taxes unless stated",
      ],
    },
    {
      title: "5. Orders and Payment Terms",
      content:
        "Our order and payment policies include:",
      items: [
        "Orders are confirmed upon receipt of deposit or full payment as agreed",
        "Standard payment terms: 50% deposit, 50% upon delivery/installation",
        "Large projects may have milestone-based payment schedules",
        "Accepted payment methods: Bank transfer, cash, certified cheque",
        "Late payments may incur interest charges as per Nigerian law",
        "Ownership of equipment transfers only upon full payment",
      ],
    },
    {
      title: "6. Delivery and Installation",
      content:
        "For product delivery and installation:",
      items: [
        "Delivery timelines are estimates and may vary based on production schedules",
        "Customer is responsible for providing suitable installation site",
        "Installation services are available at additional cost",
        "Access requirements and site preparation are customer's responsibility",
        "Force majeure events may affect delivery schedules",
        "Customer must inspect goods upon delivery and report damages within 48 hours",
      ],
    },
    {
      title: "7. Warranties and Guarantees",
      content:
        "Our warranty terms:",
      items: [
        "All products come with a manufacturer's warranty (duration varies by product)",
        "Warranty covers manufacturing defects and workmanship issues",
        "Warranty does not cover misuse, negligence, or unauthorized modifications",
        "Regular maintenance as per our guidelines is required to maintain warranty",
        "Warranty claims must be reported within the warranty period",
        "We reserve the right to repair or replace defective items at our discretion",
      ],
    },
    {
      title: "8. Limitation of Liability",
      content:
        "To the maximum extent permitted by law:",
      items: [
        "We are not liable for indirect, incidental, or consequential damages",
        "Our total liability is limited to the amount paid for the specific product/service",
        "We are not responsible for delays caused by circumstances beyond our control",
        "Customer assumes all risks for improper use or operation of equipment",
        "We are not liable for third-party products or services",
        "Business interruption or loss of profits are excluded from liability",
      ],
    },
    {
      title: "9. Intellectual Property Rights",
      content:
        "All content on our website and in our materials is protected:",
      items: [
        "Steel Builders owns all trademarks, logos, and brand elements",
        "Website content, designs, and documentation are copyrighted",
        "Custom designs and specifications remain our intellectual property",
        "You may not reproduce, distribute, or create derivative works without permission",
        "Product images and technical drawings are proprietary information",
        "Any feedback or suggestions you provide may be used without compensation",
      ],
    },
    {
      title: "10. Cancellation and Refund Policy",
      content:
        "For order cancellations and refunds:",
      items: [
        "Cancellations must be made in writing before production begins",
        "Deposits are non-refundable once production has commenced",
        "Custom-made items cannot be cancelled after production starts",
        "Cancellation fees may apply to cover incurred costs",
        "Refunds are processed within 30 days of approved cancellation",
        "Installation and service fees are non-refundable after services rendered",
      ],
    },
    {
      title: "11. Dispute Resolution",
      content:
        "In case of disputes:",
      items: [
        "Parties agree to attempt good-faith negotiation first",
        "Mediation will be conducted before litigation if negotiation fails",
        "Disputes will be governed by the laws of the Federal Republic of Nigeria",
        "Lagos State courts have exclusive jurisdiction",
        "Arbitration may be pursued as an alternative to litigation",
        "Legal fees may be awarded to the prevailing party",
      ],
    },
    {
      title: "12. Privacy and Data Protection",
      content:
        "Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information. By using our services, you consent to our data practices as described in the Privacy Policy.",
    },
    {
      title: "13. Indemnification",
      content:
        "You agree to indemnify and hold harmless Steel Builders Technical Engineering Ltd, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from:",
      items: [
        "Your violation of these Terms of Service",
        "Your misuse of our products or services",
        "Your violation of any laws or third-party rights",
        "Negligent or willful misconduct in using our equipment",
      ],
    },
    {
      title: "14. Governing Law",
      content:
        "These Terms of Service are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Lagos State, Nigeria.",
    },
    {
      title: "15. Contact Information",
      content:
        "For questions about these Terms of Service, please contact us:",
      items: [
        "Email: steelbuilderseng@gmail.com",
        "Phone: +234 813 615 0837",
        "Address: Epe Industrial Area, Lagos, Nigeria 106101",
        "Business Hours: Monday - Saturday, 8:00 AM - 6:00 PM WAT",
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(termsSchema) }}
      />
      <Header />
      <BreadcrumbNav />

      <Box sx={{ minHeight: "100vh", py: 8 }}>
        <Container maxWidth="lg">
          {/* Page Header */}
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: MAGENTA,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Terms of Service
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: "auto" }}
            >
              Please read these terms and conditions carefully before using
              Steel Builders Technical Engineering Ltd services and products.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Last Updated: January 4, 2026
            </Typography>
          </Box>

          <Divider sx={{ mb: 4, borderColor: BLUE_GREEN }} />

          {/* Introduction */}
          <Box mb={6}>
            <Typography variant="body1" paragraph>
              These Terms of Service ("Terms") constitute a legally binding
              agreement between you and Steel Builders Technical Engineering
              Ltd regarding your use of our website, products, and services.
              These Terms apply to all visitors, users, and customers who
              access or use our services.
            </Typography>
            <Typography variant="body1" paragraph>
              Please read these Terms carefully. By accessing or using any part
              of our services, you acknowledge that you have read, understood,
              and agree to be bound by these Terms. If you do not agree to all
              the terms and conditions, you may not access or use our services.
            </Typography>
          </Box>

          {/* Terms Sections */}
          {sections.map((section, index) => (
            <Box key={index} mb={5}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: MAGENTA,
                  mb: 2,
                }}
              >
                {section.title}
              </Typography>
              <Typography variant="body1" paragraph>
                {section.content}
              </Typography>
              {section.items && (
                <List sx={{ pl: 2 }}>
                  {section.items.map((item, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5, px: 0 }}>
                      <ListItemText
                        primary={`• ${item}`}
                        primaryTypographyProps={{
                          variant: "body1",
                          color: "text.secondary",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          ))}

          <Divider sx={{ my: 4, borderColor: BLUE_GREEN }} />

          {/* Acceptance Note */}
          <Box
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
              p: 3,
              borderRadius: 2,
              borderLeft: `4px solid ${BLUE_GREEN}`,
            }}
          >
            <Typography variant="body1" gutterBottom fontWeight="bold">
              Agreement Acknowledgment
            </Typography>
            <Typography variant="body2" color="text.secondary">
              By using our website and services, you acknowledge that you have
              read and understood these Terms of Service and agree to be bound
              by them. These terms may be updated from time to time, and
              continued use of our services constitutes acceptance of any
              modifications.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
