interface ButtonProps {
    text: string;
    onClick?: () => void;
    icon?: React.ReactNode

}

export default function Button({ text, onClick, icon }: ButtonProps) {
    return (
        <div onClick={onClick} className="bg-blue-900 flex px-8 py-3 text-xl rounded-3xl mx-6 cursor-pointer   ">
            {text}
            {icon}
        </div>
    )
}