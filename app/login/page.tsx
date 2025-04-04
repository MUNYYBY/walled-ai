"use client";

import { loginAction } from "@/store/reducers/userSlice";
import baseUrl from "@/utils/baseUrl";
import { Lock } from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Alert, Box, Button, InputAdornment, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { useDispatch } from "react-redux";
import "./login.css";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  console.log("showPassword===", showPassword);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${baseUrl}/auth/signin`, {
        email: email,
        password: password,
      });
      console.log("Response", res, res.data);
      if (res?.data) {
        dispatch(loginAction(res.data));
        localStorage.setItem("userInfo", JSON.stringify(res.data?.data));
        router.push("/dashboard");
      }
    } catch (error: any) {
      // toast.error(error.response?.data?.msg)
      setError(
        error.response?.data?.msg == "Some error occured"
          ? "Invalid email or password"
          : error.response?.data?.msg || error.message
      );
      setPassword("");
      console.log("Error", error);
    }

    if (rememberMe) {
      localStorage.setItem("rememberedEmail", email);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedEmail");
      localStorage.removeItem("rememberedPassword");
    }
  };
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("userInfo", JSON.stringify({ access_token: token }));
      router.replace("/dashboard");
    }
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("userInfo");
    if (token) {
      router.push("/dashboard");
    }
  }, []);
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
  // useEffect(() => {
  //   const token = localStorage.getItem("userInfo");
  //   if (token) {
  //     router.push("/dashboard");
  //   }
  // }, []);
  // const handleGoogleLogin = async () => {
  //   try {
  //     const res = await axios.get(`${baseUrl}/auth/google/login`);
  //     if (res?.data) {
  //      console.log(res.data,"======>>GOOGLE RESPONSE")
  //     }
  //   } catch (error: any) {
  //     console.log("Google Login Error:", error);
  //   }
  // };
  const handleGoogleLogin = () => {
    window.location.href = `${baseUrl}/auth/google/login`;
  };

  return (
    <section className="login-container">
      <div className="login row">
        <div className="col-md-6 bg-color login-center">
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
                <span className="welcome-text">Login to your Account</span>
                <p className="welcome-text-small">
                  Welcome back! Select method to login:
                </p>

                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ borderRadius: "0.5rem" }}
                  className="button-style1"
                  onClick={handleGoogleLogin}
                >
                  <Image
                    width={22.5}
                    height={22.5}
                    alt=""
                    src="images/Search.svg"
                  />
                  Google
                </Button>
                <div className="login-with">
                  <span>or Continue with Email</span>
                </div>
                <form onSubmit={handleLogin} className="loginForm">
                  <div className="auth-inputs mt-2">
                    {/* <p style={{ marginBottom: "1rem", fontSize: "16px" }}>
                Login to continue
              </p> */}

                    {/* Email Input */}
                    <motion.div variants={fadeIn}>
                      <TextField
                        className="input"
                        label=""
                        placeholder="Email"
                        variant="outlined"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
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

                    {/* Password Input */}
                    <motion.div variants={fadeIn}>
                      <TextField
                        className="input"
                        label=""
                        variant="outlined"
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
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
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              sx={{
                                color: "#8281B1",
                              }}
                            />
                          }
                          label="Remember me"
                          sx={{
                            color: "#8281B1",
                          }}
                        />
                      </div>
                      <span
                        className="forgot-pass pointer"
                        onClick={() => {
                          router.push("/forgot");
                        }}
                      >
                        Forgot Password?
                      </span>
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
                        Login
                      </Button>
                    </motion.div>
                  </div>

                  {/* <Divider sx={{ marginTop: "1rem", marginBottom: "1rem" }} /> */}
                  <p
                    style={{ textAlign: "center" }}
                    className="dont-have-account"
                  >
                    {"Don't have an account?"}{" "}
                    <Link href="/sign-up" style={{ color: "#323150" }}>
                      Click here to register
                    </Link>
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
        <div className="col-md-6 padding-0 sliders mobile-none">
          <Carousel
            fade
            pause={false}
            interval={3000}
            slide={false}
            className="height-100"
          >
            <Carousel.Item className="height-100">
              <Image
                width={50}
                height={50}
                alt=""
                className="d-block w-100 slide-img"
                src="images/Guardrail.png"
              />
              <Carousel.Caption>
                <h3 className="slider-big-text">
                  Forem ipsum dolor sit amet, consectetur adipiscing elit.
                </h3>
                <p className="slider-small-text">
                  Sorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="height-100">
              <Image
                width={50}
                height={50}
                alt=""
                className="d-block w-100 slide-img"
                src="images/pii.png"
              />
              <Carousel.Caption>
                <h3 className="slider-big-text">
                  Forem ipsum dolor sit amet, consectetur adipiscing elit.
                </h3>
                <p className="slider-small-text">
                  Sorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="height-100">
              <Image
                width={50}
                height={50}
                alt=""
                className="d-block w-100 slide-img"
                src="images/hallucination.png"
              />
              <Carousel.Caption>
                <h3 className="slider-big-text">
                  Forem ipsum dolor sit amet, consectetur adipiscing elit.
                </h3>
                <p className="slider-small-text">
                  Sorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
