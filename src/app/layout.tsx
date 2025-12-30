import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import SmoothScroll from "./components/ui/SmoothScroll";
import LenisAutoScroll from "./components/ui/LenisAutoScroll";
import ParticlesBackground from "./components/ParticlesBackground";
import { Inter, Poppins } from "next/font/google";

//config for Inter font
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

//config for Poppins font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
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
      <body className={`${inter.variable} ${poppins.variable} antialiased `} >
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
