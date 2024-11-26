export default function Hero() {
    return (
        <section
            className='relative h-[30rem] bg-[url("/assets/home/hero.jpeg")] bg-cover bg-[0%_50%] md:h-[45rem]'
            aria-describedby="hero"
        >
            <div className="absolute inset-0 bg-emerald-200/20"></div>
            <div className="absolute top-[60%] -translate-y-1/2 text-white max-md:inset-x-6 md:left-24">
                <h1
                    className="max-w-screen-lg text-3xl font-bold sm:text-4xl md:text-6xl"
                    id="hero"
                >
                    For Mental Well-Being
                </h1>
                <p className="text-md mt-2 max-w-screen-sm font-bold md:text-3xl">
                    With the scheduler online psychotherapy platform, consult a
                    licensed mental health therapist at any time.
                </p>
            </div>
        </section>
    );
}