import Image from 'next/image';
import Link from 'next/link';
import { IoPersonCircle } from 'react-icons/io5';
import db from '@/db';

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
                    <div className="grid-r grid grid-cols-[1fr_4fr] items-center gap-x-2 border-2 border-black px-2 py-1">
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
                                <IoPersonCircle className="h-full w-full" />
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

    return (
        <div className="mt-2 grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-2">
            {renderedDoctors}
        </div>
    );
}
