import Image from 'next/image';
import { IoPersonCircle } from 'react-icons/io5';
import AppointmentCalendar from '@/components/appointment/calendar';
import VisuallyHidden from '@/components/visually-hidden';
import db from '@/db';
import languages from '@/languages.json';
import { prismaExclude } from '@/lib/prisma-exclude';

type DoctorPageProps = {
    params: { id: string };
};

export default async function DoctorPage({ params: { id } }: DoctorPageProps) {
    const doctor = await db.user.findFirst({
        where: {
            id,
        },
        select: {
            ...prismaExclude('User', ['password']),
            doctorAppointments: {
                where: {
                    start: { gte: new Date() },
                },
            },
        },
    });

    if (!doctor || doctor.role !== 'DOCTOR')
        return (
            <div className="flex h-screen items-center justify-center text-4xl text-red-500">
                This User is not Doctor..!
            </div>
        );

    return (
        <div aria-describedby="doctor">
            <section>
                <div className="mt-3 flex gap-x-2 px-2 max-md:flex-col max-md:justify-center">
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
                    <div className="flex max-w-4xl flex-col gap-y-3 max-md:mt-2 md:ml-10">
                        <h1
                            className="break-all font-semibold capitalize"
                            id="doctor"
                        >{`${doctor.name} ${doctor.surname}`}</h1>
                        <div>
                            <VisuallyHidden>
                                <h2>Description</h2>
                            </VisuallyHidden>
                            <p>{doctor.description}</p>
                        </div>
                        {doctor.languages.length > 0 && (
                            <div className="flex">
                                <h2 className="text-[#237a83]">Languages</h2>
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
                    </div>
                </div>
                <div className="mx-auto my-5 h-px w-1/2 max-w-96 bg-[#237a83]"></div>
            </section>
            <section>
                <AppointmentCalendar user={doctor} />
            </section>
        </div>
    );
}

export async function generateStaticParams() {
    const doctors = await db.user.findMany({
        where: {
            role: 'DOCTOR',
        },
        select: prismaExclude('User', ['password']),
    });

    return doctors.map((doctor) => {
        return {
            id: doctor.id,
        };
    });
}
