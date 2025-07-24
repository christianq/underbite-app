import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ConvexProviderWrapper } from "@/components/ConvexProviderWrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  title: "Cowboy Picnic - Sandwich Ordering",
  description: "Saddle up for flavor with our cowboy-themed sandwiches",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${sourceSans.variable} ${sourceSans.className}`}>
        <ConvexProviderWrapper>
          <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto px-4 py-8">
        {children}
            </main>
          </div>
        </ConvexProviderWrapper>
      </body>
    </html>
  );
}
