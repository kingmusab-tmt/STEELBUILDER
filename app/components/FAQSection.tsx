"use client";

import React from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { MAGENTA, BLUE_GREEN } from "../theme/theme";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQList: FAQItem[] = [
  {
    question: "What is a block molding machine?",
    answer:
      "A block molding machine is industrial equipment designed to automatically mold concrete blocks, paving stones, and similar products. Steel Builders offers high-quality, durable machines for various production scales, from small-scale operations to large industrial facilities.",
  },
  {
    question: "How much does industrial machinery cost?",
    answer:
      "Industrial machinery pricing varies based on specifications, production capacity, and customization requirements. Steel Builders offers competitive pricing in Nigerian Naira (NGN), typically ranging from NGN 1,000,000 to NGN 50,000,000. Contact us for a customized quote tailored to your specific needs.",
  },
  {
    question: "What are the benefits of automation in machinery?",
    answer:
      "Automation increases production efficiency by up to 300%, reduces labor costs by 40-60%, improves product consistency and quality, minimizes human error, enhances workplace safety, and allows 24/7 operation. Steel Builders provides fully automated and semi-automated solutions to match your operational requirements.",
  },
  {
    question: "What maintenance is required for Stone Crusher machines?",
    answer:
      "Regular maintenance includes checking wear parts every 500 operating hours, lubrication of moving components weekly, alignment checks monthly, periodic deep cleaning, and replacement of consumables as needed. Steel Builders provides comprehensive maintenance support, training programs, and genuine spare parts to ensure optimal performance.",
  },
  {
    question: "How long does machinery installation take?",
    answer:
      "Installation timelines vary based on equipment complexity and site conditions. Typically, installation takes 2-6 weeks for standard equipment and up to 12 weeks for large custom installations. Steel Builders provides complete installation, commissioning services, and operator training to ensure smooth operations from day one.",
  },
  {
    question: "Do you offer machinery training?",
    answer:
      "Yes, Steel Builders provides comprehensive operator training and technical support for all equipment. Our training programs include hands-on instruction, safety protocols, maintenance procedures, troubleshooting guides, and ongoing technical support to ensure optimal performance and longevity of your machinery.",
  },
  {
    question: "What areas in Nigeria do you serve?",
    answer:
      "Steel Builders serves all states in Nigeria, with primary focus on Lagos, Ogun, Oyo, and Abuja. We provide installation, maintenance, and support services nationwide. Our headquarters is located in Epe, Lagos State, with service teams available across the country.",
  },
  {
    question: "What payment options are available?",
    answer:
      "We offer flexible payment options including outright purchase, installment plans, and lease-to-own arrangements. Payments can be made via bank transfer, direct deposit, or other agreed methods in Nigerian Naira (NGN). Contact our sales team to discuss the best payment plan for your business.",
  },
  {
    question: "Do you provide after-sales support?",
    answer:
      "Yes, Steel Builders provides comprehensive after-sales support including 24/7 technical assistance, routine maintenance services, genuine spare parts supply, emergency repair services, and periodic equipment inspections. We stand behind our products with strong warranty coverage and dedicated customer support.",
  },
  {
    question: "Can machinery be customized for specific needs?",
    answer:
      "Absolutely! Steel Builders specializes in custom fabrication and can modify standard equipment or design completely custom solutions to meet your specific production requirements, site conditions, and operational preferences. Our engineering team works closely with clients to deliver tailored industrial machinery solutions.",
  },
];

export function FAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQList.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}

export default function FAQSection() {
  return (
    <Box sx={{ py: 8, backgroundColor: "#f5f5f5" }}>
      <FAQSchema />
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h2"
          sx={{
            fontWeight: "bold",
            mb: 2,
            textAlign: "center",
            color: MAGENTA,
            fontSize: { xs: "2rem", md: "2.5rem" },
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "text.secondary",
          }}
        >
          Get answers to common questions about our industrial machinery,
          services, and support.
        </Typography>

        {FAQList.map((item, index) => (
          <Accordion
            key={index}
            sx={{
              mb: 2,
              "&:before": { display: "none" },
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              borderRadius: "8px !important",
              "&.Mui-expanded": {
                margin: "0 0 16px 0",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: MAGENTA }} />}
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                "&.Mui-expanded": {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "600",
                  color: MAGENTA,
                  fontSize: { xs: "1rem", md: "1.1rem" },
                }}
              >
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                backgroundColor: "white",
                borderTop: `1px solid ${BLUE_GREEN}20`,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "text.primary",
                  lineHeight: 1.8,
                }}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Still have questions? We're here to help!
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Contact us at{" "}
            <a
              href="tel:+2348136150837"
              style={{ color: BLUE_GREEN, textDecoration: "none" }}
            >
              +234 813 615 0837
            </a>{" "}
            or{" "}
            <a
              href="mailto:steelbuilderseng@gmail.com"
              style={{ color: BLUE_GREEN, textDecoration: "none" }}
            >
              steelbuilderseng@gmail.com
            </a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
