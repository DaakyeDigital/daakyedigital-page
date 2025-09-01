import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daakye Digital - Fintech Solutions That Drive Growth",
  description: "Custom-built financial technology products and expert consulting to help you unlock revenue, streamline operations, and stay future-ready.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
