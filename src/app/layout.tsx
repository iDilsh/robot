import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import HydrationMarker from "@/components/hydration-marker";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "iDilsh Network — Digital Agency | Design, Video, AI, Web & Social Media",
  description:
    "Premium digital agency offering graphic design, video editing, AI creations, web design, and social media management. Affordable excellence from Sri Lanka to the world.",
  keywords: [
    "digital agency",
    "graphic design",
    "web design",
    "video editing",
    "AI design",
    "social media management",
    "brand identity",
    "iDilsh Network",
    "Sri Lanka",
  ],
  authors: [{ name: "iDilsh Network" }],
  creator: "iDilsh Network",
  publisher: "iDilsh Network",
  metadataBase: new URL("https://idilsh.top"),
  alternates: {
    canonical: "https://idilsh.top",
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "iDilsh Network — Digital Agency | Design, Video, AI, Web & Social Media",
    description:
      "Premium digital agency offering graphic design, video editing, AI creations, web design, and social media management. Affordable excellence from Sri Lanka to the world.",
    url: "https://idilsh.top",
    siteName: "iDilsh Network",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "iDilsh Network — Digital Agency | Design, Video, AI, Web & Social Media",
    description:
      "Premium digital agency offering graphic design, video editing, AI creations, web design, and social media management. Affordable excellence from Sri Lanka to the world.",
    creator: "@idilshnetwork",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <HydrationMarker />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
