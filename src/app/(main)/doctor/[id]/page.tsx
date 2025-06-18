import { notFound } from 'next/navigation';
import AvailabilityCalendar from '@/components/doctor/AvailabilityCalendar';
import BaseInfo from '@/components/doctor/BaseInfo';
import Description from '@/components/doctor/Description';
import Languages from '@/components/doctor/Languages';
import NextAvailability from '@/components/doctor/NextAvailability';
import ProfilePicture from '@/components/doctor/ProfilePicture';
import UserProfileBanner from '@/components/UserProfileBanner';
import { METADATA_TITLE_SITE_NAME } from '@/constants';
import { Status } from '@/enums';
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

    const result = await UserService.getDoctorById(params.id);

    if (result.status === Status.Err) return <div>Something went wrong..!</div>;
    if (!result.data || result.data.role !== 'DOCTOR') return notFound();

    return (
        <div>
            <UserProfileBanner url={result.data.bannerUrl} />
            <div className="space-y-8 bg-[#f9f9f9] px-3 py-8 pt-3 sm:px-8">
                <section
                    aria-describedby="doctor-info"
                    className="flex gap-x-2 px-2 max-md:flex-col max-md:justify-center"
                >
                    <ProfilePicture
                        data={{
                            imageUrl: result.data.imageUrl,
                            name: result.data.name,
                            surname: result.data.surname,
                        }}
                    />
                    <div className="space-y-1 md:ml-6">
                        <BaseInfo
                            data={{
                                name: result.data.name,
                                surname: result.data.surname,
                            }}
                        />
                        <NextAvailability userId={result.data.id} />
                        <Languages data={result.data.languages} />
                    </div>
                </section>
                <Description data={result.data.description} />
                <AvailabilityCalendar userId={result.data.id} />
            </div>
        </div>
    );
}

export async function generateStaticParams() {
    const result = await UserService.getApprovedDoctors();

    if (result.status === Status.Err) throw new Error(result.err);

    return result.data.map((doctor) => ({
        id: doctor.id,
    }));
}
