import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "./theme-provider";
import { AppLayout } from "@/components/AppLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jewel Ramirez — Full-Stack Developer",
  description: "Jewel Ramirez is a full-stack developer who builds modern web applications, APIs, integrations, and digital experiences.",
  metadataBase: new URL("https://jewel-portfolio.pages.dev"),
  // Favicons come from the file conventions in this folder: icon.svg, favicon.ico and apple-icon.png
  openGraph: {
    title: "Jewel Ramirez — Full-Stack Developer",
    description: "Building modern web applications, APIs, integrations, and digital experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jewel Ramirez — Full-Stack Developer",
    description: "Building modern web applications, APIs, integrations, and digital experiences.",
    creator: "@p1llows",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4F4F2" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
