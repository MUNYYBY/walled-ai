import HomeLayout from "@/layout/HomeLayout";
import React from "react";
import { Toaster } from "react-hot-toast";

export default function RootWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeLayout>{children}</HomeLayout>
      <Toaster />
    </>
  );
}
