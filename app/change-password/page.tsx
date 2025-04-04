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
import "./changepassword.css";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { useDispatch } from "react-redux";
import { loginAction } from "@/store/reducers/userSlice";
import { grey } from "@mui/material/colors";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [success, setSuccess] = useState("");

  // Toggle password visibility
  const handleClickShowPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowPassword1 = () =>
    setShowConfirmPassword((show) => !show);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords does not match!");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Unauthorized request. Please log in again.");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        `${baseUrl}/auth/reset-password/change-password`,
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess(res.data.msg);

      setTimeout(() => {
        setSuccess("");
        router.push("/login");
      }, 1500);
    } catch (error: any) {
      setError(error.response?.data?.msg || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login row">
      <div className="col-md-12 bg-color login-center">
        <motion.div initial="hidden" animate="visible" className="login-main">
          {/* Logo */}
          <motion.img
            src="images/walledailogo.png"
            alt="logo"
            width={200}
            style={{ marginBottom: "4rem" }}
          />

          {/* Reset Password Form */}
          <motion.div style={{ width: "100%", padding: 0 }}>
            <div style={{ textAlign: "left" }}>
              <span className="welcome-text">Create New Password</span>
              <p className="welcome-text-small">
                Enter a unique and strong password that is easy to remember.
              </p>

              <form onSubmit={handleSubmit} className="loginForm">
                <div className="auth-inputs mt-2">
                  {/* New Password Input */}
                  <TextField
                    className="input"
                    variant="outlined"
                    placeholder="New Password"
                    type={showNewPassword ? "text" : "password"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    required
                    fullWidth
                    sx={{ marginBottom: "1rem" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock htmlColor="#323150" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          onClick={handleClickShowPassword}
                        >
                          {showNewPassword ? (
                            <RemoveRedEyeIcon htmlColor="#8281B1" />
                          ) : (
                            <VisibilityOffIcon htmlColor="#8281B1" />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />

                  {/* Confirm Password Input */}
                  <TextField
                    className="input"
                    variant="outlined"
                    placeholder="Confirm New Password"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    required
                    fullWidth
                    sx={{ marginBottom: "1rem" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock htmlColor="#323150" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
                          position="start"
                          onClick={handleClickShowPassword1}
                        >
                          {showConfirmPassword ? (
                            <RemoveRedEyeIcon htmlColor="#8281B1" />
                          ) : (
                            <VisibilityOffIcon htmlColor="#8281B1" />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  {success && (
                    <div
                      className="left-top"
                      style={{ textAlign: "center", marginBottom: "1rem" }}
                    >
                      <Alert severity="success">{success}</Alert>
                    </div>
                  )}
                  {error && (
                    <Box sx={{ marginBottom: "1rem" }}>
                      <Alert severity="error" sx={{ borderRadius: "0.5rem" }}>
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
                      disabled={loading}
                    >
                      {loading ? "Changing..." : "Change Password"}
                    </Button>
                  </motion.div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
