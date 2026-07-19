import { cn } from "@/lib/utils";


interface ButtonProps {
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode;

    className?: string;

}

export default function Button({ text, onClick, icon, className }: ButtonProps) {
    return (
        <div onClick={onClick} className={cn("bg-text-hue flex px-8 py-3 text-xl text-white rounded-3xl mx-6 cursor-pointer", className)} >
            {icon}
            {text}

        </div>
    )
}

