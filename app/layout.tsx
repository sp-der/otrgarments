import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/components/AppProviders";

export const metadata: Metadata = {
  title: "OTR Garments | On The Run",
  description: "OTR Garments. Streetwear built around movement, late nights and the people who never really clock out.",
  icons: {
    icon: "/OTR.png",
    shortcut: "/OTR.png",
    apple: "/OTR.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
