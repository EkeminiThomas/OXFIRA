"use client";

import Image from "next/image";
import Link from "next/link";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookFill, RiInstagramLine } from "react-icons/ri";
import { SiPinterest } from "react-icons/si";
import { useState } from "react";
import useLogin from "@/hooks/useLogin";


const testimonial = {
  quote:
    "Swipe Social is a game-changer! It simplifies scheduling and design, saving me time and letting me focus on quality content. A must-have for digital marketers!",
  name: "Thomson Phillip",
  role: "Content Creator",
  avatar: "/avatar.png",
};

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);

  // SRP: all API-consuming logic lives inside this hook, NOT in this component.
  // This component's only job is to render inputs and hand their values to the hook.
  const { email, setEmail, password, setPassword, error, isLoading, handleLogin } = useLogin();

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      {/* ── Left panel ── */}
      <div className="relative hidden md:flex w-[45%] items-center justify-center bg-white overflow-hidden">
        <div
          className="absolute"
          style={{
            width: "130%",
            paddingBottom: "130%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #2D57DE, #1B3485 50%, #122359 100%)",
            top: "50%",
            left: "-55%",
            transform: "translateY(-50%)",
          }}
        />
        <div className="relative z-10 mx-auto w-72">
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path
                  d="M0 14V8.4C0 5.6 1.2 3.2 3.6 1.2L5.4 2.8C4.2 3.8 3.4 5 3.2 6.4H6V14H0ZM10 14V8.4C10 5.6 11.2 3.2 13.6 1.2L15.4 2.8C14.2 3.8 13.4 5 13.2 6.4H16V14H10Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="border border-dashed border-blue-300/60 rounded-xl p-5">
            <p className="text-white font-bold text-[15px] leading-snug">{testimonial.quote}</p>
            <div className="flex items-center gap-3 mt-5">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/30 shrink-0">
                <div className="w-full h-full bg-gray-300 rounded-full" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                <p className="text-blue-200 text-xs">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Log in</h1>
          <p className="text-gray-500 text-sm mb-8">Welcome back!</p>

          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <RiEyeOffLine size={18} /> : <RiEyeLine size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-right mb-6">
            <Link href="/forgot-password" className="text-xs text-gray-500 hover:text-blue-600 transition">
              Forgotten password? Click here
            </Link>
          </div>

          {/* Log in button — this is where the API call gets TRIGGERED,
              but the actual fetch logic lives in authService.ts, called
              via useLogin(). The component itself never touches fetch. */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-full transition-colors duration-150"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 whitespace-nowrap">Or login with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social icons — each of these would eventually call its OWN
              service function (e.g. loginWithGoogle() via NextAuth's signIn,
              since OAuth flows are handled differently from your credentials
              API call above). Keep that logic in a separate service/hook too,
              don't inline fetch/signIn calls directly in these onClick props. */}
          <div className="flex justify-center gap-4">
            {[
              { label: "Google", icon: <FcGoogle size={22} /> },
              { label: "Facebook", icon: <RiFacebookFill size={22} className="text-blue-600" /> },
              { label: "Instagram", icon: <RiInstagramLine size={22} className="text-pink-500" /> },
              { label: "Pinterest", icon: <SiPinterest size={22} className="text-red-600" /> },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                aria-label={`Login with ${label}`}
                className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-md hover:border-gray-300 hover:bg-gray-50 transition"
              >
                {icon}
              </button>
            ))}
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;