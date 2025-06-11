import Image from 'next/image';
import { BsPerson } from 'react-icons/bs';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';

export default function Benefits() {
    return (
        <section
            aria-describedby="benefits"
            className="mx-6 my-24 grid max-w-(--breakpoint-lg) md:grid-cols-2 md:gap-x-5 lg:mx-auto"
        >
            <div className="space-y-6">
                <h2 id="benefits" className="text-3xl font-bold md:text-5xl">
                    Benefits of psychological therapy
                </h2>
                <p>
                    Sample text. Click to select the text box. Click again or
                    double click to start editing the text.
                </p>
                <div className="space-y-6">
                    <div className="flex gap-x-4">
                        <HiOutlineDevicePhoneMobile
                            className="h-14 w-full max-w-14"
                            color="#cf471f"
                        />
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">
                                About Our Company
                            </h3>
                            <p>
                                Sample text. Click to select the text box. Click
                                again or double click to start editing the text.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-x-4">
                        <BsPerson
                            className="h-14 w-full max-w-14"
                            color="#cf471f"
                        />
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">
                                About Our Work
                            </h3>
                            <p>
                                Sample text. Click to select the text box. Click
                                again or double click to start editing the text.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Image
                src="/assets/home/benefits.jpeg"
                alt="benefits"
                width={0}
                height={0}
                sizes="100vw"
                className="h-140 w-full bg-center object-cover max-md:mt-3 md:object-contain"
            />
        </section>
    );
}
