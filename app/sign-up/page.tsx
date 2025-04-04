"use client";

import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Person, Email, Lock, Apartment } from "@mui/icons-material";

import "./signup.css";
import axios from "axios";
import baseUrl from "@/utils/baseUrl";
import { useDispatch } from "react-redux";
import { loginAction } from "@/store/reducers/userSlice";
import { toast } from "react-hot-toast";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import Button from "@/components/common/Buttons";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import Image from "next/image";
declare global {
  interface Window {
    grecaptcha: any;
  }
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  // confirmPassword: Yup.string().required('Confirm Password is required'),
  // org: Yup.string().required('Organization is required'),
});

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState("");
  const recaptchaRef = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showConPassword, setShowConPassword] = useState(false);
  const handleClickShowConPassword = () => setShowConPassword((show) => !show);
  useEffect(() => {
    // Load reCAPTCHA script dynamically
    const script = document.createElement("script");
    script.src =
      "https://www.google.com/recaptcha/api.js?render=6Leb_ZIqAAAAAGk-9PPSGjRu3Z7zyylXnzC45BOG";
    script.async = true;
    script.defer = true;
    script.onload = () => {
      window.grecaptcha.ready(() => {
        console.log("ReCAPTCHA is ready");
      });
    };
    document.body.appendChild(script);
  }, []);
  const handleReCaptchaVerify = async () => {
    return new Promise((resolve) => {
      if (window.grecaptcha) {
        window.grecaptcha
          .execute("6Leb_ZIqAAAAAGk-9PPSGjRu3Z7zyylXnzC45BOG", {
            action: "submit",
          })
          .then((token: string) => {
            setRecaptchaToken(token);
            resolve(token);
          })
          .catch((error: any) => {
            resolve(null);
          });
      } else {
        resolve(null);
      }
    });
  };
  const handleSignup = async (values: any) => {
    setError("");
    const token = await handleReCaptchaVerify();

    // if(values.password !== values.confirmPassword) {
    //     toast.error('Passwords do not match. Please try again');
    //     values.password = '';
    //     values.confirmPassword = '';
    //     return;
    // }
    // if (!recaptchaToken) {
    //   setError("Please complete the reCAPTCHA");
    //   return;
    // }
    setLoading(true);
    try {
      const res = await axios.post(`${baseUrl}/auth/signup`, {
        name: values.name,
        email: values.email,
        password: values.password,
        // confirmPassword: values.confirmPassword,
        // org: values.org,
        recaptchaToken: token,
      });
      if (res?.data?.data?.accessToken) {
        localStorage.setItem("accessToken", res.data.data.accessToken);
      }
      if (res?.data?.data?.user?.email) {
        localStorage.setItem("email", res.data.data.user?.email);
      }
      if (res?.data) {
        dispatch(loginAction(res.data));
        // toast.success(res.data.msg);
        setLoading(false);
        setSuccess(true);
        // window.location.href = "/verification";
        router.push("/verification");
      }
    } catch (error: any) {
      if (error?.response?.data?.errors) {
        setError(error?.response?.data?.errors);
      } else {
        setError(error?.response?.data?.msg);
        // toast.error('Some error occured. Please try again.');
      }
      setLoading(false);
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
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("userInfo", JSON.stringify({ access_token: token }));
      router.replace("/dashboard");
    }
  }, [router]);
  useEffect(() => {
    const token = localStorage.getItem("userInfo");
    if (token) {
      router.push("/dashboard");
    }
  }, []);
  const handleGoogleLogin = () => {
    window.location.href = `${baseUrl}/auth/google/login`;
  };
  return (
    <div className="login flex min-h-screen">
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
              <span className="welcome-text">Create your Account</span>
              <p className="welcome-text-small">
                Start your New Advanced Journey with Walled AI
              </p>

              <div className=" " style={{ textAlign: "center" }}>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    org: "",
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    handleSignup(values);
                    setSubmitting(false);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
                    <Form className="loginForm">
                      <div className="auth-inputs mt-2">
                        <TextField
                          className="input"
                          id="outlined-basic"
                          label=""
                          placeholder="Full Name"
                          variant="outlined"
                          name="name"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.name}
                          sx={{ marginBottom: "1rem" }}
                          fullWidth
                          required
                          // size='small'
                          error={!!(errors.name && touched.name)}
                          helperText={
                            errors.name && touched.name ? errors.name : null
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" className="mb-0">
                                <Person sx={{ color: "#323150" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          id="outlined-basic"
                          label=""
                          className="input"
                          placeholder="Email"
                          variant="outlined"
                          name="email"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          required
                          sx={{ marginBottom: "1rem" }}
                          fullWidth
                          // size='small'
                          error={!!(errors.email && touched.email)}
                          helperText={
                            errors.email && touched.email ? errors.email : null
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" className="mb-0">
                                <MailOutlineIcon sx={{ color: "#323150" }} />
                              </InputAdornment>
                            ),
                          }}
                        />
                        <TextField
                          id="outlined-basic"
                          label=""
                          placeholder="Password"
                          className="input"
                          sx={{ marginBottom: "1rem" }}
                          fullWidth
                          variant="outlined"
                          type={showPassword ? "text" : "password"}
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          required
                          // size='small'
                          error={!!(errors.password && touched.password)}
                          helperText={
                            errors.password && touched.password
                              ? errors.password
                              : null
                          }
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" className="mb-0">
                                <Lock sx={{ color: "#323150" }} />
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
                        {/* <TextField 
                                        id="outlined-basic" 
                                        label="" 
                                           placeholder="Confirm Password"
                                      className="input"
                                        variant="outlined" 
                                        type={showConPassword ? 'text' : 'password'}
                                        name='confirmPassword'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                        required
                                        sx={{ marginBottom: "1rem" }}
                                        fullWidth
                                        // size='small'
                                        error={!!(errors.confirmPassword && touched.confirmPassword)}
                                        helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock sx={{color: '#323150'}}/>
                                            </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="start" onClick={handleClickShowConPassword}>
                                               {showConPassword ?
                                                 <RemoveRedEyeIcon htmlColor="#8281B1" />
                                               
                                              :
                                              <VisibilityOffIcon htmlColor="#8281B1" />
                          
                                              }
                                                  
                                                </InputAdornment>
                                              ),
                                        }}
                                    />
                                    <TextField 
                                        id="outlined-basic" 
                                          placeholder="Organization Name"
                                      className="input"
                                        label="" 
                                        variant="outlined" 
                                        type="text"
                                        name='org'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.org}
                                        sx={{ marginBottom: "1rem" }}
                                        fullWidth
                                        // size='small'
                                        error={!!(errors.org && touched.org)}
                                        helperText={errors.org && touched.org ? errors.org : null}
                                        InputProps={{
                                            startAdornment: (
                                            <InputAdornment position="start">
                                                <Apartment sx={{color: '#323150'}}/>
                                            </InputAdornment>
                                            ),
                                        }}
                                    /> */}
                        {/* <ReCAPTCHA
                          sitekey="6LekJZMqAAAAAJSwoZjKCDRv9xR4xaNQYmfBLQsa"
                          onChange={(token: any) => setRecaptchaToken(token)}
                        /> */}
                        <div
                          className="g-recaptcha"
                          data-sitekey="6Leb_ZIqAAAAAGk-9PPSGjRu3Z7zyylXnzC45BOG"
                          data-size="invisible"
                        ></div>

                        {error && (
                          <Box sx={{ marginBottom: "1rem", marginTop: "1rem" }}>
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
                        <Button
                          type="submit"
                          disabled={loading}
                          isLoading={loading}
                          className="button-style2 mt-2 sign_up_button"
                        >
                          Sign Up
                          {/* {!true ? (
                            "Sign Up"
                          ) : (
                            <CircularProgress
                              sx={{ color: "white" }}
                              size={20}
                            />
                          )} */}
                        </Button>
                      </div>
                      {/* <Divider sx={{marginTop: '1rem', marginBottom: '1rem'}}/> */}
                    </Form>
                  )}
                </Formik>
              </div>
              <div className="login-with">
                <span>or Sign Up with</span>
              </div>
              <Button
                type="submit"
                className=" button-style1 sign_up_button flex items-center justify-center !gap-0"
                onClick={handleGoogleLogin}
              >
                <Image
                  width={22.5}
                  height={22.5}
                  src="images/Search.svg"
                  style={{ marginRight: "7px" }}
                  alt="Search"
                />
                Google
              </Button>
              <p style={{ textAlign: "center" }} className="dont-have-account">
                Already have an account?{" "}
                <Link href={"/login"} style={{ color: "#323150" }}>
                  Click here to login
                </Link>{" "}
              </p>
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
              width={40}
              height={40}
              className="d-block w-100 slide-img"
              src="images/Guardrail.png"
              alt="Image One"
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
              width={40}
              height={40}
              className="d-block w-100 slide-img"
              src="images/pii.png"
              alt="Image Two"
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
              width={40}
              height={40}
              className="d-block w-100 slide-img"
              src="images/hallucination.png"
              alt="Image Two"
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
    // <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '5rem'}}>
    //     <Image width={40} height={40} src="images/walledailogo.jpg" alt="logo" className='logo' width={250} style={{marginBottom: '2rem'}}/>
    //     <Box sx={{width: '42.5%', backgroundColor: '#f8f8f8', padding: '2rem', borderRadius: '2rem'}}>
    //         {success ? (
    //             <div className='left-top' style={{textAlign: 'center'}}>
    //                 <Alert severity="success">Signup successful! Your account is being verified. You may login in some time post successful verification.</Alert>
    //             </div>
    //         ) : (
    //             <div className='left-top' style={{textAlign: 'center'}}>
    //                 <span style={{fontSize: '22px'}}>Welcome to Walled Ai</span>
    //                 <p style={{fontSize: '16px', fontWeight: 300, color: '#a0a0a0', marginTop: '0.5rem'}}>Govern your AI&apos;s behaviour</p>
    //                 <Formik
    //                     initialValues={{ name: '', email: '', password: '', confirmPassword: '', org: '' }}
    //                     validationSchema={SignupSchema}
    //                     onSubmit={(values, { setSubmitting }) => {
    //                         handleSignup(values);
    //                         setSubmitting(false);
    //                     }}
    //                 >
    //                     {({
    //                         values,
    //                         errors,
    //                         touched,
    //                         handleChange,
    //                         handleBlur,
    //                         handleSubmit,
    //                     }) => (
    //                     <Form>
    //                         <div className='auth-inputs mt-2'>
    //                             <p style={{marginBottom: '1rem', fontSize: '16px'}}>Sign up to continue</p>
    //                             <TextField
    //                                 id="outlined-basic"
    //                                 label="Name"
    //                                 variant="outlined"
    //                                 name='name'
    //                                 onChange={handleChange}
    //                                 onBlur={handleBlur}
    //                                 value={values.name}
    //                                 required
    //                                 size='small'
    //                                 error={!!(errors.name && touched.name)}
    //                                 helperText={errors.name && touched.name ? errors.name : null}
    //                                 InputProps={{
    //                                     startAdornment: (
    //                                     <InputAdornment position="start" sx={{marginTop: '8px'}}>
    //                                         <Person sx={{color: '#8c8c8c'}}/>
    //                                     </InputAdornment>
    //                                     ),
    //                                 }}
    //                             />
    //                             <TextField
    //                                 id="outlined-basic"
    //                                 label="Email"
    //                                 variant="outlined"
    //                                 name='email'
    //                                 onChange={handleChange}
    //                                 onBlur={handleBlur}
    //                                 value={values.email}
    //                                 required
    //                                 size='small'
    //                                 error={!!(errors.email && touched.email)}
    //                                 helperText={errors.email && touched.email ? errors.email : null}
    //                                 InputProps={{
    //                                     startAdornment: (
    //                                     <InputAdornment position="start" sx={{marginTop: '8px'}}>
    //                                         <Email sx={{color: '#8c8c8c'}}/>
    //                                     </InputAdornment>
    //                                     ),
    //                                 }}
    //                             />
    //                             <TextField
    //                                 id="outlined-basic"
    //                                 label="Password"
    //                                 variant="outlined"
    //                                 type="password"
    //                                 name='password'
    //                                 onChange={handleChange}
    //                                 onBlur={handleBlur}
    //                                 value={values.password}
    //                                 required
    //                                 size='small'
    //                                 error={!!(errors.password && touched.password)}
    //                                 helperText={errors.password && touched.password ? errors.password : null}
    //                                 InputProps={{
    //                                     startAdornment: (
    //                                     <InputAdornment position="start" sx={{marginTop: '8px'}}>
    //                                         <Lock sx={{color: '#8c8c8c'}}/>
    //                                     </InputAdornment>
    //                                     ),
    //                                 }}
    //                             />
    //                             <TextField
    //                                 id="outlined-basic"
    //                                 label="Confirm Password"
    //                                 variant="outlined"
    //                                 type="password"
    //                                 name='confirmPassword'
    //                                 onChange={handleChange}
    //                                 onBlur={handleBlur}
    //                                 value={values.confirmPassword}
    //                                 required
    //                                 size='small'
    //                                 error={!!(errors.confirmPassword && touched.confirmPassword)}
    //                                 helperText={errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
    //                                 InputProps={{
    //                                     startAdornment: (
    //                                     <InputAdornment position="start" sx={{marginTop: '8px'}}>
    //                                         <Lock sx={{color: '#8c8c8c'}}/>
    //                                     </InputAdornment>
    //                                     ),
    //                                 }}
    //                             />
    //                             <TextField
    //                                 id="outlined-basic"
    //                                 label="Organization Name"
    //                                 variant="outlined"
    //                                 type="text"
    //                                 name='org'
    //                                 onChange={handleChange}
    //                                 onBlur={handleBlur}
    //                                 value={values.org}
    //                                 size='small'
    //                                 error={!!(errors.org && touched.org)}
    //                                 helperText={errors.org && touched.org ? errors.org : null}
    //                                 InputProps={{
    //                                     startAdornment: (
    //                                     <InputAdornment position="start" sx={{marginTop: '8px'}}>
    //                                         <Apartment sx={{color: '#8c8c8c'}}/>
    //                                     </InputAdornment>
    //                                     ),
    //                                 }}
    //                             />
    //                             <ReCAPTCHA
    //                                 sitekey="6LekJZMqAAAAAJSwoZjKCDRv9xR4xaNQYmfBLQsa"
    //                                 onChange={(token:any) => setRecaptchaToken(token)}
    //                             />
    //                             <Button variant="contained" type="submit" disabled={loading}>
    //                                 {!loading ? 'Sign Up' : <CircularProgress size={20}/>}
    //                             </Button>
    //                         </div>
    //                         <Divider sx={{marginTop: '1rem', marginBottom: '1rem'}}/>
    //                         <p>Already have an account? <Link href={'/login'}>Click here to login</Link> </p>
    //                     </Form>
    //                     )}
    //                 </Formik>
    //             </div>
    //         )}
    //     </Box>
    // </Box>
  );
}
