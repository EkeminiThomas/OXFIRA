'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { RiArrowRightLine, RiCloseLine, RiLayoutGridLine, RiMenu2Line } from 'react-icons/ri';

const NavLinks = [
    { Name: 'Platform', link: '/platform' },
    { Name: 'Resources', link: '/resource' },
    { Name: 'Pricing', link: '/pricing' },
    { Name: 'Company', link: '/company' },
]

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between h-16 px-6 md:px-10 border-b backdrop-blur-md">
            <a href="#" className="flex items-center gap-2.5  no-underline">
                <Image
                    src='/oxifraLogo.svg'
                    width={40}
                    height={40}
                    alt='oxfira-Logo' />
                <span className=' text-text-hue'>OXFiRA</span>
            </a>



            <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
                {NavLinks.map((links) => (
                    <li key={links.Name}>
                        <Link href={links.link} className="text-md text-text-hue transition-colors no-underline">
                            {links.Name}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className="hidden md:flex items-center gap-2.5">
                <Link href='/login'>
                    <button className="flex-1 px-4 py-2 text-sm text-text-hue bg-transparent cursor-pointer">
                        Sign in
                    </button>
                </Link>

                <Link href='/register'>
                    <button className="flex items-center gap-1.5 px-4 py-2 text-sm rounded-full bg-blue-brand text-white font-medium hover:opacity-85 transition-opacity cursor-pointer border-0">
                        Get started
                        <RiArrowRightLine size={16} />
                    </button>
                </Link>
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
                    {NavLinks.map((links) => (
                        <Link key={links.Name} href={links.link} className="text-sm text-text-hue transition-colors no-underline">
                            {links.Name}
                        </Link>
                    ))}
                    <div className="flex gap-2.5 pt-2 border-t border-navy-950/10">
                        <button className="flex-1 px-4 py-2 text-sm  bg-transparent text-text-hue cursor-pointer">
                            Sign in
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