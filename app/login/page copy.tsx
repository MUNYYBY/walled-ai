"use client";

import { useState } from "react";
import { Alert, Box, Button, InputAdornment, TextField } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { Lock } from "@mui/icons-material";

import "./login.css";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { useDispatch } from "react-redux";
import { loginAction } from "@/store/reducers/userSlice";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(`${baseUrl}/auth/signin`, {
        email: email,
        password: password,
      });
      if (res?.data) {
        dispatch(loginAction(res.data));
        localStorage.setItem("userInfo", JSON.stringify(res.data?.data));
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setError("Invalid email or password");
      console.log("Error", error);
    }
  };
  return (
    <div className="login-container">
      <div className="left">
        <div className="left-top">
          <span className="subtitle-1">Name goes here</span>
          <span className="title ">Welcome to name here</span>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            iaculis velit magna
          </p>
          <form onSubmit={(e) => handleLogin(e)}>
            <div className="auth-inputs mt-2">
              {error && (
                <Box sx={{ marginBottom: "1rem" }}>
                  <Alert severity="error" sx={{ borderRadius: "1rem" }}>
                    {error}
                  </Alert>
                </Box>
              )}
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />
              <Button variant="contained" type="submit">
                Login
              </Button>
            </div>
          </form>
        </div>
        <div className="left-bottom">
          <Image
            src="/images/login-avatars.png"
            height={60}
            width={50}
            alt="login-avatars"
          />
          <div className="ml-1 flex-grow">
            <span className="title">Join with 20k+ users!</span>
            <span className="sub-title">Lets see out our happy customers.</span>
          </div>
          <Image
            src="/images/login-customer-check.svg"
            width={100}
            height={50}
            alt="login-customer-check"
          />
        </div>
      </div>
      <div className="right">
        <div className="right-container">
          <Image src="/images/robot.png" width={100} height={50} alt="robot" />
          <div className="content">
            <p>Create</p>
            <div>
              <p>
                AI revolutionising the way we create, render and experience
                content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
