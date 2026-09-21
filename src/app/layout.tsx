import type { Metadata } from "next";
import { ThemeProvider } from "./theme-provider";
import { AppLayout } from "@/components/AppLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jewel Ramirez — Full-Stack Developer",
  description: "Jewel Ramirez is a full-stack developer who builds modern web applications, APIs, integrations, and digital experiences.",
  metadataBase: new URL("https://jewelramirez.dev"),
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
