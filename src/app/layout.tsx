// src/app/layout.tsx
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";


const inter = Inter({ subsets: ["latin"] });

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
        <title>Local Eyes | Local Guide Platform</title>
        <meta
          name="description"
          content="Connect with local guides for authentic experiences"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
      
        
          {children}
      </body>
    </html>
  );
}
