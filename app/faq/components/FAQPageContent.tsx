"use client";

import FAQSection from "../../components/FAQSection";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import BreadcrumbNav from "../../components/BreadcrumbNav";

export default function FAQPageContent() {
  return (
    <>
      <Header />
      <BreadcrumbNav />
      <FAQSection />
      <Footer />
    </>
  );
}
