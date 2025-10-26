import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { PostHogProvider, PostHogPageView } from "@/lib/posthog";
import { LenisProvider } from "@/components/providers/LenisProvider";
import AnimatedBackground from "@/components/shared/AnimatedBackground";
import { Suspense } from "react";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://anipotts.com"
  ),
  title: {
    default: "Ani Potts - Software Engineer & Product Builder",
    template: "%s | Ani Potts",
  },
  description:
    "I'm a software engineer who doesn't waste time turning ideas into apps. Building AI products, full-stack platforms, and scalable systems.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "AI developer",
    "product builder",
    "NYC",
    "NYU",
  ],
  authors: [{ name: "Ani Potts" }],
  creator: "Ani Potts",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://anipotts.com",
    title: "Ani Potts - Software Engineer & Product Builder",
    description:
      "I'm a software engineer who doesn't waste time turning ideas into apps.",
    siteName: "Ani Potts Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ani Potts - Software Engineer & Product Builder",
    description:
      "I'm a software engineer who doesn't waste time turning ideas into apps.",
    creator: "@anipotts",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <AnimatedBackground />
        <LenisProvider>
          <PostHogProvider>
            <ThemeProvider defaultTheme="dark" storageKey="anipotts-theme">
              <Suspense fallback={null}>
                <PostHogPageView />
              </Suspense>
              {children}
            </ThemeProvider>
          </PostHogProvider>
        </LenisProvider>
      </body>
    </html>
  );
}
