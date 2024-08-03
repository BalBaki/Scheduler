import Image from 'next/image';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';

interface Issue {
    name: string;
    explanation: string;
    icon: string | StaticImport;
    iconAlt: string;
    backgroundColor?: string;
}

const issues: Issue[] = [
    {
        name: 'Relationship Issues',
        explanation:
            'Sample text. Click to select the text box. Click again or double click to start editing the text.',
        icon: '/assets/home/relationship-icon.png',
        iconAlt: 'relationship issues icon',
    },
    {
        name: 'Anxiety Disorders',
        explanation:
            'Sample text. Click to select the text box. Click again or double click to start editing the text.',
        icon: '/assets/home/anxiety-icon.png',
        iconAlt: 'anxiety issues icon',
        backgroundColor: 'bg-[#FD7412]',
    },
    {
        name: 'Psychologist Issues',
        explanation:
            'Sample text. Click to select the text box. Click again or double click to start editing the text.',
        icon: '/assets/home/psychologist-icon.png',
        iconAlt: 'psychologist issues icon',
    },
];

export default function Issues() {
    return (
        <section
            className="my-12 grid justify-center gap-5 text-center max-[400px]:mx-2 min-[400px]:grid-cols-[repeat(auto-fit,22rem)]"
            role="list"
            aria-label="issues"
        >
            {issues.map((issue) => {
                return (
                    <div
                        key={issue.name}
                        className={`flex flex-col items-center justify-center gap-y-5 px-2 py-10 ${
                            issue.backgroundColor || ''
                        }`}
                        role="listitem"
                    >
                        <Image
                            src={issue.icon}
                            alt={issue.iconAlt}
                            width={60}
                            height={60}
                        />
                        <h2 className="text-xl font-bold">{issue.name}</h2>
                        <p>{issue.explanation}</p>
                    </div>
                );
            })}
        </section>
    );
}
