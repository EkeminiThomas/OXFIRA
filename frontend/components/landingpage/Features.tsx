import Image from "next/image";
import Button from "../shared/Button";
import { FaGreaterThan } from "react-icons/fa";

export default function Features() {
    return (
        <div className="max-w-7xl px-4 sm:px-6 md:mx-10">

            {/* Section 1 */}
            <section>
                <span className="text-text-hue font-bold text-lg sm:text-xl md:text-2xl my-8 md:my-14 block">
                    Manage Every Conversation, Community, and Post in One Place
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex flex-col">
                        <span className="text-xl sm:text-2xl md:text-[30px] font-bold text-text-hue">
                            Post and manage multiple social media and community at.
                        </span>
                        <span className="text-base sm:text-lg md:text-[24px] font-normal text-black mt-6">
                            Connect your favourite social platforms, manage communities, schedule content,
                            and stay on top of every notification from a single intelligent dashboard.
                        </span>
                        <Button
                            text='Learn More'
                            className='rounded-lg outline bg-white text-zinc-500 w-full sm:w-48 my-5'
                            icon={<FaGreaterThan size={16} className="mt-0.5 ml-2" />}
                        />
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src='/Group 5766.svg'
                            width={100}
                            height={100}
                            alt='Post and manage social media'
                            className="w-full max-w-xs sm:max-w-sm md:max-w-full h-auto"
                        />
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="my-10">
                <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-8">
                    <div className="flex justify-center w-full md:w-auto">
                        <Image
                            src='/Frame 6327.svg'
                            width={100}
                            height={100}
                            alt='Task summary dashboard'
                            className="w-full max-w-xs sm:max-w-sm md:max-w-full h-auto"
                        />
                    </div>
                    <div className="w-full md:max-w-md">
                        <h1 className="text-text-hue font-bold text-2xl sm:text-3xl md:text-[36px]">
                            Task Summary!
                        </h1>
                        <p className="text-base sm:text-lg md:text-[20px] mt-2">
                            Monitor the Summary of your post at same time with ease
                        </p>
                        <Button
                            text='Learn More'
                            className='rounded-lg outline bg-white text-zinc-500 w-full sm:w-48 my-5'
                            icon={<FaGreaterThan size={16} className="mt-0.5 ml-2" />}
                        />
                    </div>
                </div>
            </section>

            {/* Section 3 */}
            <section className="flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="w-full md:max-w-md">
                    <h1 className="text-xl sm:text-2xl font-bold text-text-hue">
                        View content and platform performance.
                    </h1>
                    <p className="text-base sm:text-lg mt-2">
                        Monitor the progress of your post on different social medias and
                        community directly from OXFiRA.
                    </p>
                    <Button
                        text='Learn More'
                        className='rounded-lg outline bg-white text-zinc-500 w-full sm:w-48 my-5'
                        icon={<FaGreaterThan size={16} className="mt-0.5 ml-2" />}
                    />
                </div>
                {/* placeholder for image/content */}
                <div className="w-full md:w-auto" />
            </section>

            {/* Section 4 — CTA buttons */}
            <section className="flex flex-col sm:flex-row justify-evenly items-center gap-4 mt-10 mx-0  my-10 sm:mx-10">
                <Button text='Connect' className="w-full sm:w-35 rounded-lg" />
                <Button text='Share'   className="w-full sm:w-35 rounded-lg" />
                <Button text='Belong'  className="w-full sm:w-35 rounded-lg" />
            </section>

        </div>
    );
}