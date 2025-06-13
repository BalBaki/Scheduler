import Image from 'next/image';
import Link from 'next/link';
import { IoPersonCircle } from 'react-icons/io5';
import languages from '@/languages.json';
import { METADATA_TITLE_SITE_NAME } from '@/lib/constants';
import { UserService } from '@/services/user.service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Doctors - ${METADATA_TITLE_SITE_NAME}`,
    description:
        'Browse our list of registered doctors. Find the right specialist and book your appointment online.',
};

export default async function Doctor() {
    const doctors = await UserService.getApprovedDoctors();

    const renderedDoctors = doctors.map((doctor) => {
        return (
            <div key={doctor.id} role="listitem" className="space-y-16">
                <div className="mx-[4.5%] flex gap-x-2 px-2 max-md:flex-col max-md:justify-center">
                    <div className="min-w-60 max-md:mx-auto">
                        {doctor.imageUrl ? (
                            <Image
                                src={doctor.imageUrl}
                                alt={`${doctor.name} ${doctor.surname}'s profile photo`}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="w-60 rounded-md object-contain"
                                priority={true}
                            />
                        ) : (
                            <IoPersonCircle className="size-full -translate-y-5" />
                        )}
                    </div>
                    <div className="flex flex-col gap-y-3 max-md:mt-2 md:ml-14">
                        <h2 className="font-semibold break-all capitalize">{`${doctor.name} ${doctor.surname}`}</h2>
                        {doctor.description && (
                            <div className="ql-snow">
                                <h3 className="sr-only">Description</h3>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: doctor.description,
                                    }}
                                    className="ql-editor line-clamp-3 overflow-y-hidden! p-0!"
                                ></div>
                            </div>
                        )}
                        {doctor.languages.length > 0 && (
                            <div className="flex">
                                <h3 className="text-[#237a83]">Languages</h3>
                                <span className="mr-1 text-[#237a83]">:</span>
                                <p>
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
                                </p>
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
            <h1 id="doctorList" className="sr-only text-4xl">
                Doctor List
            </h1>
            <div className="mt-20 flex flex-col gap-y-24 text-2xl" role="list">
                {renderedDoctors}
            </div>
        </section>
    );
}
