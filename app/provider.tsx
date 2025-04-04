"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import ReduxProvider from "./redux-provider";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

// List of public routes that don't require authentication
const PUBLIC_ROUTES = [
  "/",
  "/coming-soon",
  "/login",
  "/sign-up",
  "/verification",
  "/forgot",
  "/forgot-otp",
  "/change-password",
];

export default function Providers({ children }: PropsWithChildren) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      // Handle token from URL and redirect to dashboard
      if (token) {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({ access_token: token })
        );
        router.push("/dashboard");
        return;
      }

      // Skip authentication check for public routes
      if (PUBLIC_ROUTES.includes(window.location.pathname)) {
        console.log(window.location.pathname);

        setIsLoading(false);
        return;
      }

      // Validate user token
      const userInfo = localStorage.getItem("userInfo");
      const accessToken = userInfo ? JSON.parse(userInfo).access_token : null;

      if (!accessToken) {
        redirectToLogin();
        return;
      }

      try {
        const decodedToken = jwtDecode(accessToken);
        if (decodedToken.exp && decodedToken.exp < Date.now() / 1000) {
          redirectToLogin();
          return;
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        redirectToLogin();
        return;
      }

      setIsLoading(false);
    };

    const redirectToLogin = () => {
      localStorage.removeItem("userInfo");
      router.push("/login");
      window.location.href = "/login"; // Ensure full page reload to clear state
    };

    initializeAuth();
  }, [router]);

  return (
    <ReduxProvider>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          Loading...
        </div>
      ) : (
        children
      )}
    </ReduxProvider>
  );
}
