"use client";
import LogoutIcon from "@mui/icons-material/Logout";
import { ReactNode, useEffect } from "react";
import "./index.css";
const Index = ({
  className,
  children,
  step,
  onClose,
}: {
  children: ReactNode;
  step: number;
  onClose: () => void;
  className?: string;
}) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);
  return (
    <section className="overlay">
      <div className={`login_dialog_box ${className && className}`}>
        <div className="login_step">Step: {step}/2</div>
        <div className="login_dialog_titles">
          <h2>Create your first API to get started</h2>
          <p>
            Run your First Evolution and{" "}
            <span className="credits">10$ credits</span> to get started
          </p>
        </div>
        {children}
        <div onClick={onClose} className="exit">
          <span>Exit Onboarding</span> <LogoutIcon className="exit_icon" />
        </div>
      </div>
    </section>
  );
};

export default Index;
