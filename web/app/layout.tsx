import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Labs from SaintSal | AI-Powered Development",
  description:
    "Build faster with SaintSal's AI agents. MCP Gateway, multi-provider streaming, and the HACP Protocol.",
  keywords: ["AI", "development", "SaintSal", "MCP", "agents", "code generation"],
  authors: [{ name: "SaintVision" }],
  openGraph: {
    title: "Labs from SaintSal",
    description: "AI-Powered Development Platform",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050508",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
