import Image from 'next/image';
import Link from 'next/link';
import { IoPersonCircle } from 'react-icons/io5';
import VisuallyHidden from '@/components/visually-hidden';
import db from '@/db';
import languages from '@/languages.json';

export default async function Doctor() {
    const doctors = await db.user.findMany({
        where: {
            AND: [{ role: 'DOCTOR', status: 'APPROVED' }],
        },
    });

    const renderedDoctors = doctors.map((doctor) => {
        return (
            <div key={doctor.id} role="listitem">
                <div className="mx-[4.5%] my-20 flex gap-x-2 px-2 max-md:flex-col max-md:justify-center">
                    <div className="min-w-60 max-md:mx-auto">
                        {doctor.imageUrl ? (
                            <Image
                                src={doctor.imageUrl}
                                alt={`${doctor.name} ${doctor.surname}'s profile photo`}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-60 rounded-md object-contain"
                            />
                        ) : (
                            <IoPersonCircle className="size-full -translate-y-5" />
                        )}
                    </div>
                    <div className="flex flex-col gap-y-3 max-md:mt-2 md:ml-14">
                        <h2 className="break-all font-semibold capitalize">{`${doctor.name} ${doctor.surname}`}</h2>
                        <div>
                            <VisuallyHidden>
                                <h3>Description</h3>
                            </VisuallyHidden>
                            {doctor.description}
                        </div>
                        {doctor.languages.length > 0 && (
                            <div className="flex">
                                <h3 className="text-[#237a83]">Languages</h3>
                                <span className="mr-1 text-[#237a83]">:</span>
                                <div>
                                    {doctor.languages
                                        .map(
                                            (language) =>
                                                languages.find(
                                                    (lang) =>
                                                        lang.code === language,
                                                )?.name,
                                        )
                                        .filter((language) => Boolean(language))
                                        .join(', ')}
                                </div>
                            </div>
                        )}
                        <Link
                            href={`/doctor/${doctor.id}`}
                            className="mt-6 w-fit rounded-2xl border-[3px] border-[#237a83] p-2 font-medium text-[#237a83]"
                        >
                            Book an appointment
                        </Link>
                    </div>
                </div>
                <div className="mx-auto h-px w-1/2 max-w-96 bg-[#237a83]"></div>
            </div>
        );
    });

    return (
        <section aria-describedby="doctorList">
            <h1 id="doctorList" className="text-4xl">
                Doctor List
            </h1>
            <div className="mt-2 flex flex-col gap-y-2 text-2xl" role="list">
                {renderedDoctors}
            </div>
        </section>
    );
}
