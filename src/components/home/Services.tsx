import Image from 'next/image';
import { FaCheck } from 'react-icons/fa';

export default function Services() {
    return (
        <section
            className="mt-32 flex items-center justify-center max-lg:flex-col max-sm:mx-6"
            aria-label="services"
        >
            <div className="max-w-96 md:-ml-48 lg:ml-0">
                <Image
                    src="/assets/home/services.jpeg"
                    alt="services"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="size-96 object-cover"
                />
                <div className="flex flex-col gap-y-5 bg-[rgb(242,242,242)] p-8 md:-translate-y-28 md:translate-x-1/2 lg:translate-x-6 xl:translate-x-1/2">
                    <div className="size-20 rounded-full bg-red-500"></div>
                    <p>
                        Sample text. Click to select the text box. Click again
                        or double click to start editing the text.
                    </p>
                    <h2 className="font-bold">Dr. Test Test</h2>
                </div>
            </div>
            <div className="grid w-full max-w-96 auto-rows-[20rem] max-md:mt-8 md:max-w-xl md:-translate-y-8 md:grid-cols-2 lg:ml-12 xl:ml-60">
                <div className="flex w-full flex-col items-center justify-center gap-y-7">
                    <FaCheck
                        color="white"
                        className="size-24 bg-orange-400 p-2"
                    />
                    <h2 className="text-xl font-bold">Unlimited Revisions</h2>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-y-7 bg-gray-400/25">
                    <FaCheck
                        color="white"
                        className="size-24 bg-orange-400 p-2"
                    />
                    <h2 className="text-xl font-bold">Good Features</h2>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-y-7">
                    <FaCheck
                        color="white"
                        className="size-24 bg-orange-400 p-2"
                    />
                    <h2 className="text-xl font-bold">Best Solutions</h2>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-y-7">
                    <FaCheck
                        color="white"
                        className="size-24 bg-orange-400 p-2"
                    />
                    <h2 className="text-xl font-bold">24/7 Supports</h2>
                </div>
            </div>
        </section>
    );
}
