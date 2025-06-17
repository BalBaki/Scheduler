import type { User } from '@prisma/client';

type DescriptionProps = {
    data: User['description'];
};

export default function Description({ data }: DescriptionProps) {
    if (!data) return null;

    return (
        <section
            className="ql-snow rounded-sm bg-white p-8"
            aria-labelledby="aboutMe"
        >
            <h2 id="aboutMe" className="text-3xl font-bold text-[#4e788f]">
                About me
            </h2>
            <div
                className="ql-editor scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 mt-2 overflow-x-auto p-0!"
                dangerouslySetInnerHTML={{
                    __html: data,
                }}
            ></div>
        </section>
    );
}
