import Image from 'next/image';
import { notFound } from 'next/navigation';
import { IoPersonCircle } from 'react-icons/io5';
import AppointmentCalendar from '@/components/appointment/Calendar';
import NextAvailability from '@/components/doctor/NextAvailability';
import { Status } from '@/enums';
import languages from '@/languages.json';
import { METADATA_TITLE_SITE_NAME } from '@/lib/constants';
import { capitalizeFirstLetter } from '@/lib/utils';
import { UserService } from '@/services/user.service';
import type { Metadata } from 'next';

type DoctorPageProps = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata(
    props: DoctorPageProps,
): Promise<Metadata> {
    const params = await props.params;
    const result = await UserService.getDoctorWithValidAppointmentsById(
        params.id,
    );

    const doctorFullName =
        result.status === Status.Ok && result.data
            ? `${capitalizeFirstLetter(result.data.name)} ${capitalizeFirstLetter(result.data.surname)}`
            : 'Doctor';

    return {
        title: `${doctorFullName} - ${METADATA_TITLE_SITE_NAME}`,
        description: `View detailed information about ${doctorFullName}, including qualifications, availability, and patient reviews. Book an appointment today.`,
    };
}

export default async function DoctorPage(props: DoctorPageProps) {
    const params = await props.params;

    const result = await UserService.getDoctorWithValidAppointmentsById(
        params.id,
    );

    if (result.status === Status.Err) return <div>Something went wrong..!</div>;
    if (!result.data || result.data.role !== 'DOCTOR') return notFound();

    const nextAvailableAppointment = result.data.doctorAppointments.find(
        (appointment) => !appointment.patientId,
    );

    return (
        <div>
            <div className="bg-doctor-banner h-52 bg-position-[10%_8%] object-cover"></div>
            <div className="space-y-8 bg-[#f9f9f9] px-3 py-8 pt-3 sm:px-8">
                <section
                    aria-describedby="doctor"
                    className="flex gap-x-2 px-2 max-md:flex-col max-md:justify-center"
                >
                    <div className="-mt-20 min-w-52 max-md:mx-auto">
                        {result.data.imageUrl ? (
                            <Image
                                src={result.data.imageUrl}
                                alt={`${result.data.name} ${result.data.surname}'s profile photo`}
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
                            className="text-xl font-semibold break-all text-[#237a83] capitalize"
                            id="doctor"
                        >{`${result.data.name} ${result.data.surname}`}</h1>
                        <p className="text-base font-medium text-[#237a83]">
                            Psychiatrist
                        </p>
                        {nextAvailableAppointment && (
                            <NextAvailability
                                appointment={nextAvailableAppointment}
                            />
                        )}
                        {result.data.languages.length > 0 && (
                            <div className="flex">
                                <h2 className="text-base font-medium text-[#237a83]">
                                    Languages
                                </h2>
                                <span className="mr-1 text-[#237a83]">:</span>
                                <p>
                                    {result.data.languages
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
                {result.data.description && (
                    <section
                        className="ql-snow rounded-sm bg-white p-8"
                        aria-labelledby="aboutMe"
                    >
                        <h2
                            id="aboutMe"
                            className="text-3xl font-bold text-[#4e788f]"
                        >
                            About me
                        </h2>
                        <div
                            className="ql-editor scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 mt-2 overflow-x-auto p-0!"
                            dangerouslySetInnerHTML={{
                                __html: result.data.description,
                            }}
                        ></div>
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
                    <AppointmentCalendar user={result.data} />
                </section>
            </div>
        </div>
    );
}
