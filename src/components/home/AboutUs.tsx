export default function AboutUs() {
    return (
        <section
            id="aboutUs"
            aria-describedby="aboutUsDescription"
            className="bg-gray-200 px-14 py-20"
        >
            <div className="mx-auto max-w-(--breakpoint-lg)">
                <h2
                    id="aboutUsDescription"
                    className="mx-auto mb-4 text-xl font-bold"
                >
                    ABOUT US
                </h2>
                <div className="grid justify-center gap-x-12 gap-y-5 md:grid-cols-2">
                    <div className="space-y-5">
                        <h3 className="text-4xl font-semibold">
                            Our Clinic Expert Psychologist from New York
                        </h3>
                        <p className="text-xl">
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do mod tempor incididunt ut labore et
                            dolore magna aliqua.
                        </p>
                    </div>
                    <div className="space-y-5">
                        <h3 className="text-2xl font-semibold">
                            Psychologist Issues
                        </h3>
                        <p>
                            Sample text. Click to select the text box. Click
                            again or double click to start editing the text.
                        </p>
                        <h3 className="text-2xl font-semibold">
                            Relationship Issues
                        </h3>
                        <p>
                            Sample text. Click to select the text box. Click
                            again or double click to start editing the text.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
