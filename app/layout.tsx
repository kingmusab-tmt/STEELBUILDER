import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";
import AuthProvider from "./components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.steelbuilderstechengltd.com.ng"),
  title:
    "Steel Builders Technical Engineering Ltd - Industrial Machinery Solutions",
  description:
    "Leading experts in fabrication, installation, and maintenance of industrial machinery. Block molding machines, stone crushers, custom engineering solutions in Lagos, Nigeria.",
  keywords: [
    "industrial machinery",
    "block molding machine",
    "stone crusher",
    "fabrication services",
    "machinery installation",
    "Steel Builders Nigeria",
    "Lagos engineering",
  ],
  authors: [{ name: "Steel Builders Technical Engineering Ltd" }],
  creator: "Steel Builders Technical Engineering Ltd",
  publisher: "Steel Builders Technical Engineering Ltd",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://www.steelbuilderstechengltd.com.ng",
    siteName: "Steel Builders Technical Engineering Ltd",
    title: "Steel Builders Technical Engineering Ltd",
    description: "Industrial machinery solutions and engineering services",
    images: [
      {
        url: "/images/t7.webp",
        width: 1200,
        height: 630,
        alt: "Steel Builders Technical Engineering Ltd - Industrial machinery solutions",
      },
    ],
  },
  verification: {
    google: "vaERSZEzARTzp_CaQ1tFJkj9AnIL64ipYJS7qozx_6M",
  },
  alternates: {
    canonical: "https://www.steelbuilderstechengltd.com.ng",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
