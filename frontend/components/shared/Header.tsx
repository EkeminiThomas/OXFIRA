'use client'
import React, { useState } from 'react'
import { RiCloseLine, RiLayoutGridLine, RiMenu2Line } from 'react-icons/ri';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between h-16 px-6 md:px-10 border-b border-gray-300/40 bg-gray-100/98 backdrop-blur-md">
            <a href="#" className="flex items-center gap-2.5 text-navy-950 no-underline">
                <div className="w-8 h-8 rounded-lg bg-blue-brand flex items-center justify-center shrink-0">
                    <RiLayoutGridLine size={17} color="#fff" />
                </div>
                <span className="text-[17px] font-medium tracking-tight">Oxfira</span>
            </a>

            <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
                {["Features", "Platforms", "Pricing", "Blog"].map((link) => (
                    <li key={link}>
                        <a href="#" className="text-sm text-navy-900/60 hover:text-navy-950 transition-colors no-underline">
                            {link}
                        </a>
                    </li>
                ))}
            </ul>

            <div className="hidden md:flex items-center gap-2.5">
                <button className="px-4 py-2 text-sm rounded-lg border border-navy-950/20 bg-transparent text-navy-950 hover:bg-navy-950/5 transition-colors cursor-pointer">
                    Log in
                </button>
                <button className="px-4 py-2 text-sm rounded-lg bg-blue-brand text-white font-medium hover:opacity-85 transition-opacity cursor-pointer border-0">
                    Get started
                </button>
            </div>

            <button
                className="md:hidden bg-transparent border-0 text-navy-950 cursor-pointer p-1"
                aria-label="Toggle menu"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <RiCloseLine size={22} /> : <RiMenu2Line size={22} />}
            </button>

            {menuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-gray-100 border-b border-gray-300/40 px-6 py-5 flex flex-col gap-4 md:hidden">
                    {["Features", "Platforms", "Pricing", "Blog"].map((link) => (
                        <a key={link} href="#" className="text-sm text-navy-900/60 hover:text-navy-950 transition-colors no-underline">
                            {link}
                        </a>
                    ))}
                    <div className="flex gap-2.5 pt-2 border-t border-navy-950/10">
                        <button className="flex-1 px-4 py-2 text-sm rounded-lg border border-navy-950/20 bg-transparent text-navy-950 cursor-pointer">
                            Log in
                        </button>
                        <button className="flex-1 px-4 py-2 text-sm rounded-lg bg-blue-brand text-white font-medium cursor-pointer border-0">
                            Get started
                        </button>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Header