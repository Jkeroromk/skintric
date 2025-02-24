import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "./layout-client";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jz Skinstric",
  description: "Your personal Skincare helper",
  appleWebApp: {
    capable: true,
    title: "Jz Skinstric",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-inter antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
