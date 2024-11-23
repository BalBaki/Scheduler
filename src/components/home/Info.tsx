import Image from 'next/image';
import { HiOutlinePlus } from 'react-icons/hi';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface Info {
    triggerText: string;
    description: string | React.ReactNode;
}

const infoData: Info[] = [
    {
        triggerText: 'Sample text. Click to select the text box.',
        description:
            'Sample text. Click to select the text box.Sample text. Click to select the text box.Sample text. Click to select the text box.',
    },
    {
        triggerText: 'Sample text. Click to select the text box.',
        description:
            'Sample text. Click to select the text box.Sample text. Click to select the text box.Sample text. Click to select the text box.',
    },
    {
        triggerText: 'Sample text. Click to select the text box.',
        description:
            'Sample text. Click to select the text box.Sample text. Click to select the text box.Sample text. Click to select the text box.',
    },
    {
        triggerText: 'Sample text. Click to select the text box.',
        description:
            'Sample text. Click to select the text box.Sample text. Click to select the text box.Sample text. Click to select the text box.',
    },
];

export default function Info() {
    return (
        <section
            aria-label="info about therapy"
            className="mx-6 mt-24 grid max-w-screen-lg md:grid-cols-2 md:gap-x-5 lg:mx-auto"
        >
            <Image
                src="/assets/home/info.jpg"
                alt="therapist takes notes"
                width={0}
                height={0}
                sizes="100vw"
                className="h-[25rem] w-full object-cover md:h-[35rem]"
            />
            <div>
                <Accordion
                    type="single"
                    collapsible
                    className="mt-6 w-full space-y-6 text-left"
                >
                    {infoData.map((info, index) => (
                        <AccordionItem
                            key={index}
                            value={`item-${index + 1}`}
                            className="border-none"
                        >
                            <AccordionTrigger className="text-left font-bold text-[#cf471f] [&>.lucide-chevron-down]:hidden">
                                {info.triggerText}
                                <HiOutlinePlus
                                    className="h-10 w-full max-w-10 rounded-full bg-[#cf471f] p-1 transition-transform duration-200"
                                    color="white"
                                />
                            </AccordionTrigger>
                            <AccordionContent>
                                {info.description}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
