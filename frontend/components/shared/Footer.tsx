import {
  RiLayoutGridLine,
  RiTwitterXLine,
  RiInstagramLine,
  RiLinkedinLine,
} from "react-icons/ri";
import Image from 'next/image';
import { GoDotFill } from "react-icons/go";
import { FaFacebook, FaTiktok } from "react-icons/fa";

const footerLinks = {
  OXFiRA: ["Logo", "Slogan", "Description", "Social icons"],
  Platform: ["Features", "Intergrations"],
  Company: ["About", "Pricing", "FAQ", "Contact"],

};

const socialLinks = [
  { label: "X / Twitter", icon: <RiTwitterXLine size={15} className="text-white" /> },
  { label: "TikTok", icon: <FaTiktok size={15} className="text-white" /> },
  { label: "Instagram", icon: <RiInstagramLine size={15} className="text-white" /> },
  { label: "Facebook", icon: <FaFacebook size={15} className="text-white" /> },
  { label: "LinkedIn", icon: <RiLinkedinLine size={15} className="text-white" /> },


];

export default function Footer() {
  return (
    <footer className="bg-text-hue text-white px-6 pt-16 pb-8">
      <div className="max-w-275 md:mx-30">
        <div className="grid grid-cols-3 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12 mx-auto">


          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[13px] font-medium text-white mb-4">{heading}</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13px] text-white transition-colors no-underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/6 pt-6">
          <a href="#" className="flex items-center gap-2.5  no-underline">
            <Image
              src='/oxifraLogo.svg'
              width={40}
              height={40}
              alt='oxfira-Logo' />
            <span className=' text-text-hue'>OXFiRA</span>
          </a>

        </div> */}

        <div className="flex justify-between my-10 ">
          <div className="flex " >
            <Image
              src='/oxfiraFooterLogo.svg'
              height={10}
              width={10}
              className="w-auto h-auto" alt="footer logo" />
            <span className="mt-3 ml-2 " >OXFiRA</span>
          </div>

          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-8.5 h-8.5 rounded-lg border border-white/10 flex items-center justify-center text-white hover:bg-blue-brand/40 hover:text-gray-200 transition-colors no-underline"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <section>2026 OXFiRA</section>
          <section className="flex justify-around">
            <span className="flex " >Privacy <GoDotFill className="mt-1" /> </span>
            <span className="flex " >Terms <GoDotFill className="mt-1" /> </span>
            <span className="flex " >Cookies <GoDotFill className="mt-1" /> </span>
            <span className="flex " >Security </span>

          </section>
        </div>
      </div>
    </footer>
  );
}