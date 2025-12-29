import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SmoothScroll from "./components/ui/SmoothScroll";
import LenisAutoScroll from "./components/ui/LenisAutoScroll";
import ParticlesBackground from "./components/ParticlesBackground";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tornam.dev",
  description: "Portfolio of Etornam Kordzo Ahiataku - Software Engineer | Fullstack Developer | AI & ML Enthusiast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `} >
        <SmoothScroll>
          <LenisAutoScroll />
          <ParticlesBackground />
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
       </body>
    </html>
  );
}
