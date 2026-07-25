// src/app/layout.tsx
"use client";

import "./globals.css";
import { useEffect } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "react-hot-toast";

// List of known extension attributes that cause hydration issues
const EXTENSION_ATTRIBUTES = [
  "bis_register",
  "bis_skin_checked",
  "data-new-gr-c-s-check-loaded",
  "data-gr-ext-installed",
  "amp-access",
  "amp-access-beacon",
  "amp-access-hide",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Clean up extension attributes on client side
    if (typeof window !== "undefined") {
      const body = document.body;

      // Remove all known extension attributes
      EXTENSION_ATTRIBUTES.forEach((attr) => {
        if (body.hasAttribute(attr)) {
          body.removeAttribute(attr);
        }
      });

      // Also clean up any attribute that starts with known prefixes
      Array.from(body.attributes).forEach((attr) => {
        if (
          attr.name.startsWith("bis_") ||
          (attr.name.startsWith("data-") && attr.name.includes("gr"))
        ) {
          body.removeAttribute(attr.name);
        }
      });
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Khulna Tours & Travels</title>
        <meta
          name="description"
          content="Connect with local guides for authentic experiences"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playball&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3500,
              style: {
                background: '#0f172a',
                color: '#f8fafc',
                borderRadius: '0.75rem',
                fontSize: '13px',
                fontWeight: '500',
                padding: '12px 16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },
              },
            }}
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
