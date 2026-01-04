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
const privacySchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Privacy Policy",
  description:
    "Steel Builders Technical Engineering Ltd privacy policy and data protection practices",
  url: "https://steelbuilders.com.ng/privacy",
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

export default function PrivacyPageContent() {
  const sections = [
    {
      title: "1. Information We Collect",
      content:
        "We collect information that you provide directly to us, including:",
      items: [
        "Personal identification information (name, email address, phone number)",
        "Business information (company name, industry, location)",
        "Technical data (IP address, browser type, device information)",
        "Communication records (emails, phone calls, chat messages)",
        "Quote requests and project specifications",
        "Payment and billing information",
      ],
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the collected information for the following purposes:",
      items: [
        "Processing and fulfilling your orders and quote requests",
        "Providing customer support and technical assistance",
        "Improving our products, services, and website functionality",
        "Sending important updates about your orders and services",
        "Marketing communications (with your consent)",
        "Analyzing website usage and user behavior",
        "Complying with legal obligations and preventing fraud",
      ],
    },
    {
      title: "3. Information Sharing and Disclosure",
      content:
        "We do not sell your personal information. We may share your data with:",
      items: [
        "Service providers who assist in our operations (payment processors, shipping companies)",
        "Business partners for collaborative projects (with your consent)",
        "Legal authorities when required by law or to protect our rights",
        "Professional advisors (lawyers, accountants, auditors)",
        "In connection with a business transfer, merger, or acquisition",
      ],
    },
    {
      title: "4. Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information:",
      items: [
        "SSL/TLS encryption for data transmission",
        "Secure storage systems with access controls",
        "Regular security assessments and updates",
        "Employee training on data protection practices",
        "Incident response procedures for data breaches",
      ],
    },
    {
      title: "5. Cookies and Tracking Technologies",
      content:
        "Our website uses cookies and similar technologies to enhance user experience:",
      items: [
        "Essential cookies for website functionality",
        "Analytics cookies to understand user behavior",
        "Preference cookies to remember your settings",
        "Marketing cookies for targeted advertising (with consent)",
        "You can control cookie preferences through your browser settings",
      ],
    },
    {
      title: "6. Your Rights and Choices",
      content:
        "You have the following rights regarding your personal information:",
      items: [
        "Access: Request a copy of your personal data",
        "Correction: Update or correct inaccurate information",
        "Deletion: Request deletion of your data (subject to legal obligations)",
        "Objection: Object to certain processing activities",
        "Portability: Receive your data in a structured format",
        "Withdraw Consent: Opt-out of marketing communications anytime",
      ],
    },
    {
      title: "7. Data Retention",
      content:
        "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, including:",
      items: [
        "Active customer accounts: Duration of business relationship plus 7 years",
        "Quote requests: 2 years from last contact",
        "Marketing communications: Until you unsubscribe",
        "Legal obligations: As required by Nigerian and international law",
        "Transaction records: 10 years for accounting purposes",
      ],
    },
    {
      title: "8. International Data Transfers",
      content:
        "Your information may be transferred to and processed in countries outside Nigeria. We ensure appropriate safeguards:",
      items: [
        "Standard contractual clauses approved by data protection authorities",
        "Adequacy decisions for countries with equivalent protection",
        "Privacy Shield certification where applicable",
        "Binding corporate rules for intra-group transfers",
      ],
    },
    {
      title: "9. Children's Privacy",
      content:
        "Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information.",
    },
    {
      title: "10. Third-Party Links",
      content:
        "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.",
    },
    {
      title: "11. Changes to This Privacy Policy",
      content:
        "We may update this privacy policy from time to time. We will notify you of any material changes by:",
      items: [
        "Posting the updated policy on our website",
        "Updating the 'Last Modified' date",
        "Sending email notifications for significant changes",
        "Providing notice on our homepage",
      ],
    },
    {
      title: "12. Contact Information",
      content:
        "If you have questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:",
      items: [
        "Email: steelbuilderseng@gmail.com",
        "Phone: +234 813 615 0837",
        "Address: Epe Industrial Area, Lagos, Nigeria 106101",
        "Data Protection Officer: Available upon request",
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacySchema) }}
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
              Privacy Policy
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 800, mx: "auto" }}
            >
              Your privacy is important to us. This policy outlines how Steel
              Builders Technical Engineering Ltd collects, uses, and protects
              your personal information.
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Last Updated: January 4, 2026
            </Typography>
          </Box>

          <Divider sx={{ mb: 4, borderColor: BLUE_GREEN }} />

          {/* Introduction */}
          <Box mb={6}>
            <Typography variant="body1" paragraph>
              Steel Builders Technical Engineering Ltd ("we," "our," or "us") is
              committed to protecting your privacy and ensuring the security of
              your personal information. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your data when you visit our
              website, use our services, or interact with us.
            </Typography>
            <Typography variant="body1" paragraph>
              By using our website and services, you agree to the collection and
              use of information in accordance with this policy. If you do not
              agree with our policies and practices, please do not use our
              services.
            </Typography>
          </Box>

          {/* Policy Sections */}
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

          {/* Footer Note */}
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
              Your Consent
            </Typography>
            <Typography variant="body2" color="text.secondary">
              By using our website and services, you hereby consent to our
              Privacy Policy and agree to its terms. We encourage you to review
              this policy periodically for any updates or changes.
            </Typography>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  );
}
