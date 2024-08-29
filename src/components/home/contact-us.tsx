import ContactUsForm from './contact-us-form';

export default function ContactUs() {
    return (
        <section
            id="contactUs"
            aria-describedby="contactUsDescription"
            className="bg-gray-200"
        >
            <div className="mx-6 mt-24 grid max-w-screen-lg py-12 max-md:gap-y-5 md:grid-cols-2 md:gap-x-5 lg:mx-auto">
                <div className="flex flex-col gap-y-5 md:mt-10">
                    <h3 className="text-2xl">Help Us 24/7</h3>
                    <h3 className="text-5xl font-bold">
                        What Can We Offer for Your Business
                    </h3>
                    <p className="text-lg">
                        Sample text. Click to select the text box. Click again
                        or double click to start editing the text.
                    </p>
                    <div className="mt-4 text-xl font-bold text-[#cf471f]">
                        <div>65 Street, Network City, NYPD</div>
                        <div>Which don’t Look Even Slightly Believable</div>
                        <div>+1 222 545 55 44</div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-5">
                    <h2 id="contactUsDescription" className="text-2xl">
                        Contact Us
                    </h2>
                    <h3 className="text-4xl font-bold">Request A Quote</h3>
                    <div className="mt-8">
                        <ContactUsForm />
                    </div>
                </div>
            </div>
        </section>
    );
}
