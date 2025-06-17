import languages from '@/languages.json';
import type { User } from '@prisma/client';

type LanguagesProps = {
    data: User['languages'];
};

export default function Languages({ data }: LanguagesProps) {
    if (languages.length < 1) return null;

    return (
        <div className="flex">
            <h2 className="text-base font-medium text-[#237a83]">Languages</h2>
            <span className="mr-1 text-[#237a83]">:</span>
            <p>
                {data
                    .map(
                        (language) =>
                            languages.find((lang) => lang.code === language)
                                ?.name,
                    )
                    .filter((language) => Boolean(language))
                    .join(', ')}
            </p>
        </div>
    );
}
