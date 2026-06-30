import Image from 'next/image';
import Button from '../shared/Button';
import { RiArrowRightLine } from 'react-icons/ri';



export default function Hero() {
    return (
        <section className="relative text-center bg-corner-gradient  text-white  mx-6 mt-6 rounded-xl pt-24  overflow-hidden">

            <div className="flex flex-wrap gap-3 justify-center">
                <span className='text-[40px] font-bold'>Your communities live everywhere. <br /> OXFiRA brings them together</span>
            </div>
            <div className='flex justify-center items-center gap-4 mx-auto mt-4'>
                <Button text='Watch Demo' />
                <Button text='Start your free Trial' icon={<RiArrowRightLine size={24} className='mt-1 mx-2 ' />} />
            </div>

            <Image
                src='/HeroIcon.svg'
                alt='hero-image'
                height={100}
                width={100}
                className='item-center mx-auto h-auto w-auto mt-20 mb-0 '
            />

        </section>
    );
}