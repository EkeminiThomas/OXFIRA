import {
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
    FaYoutube,
    FaTiktok,
    FaPinterest,
    FaSnapchatGhost,
} from "react-icons/fa";


const socialHandles = [
    { platform: "Facebook", handle: "@yourbrand", icon: FaFacebook, color: "#1877F2" },
    { platform: "Twitter", handle: "@yourbrand", icon: FaTwitter, color: "#1DA1F2" },
    { platform: "Instagram", handle: "@yourbrand", icon: FaInstagram, color: "#E1306C" },
    { platform: "LinkedIn", handle: "@yourbrand", icon: FaLinkedin, color: "#0A66C2" },
    { platform: "YouTube", handle: "@yourbrand", icon: FaYoutube, color: "#FF0000" },
    { platform: "TikTok", handle: "@yourbrand", icon: FaTiktok, color: "#000000" },
    { platform: "Pinterest", handle: "@yourbrand", icon: FaPinterest, color: "#E60023" },
    { platform: "Snapchat", handle: "@yourbrand", icon: FaSnapchatGhost, color: "#FFFC00" },
]

export default function Plaform() {
    return (
        <div className="w-full">
            <h1 className="font-bold">Platforms</h1>
            <div className="flex flex-col gap-3 outline">
                {socialHandles.map(({ platform, handle, icon: Icon, color }) => (
                    <div
                        key={platform}

                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Icon size={22} style={{ color }} />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{platform}</span>
                            <span className="text-xs text-gray-400">{handle}</span>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}