import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeProvider } from "next-themes";
import { Anek_Devanagari } from "next/font/google";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./provider";
import Script from "next/script";

const anek = Anek_Devanagari({ subsets: ["devanagari"] });

export const metadata: Metadata = {
  title: "WalledAI | AI Guardrails",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={anek.className}>
        <ThemeProvider>
          <Providers>
            <NavBar />
            {children}
            <Footer />
          </Providers>
        </ThemeProvider>
        <Toaster />
        <Script src="https://www.google.com/recaptcha/api.js" async defer />
      </body>
    </html>
  );
}
