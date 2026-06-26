import {
  RiLayoutGridLine,
  RiTwitterXLine,
  RiInstagramLine,
  RiLinkedinLine,
} from "react-icons/ri";

const footerLinks = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Support: ["Help center", "Contact us", "Privacy policy", "Terms of service"],
};

const socialLinks = [
  { label: "X / Twitter", icon: <RiTwitterXLine size={15} /> },
  { label: "Instagram", icon: <RiInstagramLine size={15} /> },
  { label: "LinkedIn", icon: <RiLinkedinLine size={15} /> },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/6 px-6 pt-16 pb-8">
      <div className="max-w-275 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 text-gray-100 no-underline mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-brand flex items-center justify-center shrink-0">
                <RiLayoutGridLine size={16} color="#fff" />
              </div>
              <span className="text-[17px] font-medium tracking-tight">Oxfira</span>
            </a>
            <p className="text-[13px] text-gray-500 leading-relaxed max-w-57.5">
              The simplest way for creators, marketers, and brands to stay consistent on every social platform.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-[13px] font-medium text-gray-300 mb-4">{heading}</h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[13px] text-gray-500 hover:text-gray-200 transition-colors no-underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/6 pt-6">
          <p className="text-[12px] text-gray-600">© 2026 Oxfira. All rights reserved.</p>
          <div className="flex gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="w-8.5 h-8.5 rounded-lg border border-white/10 flex items-center justify-center text-gray-500 hover:bg-blue-brand/40 hover:text-gray-200 transition-colors no-underline"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}