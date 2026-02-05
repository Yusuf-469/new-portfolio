import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../lib/cms/AuthContext";
import { CMSProvider } from "../lib/cms/CMSContext";

export const metadata: Metadata = {
  title: "SAKLAIN STUDIOS | Web3 Content Creator & Creative Producer",
  description: "Web3 Content That Moves Culture. Based in Dubai, crafting visual stories for the decentralized world.",
  keywords: ["Web3", "Content Creator", "Crypto", "3D Animation", "Dubai", "Creative Producer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AuthProvider>
          <CMSProvider>
            <div className="gradient-mesh" />
            <div className="noise-overlay" />
            <div className="custom-cursor" id="cursor" />
            {children}
          </CMSProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
