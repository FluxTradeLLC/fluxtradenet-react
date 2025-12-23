import React, { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../../api/axios";
import Cookies from "js-cookie";

export const SignIn = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const navigate = useNavigate();
  const cookieOptions = {
    path: "/",
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
    ...(process.env.NODE_ENV === "production"
      ? { domain: ".fluxtrade.net" }
      : {}),
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/users/login", { email, password });
      Cookies.set("token", res.data.token, { ...cookieOptions, expires: 7 });
      localStorage.setItem("userEmail", email);
      // alert('Signed in!');
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || t("auth.signInFailed"));
    }
  };

  const handleGoogleSubmit = async () => {
    setError("");
    try {
      const res = await api.get("/users/login/google");
      window.location.href = res.data.url;
    } catch (err) {
      setError(err.response?.data?.error || t("auth.googleSignInFailed"));
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center text-white mb-8">
        {t("auth.signIn")}
      </h2>
      {error && (
        <p
          className="text-red-500 text-center mb-4"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
      <form onSubmit={handleEmailSubmit} aria-label="Sign in form">
        <div className="mb-4">
          <label htmlFor="signin-email" className="sr-only">
            {t("auth.email")}
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder={t("auth.email")}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="signin-password" className="sr-only">
            {t("auth.password")}
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder={t("auth.password")}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-required="true"
          />
        </div>
        <div className="mb-6">
          <p className="text-sm text-gray-300 text-center">
            {t("auth.byUsingService")}{" "}
            <Link
              to="/terms"
              onClick={(e) => {
                e.preventDefault();
                window.open("/terms", "_blank", "noopener,noreferrer");
              }}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              {t("footer.terms")}
            </Link>{" "}
            {t("auth.and")}{" "}
            <Link
              to="/policies"
              onClick={(e) => {
                e.preventDefault();
                window.open("/policies", "_blank", "noopener,noreferrer");
              }}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              {t("footer.refundPolicies")}
            </Link>
          </p>
        </div>
        <button
          type="submit"
          disabled={!email || !password}
          className="w-full bg-[#5865F2] hover:bg-[#4752C4] disabled:bg-gray-600 disabled:cursor-not-allowed disabled:hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label={t("auth.signIn")}
        >
          {t("auth.signIn")}
        </button>
      </form>
      <div
        className="relative flex py-5 items-center"
        role="separator"
        aria-label={t("auth.or")}
      >
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="flex-shrink mx-4 text-gray-400">{t("auth.or")}</span>
        <div className="flex-grow border-t border-gray-600"></div>
      </div>
      <button
        onClick={handleGoogleSubmit}
        className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm flex items-center justify-center"
        aria-label={t("auth.signInWithGoogle")}
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            fill="#FFC107"
            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
          />
          <path
            fill="#FF3D00"
            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
          />
          <path
            fill="#4CAF50"
            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
          />
          <path
            fill="#1976D2"
            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.089,5.571l6.19,5.238C42.022,34.627,44,29.692,44,24C44,22.659,43.862,21.35,43.611,20.083z"
          />
        </svg>
        {t("auth.signInWithGoogle")}
      </button>
    </div>
  );
};
