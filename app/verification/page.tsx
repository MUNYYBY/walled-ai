"use client";

import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import { Lock } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import "./verification.css";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { useDispatch } from "react-redux";
import { loginAction } from "@/store/reducers/userSlice";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);
  console.log("showPassword===", showPassword);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (email) setEmail(email);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    const token = localStorage.getItem("accessToken");
    setError("");
    e.preventDefault();

    if (!otp) {
      setError("Please enter the OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${baseUrl}/auth/verify-otp`,
        { otp },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res?.data) {
        // toast.success(res.data.msg); //
        router.push("/login"); //
      }
    } catch (error: any) {
      console.log("Error:", error);
      setError(error?.response?.data?.msg || "OTP verification failed");
      setError(error?.response?.data?.msg || "Invalid OTP, please try again");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    const token = localStorage.getItem("accessToken");
    setResendDisabled(true); // Disable the button while processing

    try {
      const res = await axios.post(
        `${baseUrl}/auth/resend-otp`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(res.data.msg);

      setTimeout(() => {
        setSuccess("");
        setCountdown(60);
        setResendDisabled(true);
      }, 3000);
    } catch (error: any) {
      console.log("Error:", error);
      setError(error?.response?.data?.msg || "Failed to resend OTP");
      setResendDisabled(false);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const slideIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };
  return (
    <div className="login row ">
      <div className="col-md-12 bg-color  login-center">
        <motion.div initial="hidden" animate="visible" className="login-main">
          {/* Animated Logo */}
          <motion.img
            src="images/walledailogo.png"
            alt="logo"
            width={200}
            style={{ marginBottom: "4rem" }}
            variants={fadeIn}
          />

          {/* Login Form Container */}
          <motion.div
            variants={slideIn}
            style={{
              width: "100%",
              padding: 0,
            }}
          >
            <div style={{ textAlign: "left" }}>
              <span className="welcome-text">Verify Email</span>
              <p className="welcome-text-small">
                Enter the OTP sent to{" "}
                <span style={{ color: "#323150" }}>{email}</span>
              </p>

              <form onSubmit={handleSubmit} className="loginForm">
                <div className="auth-inputs mt-2">
                  {/* {error && (
                    <Box sx={{ marginBottom: "1rem" }}>
                      <Alert severity="error" sx={{ borderRadius: "0.5rem" }}>
                        {error}
                      </Alert>
                    </Box>
                  )} */}
                  {/* <p style={{ marginBottom: "1rem", fontSize: "16px" }}>
                Login to continue
              </p> */}

                  {/* Email Input */}

                  {/* Password Input */}
                  <motion.div variants={fadeIn}>
                    <TextField
                      className="input"
                      label=""
                      variant="outlined"
                      placeholder="*   *   *   *"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setOtp(e.target.value)}
                      value={otp}
                      fullWidth
                      sx={{ marginBottom: "1rem" }}
                      InputProps={{
                        // startAdornment: (
                        //   <InputAdornment position="start">
                        //     <Lock htmlColor="#323150" />
                        //   </InputAdornment>
                        // ),

                        endAdornment: (
                          <InputAdornment
                            position="start"
                            onClick={handleClickShowPassword}
                          >
                            {showPassword ? (
                              <RemoveRedEyeIcon htmlColor="#8281B1" />
                            ) : (
                              <VisibilityOffIcon htmlColor="#8281B1" />
                            )}
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>
                  <div className="remember-me">
                    <div className="remember-me-style">
                      {success ? (
                        <p
                          className="welcome-text-small"
                          style={{
                            marginBottom: "8px",
                            color: "green",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <CheckCircleIcon />{" "}
                          <span style={{ marginLeft: "6px" }}>{success}</span>
                        </p>
                      ) : countdown > 0 ? (
                        <p
                          className="welcome-text-small"
                          style={{ marginBottom: "8px" }}
                        >
                          Resend OTP in:{" "}
                          <span style={{ color: "#323150" }}>{countdown}s</span>
                        </p>
                      ) : (
                        <p
                          onClick={!isResending ? handleResendOtp : undefined} // Prevent clicking while success is showing
                          className="welcome-text-small"
                          style={{
                            marginBottom: "8px",
                            cursor: isResending ? "default" : "pointer",
                            color: isResending ? "gray" : "#323150",
                          }}
                        >
                          Resend OTP
                        </p>
                      )}
                    </div>
                  </div>
                  {error && (
                    <Box sx={{ marginBottom: "1rem" }}>
                      <Alert
                        severity="error"
                        sx={{
                          borderRadius: "0.5rem",
                          textAlign: "left",
                          fontSize: "10px",
                        }}
                      >
                        {error}
                      </Alert>
                    </Box>
                  )}
                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="contained"
                      type="submit"
                      fullWidth
                      sx={{ borderRadius: "0.5rem" }}
                      className="button-style2"
                    >
                      {loading ? "Verifying..." : "Submit"}
                    </Button>
                  </motion.div>
                </div>

                {/* <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} /> */}
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
