import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "E-commerce store",
    template: "%s | E=Commerce Store",
  },
  description: "A simple e-commerce store with Next.js and Tailwind css",
  openGraph: {
    title: "E-commerce Store",
    description: "A simple e-commerce store with Next.js and Tailwind css",
    url: process.env.NEXT_PUBLIC_URL,
    siteName: "E-commerce Store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <>
                <header>
                  <Navbar />
                </header>
                {children}
                <footer className="py-6 border-t border-dashed">
                  <div className="mx-auto text-muted-foreground text-sm text-center container">
                    &copy; {new Date().getFullYear()} Your Company. All rights
                    reserved.
                  </div>
                </footer>
              </>
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </Suspense>
  );
}
