import "bootstrap/dist/css/bootstrap.min.css";
import { Anek_Devanagari } from "next/font/google";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import RootWrapper from "@/hoc/RootWrapper";

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
        <RootWrapper>{children}</RootWrapper>
        <Script src="https://www.google.com/recaptcha/api.js" async defer />
      </body>
    </html>
  );
}
