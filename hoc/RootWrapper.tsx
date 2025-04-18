import HomeLayout from "@/layout/HomeLayout";
import { ThemeProvider } from "next-themes";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function RootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ThemeProvider>
        <HomeLayout>{children}</HomeLayout>
        <Toaster />
      </ThemeProvider>
    </>
  );
}
