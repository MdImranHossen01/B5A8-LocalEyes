// G:\Level 2\Milestone 8\localeyes\src\app\(mainlayout)\layout.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AuthProvider>
        <div className="min-h-screen w-full relative">
          <Navigation />
          <main className="relative z-0">{children}
          <Footer/>
          </main>{" "}
        </div>
      </AuthProvider>
    </SessionProvider>
  );
}
