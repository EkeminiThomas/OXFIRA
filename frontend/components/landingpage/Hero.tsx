import {
    RiInstagramLine,
    RiTwitterXLine,
    RiLinkedinLine,
    RiTiktokLine,
    RiFacebookLine,
    RiArrowRightLine,
    RiStarLine,
} from "react-icons/ri";

const platforms = [
    { name: "Instagram", icon: <RiInstagramLine size={18} /> },
    { name: "X / Twitter", icon: <RiTwitterXLine size={16} /> },
    { name: "LinkedIn", icon: <RiLinkedinLine size={17} /> },
    { name: "TikTok", icon: <RiTiktokLine size={16} /> },
    { name: "Facebook", icon: <RiFacebookLine size={17} /> },
];

export default function Hero() {
    return (
        <section className="relative text-center px-6 pt-24 pb-20 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-175 h-100 rounded-full bg-[radial-gradient(ellipse,rgba(9,17,44,0.07)_0%,transparent_70%)] pointer-events-none" />

            <div className="inline-flex items-center gap-2 bg-white/70 border border-gray-300 rounded-full px-4 py-1.5 text-[13px] text-navy-900/70 mb-6">
                <RiStarLine size={13} className="text-blue-brand" />
                Schedule, publish, and grow — all in one place
            </div>

            <h1 className="text-[clamp(2rem,5vw,3.2rem)] font-medium leading-[1.2] text-navy-950 max-w-170 mx-auto mb-5">
                Post smarter across{" "}
                <span className="text-blue-brand">every platform</span> you love
            </h1>

            <p className="text-[17px] text-navy-900/60 max-w-125 mx-auto mb-10 leading-relaxed">
                Oxfira lets you schedule, publish, and analyze your content across Instagram, X, LinkedIn, TikTok and more — from a single dashboard.
            </p>

            <div className="flex flex-wrap gap-3 justify-center">
                <button className="px-8 py-3.5 text-[15px] font-medium rounded-xl bg-blue-brand text-white hover:opacity-85 transition-opacity cursor-pointer border-0">
                    Start for free
                </button>
                <button className="px-8 py-3.5 text-[15px] font-medium rounded-xl border border-navy-950/20 bg-white/60 text-navy-950 hover:bg-white/80 transition-colors cursor-pointer flex items-center gap-2">
                    See how it works
                    <RiArrowRightLine size={15} />
                </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mt-16">
                {platforms.map((p) => (
                    <div
                        key={p.name}
                        className="flex items-center gap-2 bg-white/60 border border-gray-300 rounded-full px-5 py-2.5 text-[13px] text-navy-900/70"
                    >
                        <span className="text-blue-brand">{p.icon}</span>
                        {p.name}
                    </div>
                ))}
            </div>
        </section>
    );
}