"use client";

import { useState } from "react";
import Link from "next/link";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookFill, RiInstagramLine } from "react-icons/ri";
import { SiPinterest } from "react-icons/si";

const testimonial = {
    quote:
        "Swipe Social is a game-changer! It simplifies scheduling and design, saving me time and letting me focus on quality content. A must-have for digital marketers!",
    name: "Thomson Phillip",
    role: "Content Creator",
};

const socialProviders = [
    { label: "Google", icon: <FcGoogle size={22} /> },
    { label: "Facebook", icon: <RiFacebookFill size={22} className="text-blue-600" /> },
    { label: "Instagram", icon: <RiInstagramLine size={22} className="text-pink-500" /> },
    { label: "Pinterest", icon: <SiPinterest size={22} className="text-red-600" /> },
];
const page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", password: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    return (
        <div className="min-h-screen flex bg-white overflow-hidden">

            {/* ── Left panel — form ── */}
            <div className="flex flex-1 items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm">
                    <h1 className="text-3xl font-bold text-gray-900 mb-1">Welcome abroad</h1>
                    <p className="text-gray-500 text-sm mb-7">Let's get your account set up</p>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            name="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
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

                    {/* Terms */}
                    <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                        By clicking Sign Up, you've agree to Swipe Social{" "}
                        <Link href="/terms" className="text-blue-600 hover:underline">Terms and Condition</Link>{" "}
                        ans it's{" "}
                        <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>{" "}
                        has been acknowledge.
                    </p>

                    {/* Sign up button */}
                    <button
                        type="button"
                        className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 rounded-full transition-colors duration-150"
                    >
                        Sign up
                    </button>

                    {/* Divider */}
                    <div className="flex items-center gap-3 my-6">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-xs text-gray-400 whitespace-nowrap">Or register with</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div>

                    {/* Social icons */}
                    <div className="flex justify-center gap-4">
                        {socialProviders.map(({ label, icon }) => (
                            <button
                                key={label}
                                type="button"
                                aria-label={`Register with ${label}`}
                                className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-md hover:border-gray-300 hover:bg-gray-50 transition"
                            >
                                {icon}
                            </button>
                        ))}
                    </div>

                    {/* Log in link */}
                    <p className="text-center text-sm text-gray-500 mt-8">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 font-medium hover:underline">Log in</Link>
                    </p>
                </div>
            </div>

            {/* ── Right panel — blue arc + testimonial ── */}
            <div className="relative hidden md:flex w-[45%] items-center justify-center bg-white overflow-hidden">

                {/* Blue stroke arc visible on the left edge of this panel */}
                <div
                    className="absolute"
                    style={{
                        width: "140%",
                        paddingBottom: "140%",
                        borderRadius: "50%",
                        background: "radial-gradient(circle at 60% 35%, #2D57DE, #1B3485 45%, #122359 100%)",
                        border: "3px solid #3B82F6",
                        top: "50%",
                        right: "-65%",
                        transform: "translateY(-50%)",
                    }}
                />

                {/* Testimonial sits inside the visible slice of the circle */}
                <div className="relative z-10 w-64 ml-8">
                    {/* Quote icon */}
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

                    <p className="text-white font-bold text-[15px] leading-snug mb-5">
                        {testimonial.quote}
                    </p>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/30 shrink-0" />
                        <div>
                            <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                            <p className="text-blue-200 text-xs">{testimonial.role}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default page