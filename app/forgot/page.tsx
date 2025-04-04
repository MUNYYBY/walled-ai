"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import { Lock } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import "./forgot.css";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { useDispatch } from "react-redux";
import { loginAction } from "@/store/reducers/userSlice";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  console.log("showPassword===", showPassword);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email id");
      return;
    }
    setError("");

    try {
      const res = await axios.post(`${baseUrl}/auth/reset-password/otp`, {
        email: email,
      });

      setSuccess(res?.data?.msg);

      console.log(res?.data?.msg, "resresmsg");
      if (res?.data?.data?.response.accepted[0]) {
        localStorage.setItem("email", res?.data?.data?.response.accepted[0]);
      }
      if (res?.data?.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
      }
      setTimeout(() => {
        setSuccess("");
        router.push("/forgot-otp");
      }, 1500);
    } catch (error: any) {
      setError(
        error.response?.data?.msg == "Some error occured"
          ? "Invalid email or password"
          : error.response?.data?.msg || error.message
      );
      setPassword("");
      console.log("Error", error);
    }
  };
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
    <div className="login row">
      <div className="col-md-12 bg-color login-center">
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
              <span className="welcome-text">Forget Password</span>
              <p className="welcome-text-small">
                Enter the Valid Email Id to get OTP.
                <span style={{ color: "#323150" }}> </span>
              </p>

              <form onSubmit={handleSubmit} className="loginForm">
                <div className="auth-inputs mt-2">
                  {/* <p style={{ marginBottom: "1rem", fontSize: "16px" }}>
                Login to continue
              </p> */}

                  {/* Email Input */}

                  {/* Password Input */}
                  <motion.div variants={fadeIn}>
                    <TextField
                      className="input"
                      label=""
                      placeholder="Email"
                      variant="outlined"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      // required
                      fullWidth
                      sx={{ marginBottom: "1rem" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailOutlineIcon htmlColor="#323150" />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>
                  {error && (
                    <Box sx={{ marginBottom: "1rem" }}>
                      <Alert severity="error" sx={{ borderRadius: "0.5rem" }}>
                        {error}
                      </Alert>
                    </Box>
                  )}
                  {/* <div className="remember-me">
                    <div className="remember-me-style" > */}
                  {/* <FormControlLabel
                        control={
                          <Checkbox
                            sx={{
                              color: "#8281B1",
                            }}
                          />
                        }
                        label="Remember me"
                        sx={{
                          color: "#8281B1",
                        }}
                      /> */}

                  {/* </div>
                  </div> */}
                  {success && (
                    <div className="left-top" style={{ textAlign: "center",marginBottom:"1rem" }}>
                      <Alert severity="success">{success}</Alert>
                    </div>
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
                      Get OTP
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
