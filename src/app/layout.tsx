import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "manrote.dev",
  description: "As if we pay attention to read the small details.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
