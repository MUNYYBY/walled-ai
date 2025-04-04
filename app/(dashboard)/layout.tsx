import Sidebar from "@/components/layout/Sidebar";
import React from "react";

export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
}
