import db from '@/db';
import Image from 'next/image';
import Link from 'next/link';
import { IoPersonCircle } from 'react-icons/io5';

export default async function Doctor() {
    const doctors = await db.user.findMany({
        where: {
            AND: [{ role: 'DOCTOR', status: 'APPROVED' }],
        },
    });

    const renderedDoctors = doctors.map((doctor) => {
        return (
            <div key={doctor.id}>
                <Link href={`/doctor/${doctor.id}`}>
                    <div className="grid grid-cols-[1fr_4fr] border-2 border-black px-2 py-1 gap-x-2 items-center grid-r">
                        <div className="relative h-16">
                            {doctor.imageUrl ? (
                                <Image
                                    src={doctor.imageUrl}
                                    alt="profile photo"
                                    fill
                                    className="rounded-full object-cover"
                                    sizes="100%, 100%"
                                />
                            ) : (
                                <IoPersonCircle className="w-full h-full" />
                            )}
                        </div>
                        <div className="truncate">
                            <div className="truncate">{`${doctor.name} ${doctor.surname}`}</div>
                            <div className="truncate">{doctor.email}</div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    });

    return <div className="grid gap-2 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] mt-2">{renderedDoctors}</div>;
}
