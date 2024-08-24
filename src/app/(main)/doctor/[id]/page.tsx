import Image from 'next/image';
import { IoPersonCircle } from 'react-icons/io5';
import AppointmentCalendar from '@/components/appointment/calendar';
import NextAvailability from '@/components/doctor/next-availability';
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
                orderBy: {
                    start: 'asc',
                },
            },
        },
    });
    const nextAvailableAppointment = doctor?.doctorAppointments.find(
        (appointment) => !appointment.patientId,
    );

    if (!doctor || doctor.role !== 'DOCTOR')
        return (
            <div className="flex h-screen items-center justify-center text-4xl text-red-500">
                This User is not Doctor..!
            </div>
        );

    return (
        <div>
            <div className="h-52 bg-doctorBanner bg-[10%_8%] object-cover"></div>
            <div className="space-y-8 bg-[#f9f9f9] px-3 py-8 pt-3 sm:px-8">
                <section
                    aria-describedby="doctor"
                    className="flex gap-x-2 px-2 max-md:flex-col max-md:justify-center"
                >
                    <div className="-mt-20 min-w-52 max-md:mx-auto">
                        {doctor.imageUrl ? (
                            <Image
                                src={doctor.imageUrl}
                                alt={`${doctor.name} ${doctor.surname}'s profile photo`}
                                width="0"
                                height="0"
                                sizes="100vw"
                                className="size-52 rounded-full bg-[#f9f9f9] object-cover p-5"
                                priority={true}
                            />
                        ) : (
                            <IoPersonCircle className="size-48 -translate-y-5 rounded-full bg-[#f9f9f9]" />
                        )}
                    </div>
                    <div className="flex max-w-4xl flex-col gap-y-1 max-md:mt-2 max-md:items-center md:ml-6">
                        <h1
                            className="break-all text-xl font-semibold capitalize text-[#237a83]"
                            id="doctor"
                        >{`${doctor.name} ${doctor.surname}`}</h1>
                        <p className="text-base font-medium text-[#237a83]">
                            Psychiatrist
                        </p>
                        {nextAvailableAppointment && (
                            <NextAvailability
                                appointment={nextAvailableAppointment}
                            />
                        )}
                        {doctor.languages.length > 0 && (
                            <div className="flex">
                                <h2 className="text-base font-medium text-[#237a83]">
                                    Languages
                                </h2>
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
                </section>
                {doctor.description && (
                    <section
                        className="rounded-sm bg-white p-8"
                        aria-labelledby="aboutMe"
                    >
                        <h2
                            id="aboutMe"
                            className="text-3xl font-bold text-[#4e788f]"
                        >
                            About me
                        </h2>
                        <p
                            className="ck-content mt-2 overflow-x-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300"
                            dangerouslySetInnerHTML={{
                                __html: doctor.description,
                            }}
                        ></p>
                    </section>
                )}
                <section
                    className="rounded-sm bg-white p-8"
                    aria-labelledby="availability"
                >
                    <h2
                        id="availability"
                        className="text-3xl font-bold text-[#4e788f]"
                    >
                        Availability
                    </h2>
                    <AppointmentCalendar user={doctor} />
                </section>
            </div>
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
