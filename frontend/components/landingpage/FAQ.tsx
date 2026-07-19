"use client";

import { useState } from "react";
import { RiAddLine } from "react-icons/ri";

const faqs = [
    {
        q: "Which social media platforms does Oxfira support?",
        a: "Oxfira currently supports Instagram, X (Twitter), LinkedIn, TikTok, and Facebook. We're actively working on adding YouTube Shorts, Pinterest, and Threads — stay tuned for updates.",
    },
    {
        q: "Can I schedule posts in advance?",
        a: "Yes! You can schedule posts days, weeks, or even months ahead. Oxfira's smart calendar lets you visualize your entire content pipeline and reschedule with a simple drag-and-drop.",
    },
    {
        q: "Is there a free plan available?",
        a: "Absolutely. Our free plan lets you connect up to 3 social accounts and schedule up to 30 posts per month. No credit card required to get started.",
    },
    {
        q: "How does the analytics dashboard work?",
        a: "Once your accounts are connected, Oxfira automatically pulls engagement data — likes, comments, reach, impressions, and follower growth — and presents them in a unified dashboard so you can compare performance across platforms at a glance.",
    },
    {
        q: "Is my data and account access secure?",
        a: "Security is a top priority. We use OAuth 2.0 to connect your social accounts — meaning we never store your passwords. All data is encrypted in transit and at rest, and we're SOC 2 Type II compliant.",
    },
];


export default function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);
    return (
        <section >
            <div className="max-w-190 mx-auto">
                <p className="text-[12px] font-medium tracking-widest uppercase text-blue-brand mb-3">
                    FAQ
                </p>
                <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-medium text-navy-950 mb-3">
                    Questions we hear a lot
                </h2>
                <p className="text-[15px] text-navy-900/60 leading-relaxed mb-12">
                    Everything you need to know about Oxfira. Can't find an answer? Our team is happy to help.
                </p>

                <div>
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`border-t border-navy-950/10 py-5 ${i === faqs.length - 1 ? "border-b" : ""}`}
                        >
                            <button
                                className="w-full flex items-center justify-between gap-4 bg-transparent border-0 cursor-pointer text-left p-0"
                                onClick={() => toggle(i)}
                            >
                                <span className="text-[15px] font-bold text-navy-950">{faq.q}</span>
                                <span
                                    className={`shrink-0 transition-transform duration-250 ${openIndex === i ? "rotate-45 text-blue-brand" : "text-navy-950/40"
                                        }`}
                                >
                                    <RiAddLine size={20} />
                                </span>
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? "max-h-50 pt-3" : "max-h-0"
                                    }`}
                            >
                                <p className="text-[14px] text-navy-900/60 leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}