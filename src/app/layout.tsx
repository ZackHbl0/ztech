import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Navigation } from "@/components/layout/Navigation";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZTech | Premium Digital Products",
  description: "ZTech designs and engineers premium websites, SaaS platforms, mobile applications, and AI solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans text-foreground antialiased selection:bg-foreground/10 selection:text-foreground overflow-x-clip",
          inter.variable,
          spaceGrotesk.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
          <LoadingScreen />
          <CustomCursor />
          <ScrollProgress />
          <SmoothScroll>
            <Navigation />
            {children}
            <Footer />
            <BackToTop />
            <WhatsAppButton />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
