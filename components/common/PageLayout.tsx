import React, { ReactNode } from "react";
import Topbar from "../layout/Topbar";
import "./pageLayout.css";

const PageLayout = ({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) => {
  return (
    <div className=" page_container_main ">
      <Topbar label={label} />
      {children}
    </div>
  );
};

export default PageLayout;
