import Image from 'next/image';

export default function Goals() {
    return (
        <section
            aria-describedby="our goals"
            className="mx-6 grid max-w-screen-lg justify-center max-md:gap-y-8 max-sm:mx-6 md:grid-cols-2 md:gap-x-8 lg:mx-auto"
        >
            <div>
                <h2 id="goals" className="text-4xl font-bold">
                    Our Goals
                </h2>
                <p className="mt-4">
                    Sample text. Click to select the text box. Click again or
                    double click to start editing the text.
                </p>
                <div className="mt-10 flex flex-col gap-y-10">
                    <div className="flex gap-x-5">
                        <Image
                            src="/assets/home/our-mission.png"
                            alt="our mission icon"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="size-16 object-contain"
                        />
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">Our Mission</h3>
                            <p>
                                Sample text. Click to select the text box. Click
                                again or double click to start editing the text.
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-x-5">
                        <Image
                            src="/assets/home/our-vision.png"
                            alt="our mission icon"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="size-16 object-contain"
                        />
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold">Our Vision</h3>
                            <p>
                                Sample text. Click to select the text box. Click
                                again or double click to start editing the text.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Image
                    src="/assets/home/goal.jpg"
                    alt="our goals picture"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-[30rem] w-full object-cover"
                />
            </div>
        </section>
    );
}
