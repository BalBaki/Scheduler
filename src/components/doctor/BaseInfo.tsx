import type { User } from '@prisma/client';

type BaseInfoProps = {
    data: Pick<User, 'name' | 'surname'>;
};

export default function BaseInfo({ data: { name, surname } }: BaseInfoProps) {
    return (
        <div className="flex max-w-4xl flex-col gap-y-1 max-md:mt-2 max-md:items-center">
            <h2
                className="text-xl font-semibold break-all text-[#237a83] capitalize"
                id="doctor-info"
            >{`${name} ${surname}`}</h2>
            <p className="text-base font-medium text-[#237a83]">Psychiatrist</p>
        </div>
    );
}
