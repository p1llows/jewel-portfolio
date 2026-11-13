import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "./theme-provider";
import { AppLayout } from "@/components/AppLayout";
import "./globals.css";

const SITE_URL = "https://jewel-portfolio.pages.dev";
const SITE_DESCRIPTION =
  "Jewel Ramirez is a full-stack developer who builds modern web applications, APIs, integrations, and digital experiences. Explore projects, experience, and tech stack.";

export const metadata: Metadata = {
  title: {
    default: "Jewel Ramirez — Full-Stack Developer Portfolio",
    template: "%s | Jewel Ramirez",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  applicationName: "Jewel Ramirez Portfolio",
  authors: [{ name: "Jewel Ramirez", url: SITE_URL }],
  creator: "Jewel Ramirez",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  verification: { google: "H4rvneVvUVfGf28XF_6dWdDGJ9qXRRvehdMf2wiQ3xE" },
  // Favicons come from the file conventions in this folder: icon.svg, favicon.ico and apple-icon.png
  openGraph: {
    title: "Jewel Ramirez — Full-Stack Developer Portfolio",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Jewel Ramirez",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jewel Ramirez — Full-Stack Developer Portfolio",
    description: SITE_DESCRIPTION,
    creator: "@p1llows",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Jewel Ramirez",
    url: SITE_URL,
    jobTitle: "Full-Stack Developer",
    description: SITE_DESCRIPTION,
    image: `${SITE_URL}/opengraph-image.png`,
    sameAs: ["https://github.com/p1llows", "https://linkedin.com/in/jewel-r"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
