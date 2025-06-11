import TextWithCopyClipboard from './TextWithCopyClipboard';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import type { UserWithoutPassword } from '@/types';

type UserDetailProps = {
    triggerText: string;
    user?: UserWithoutPassword;
};

export default function UserDetail({ triggerText, user }: UserDetailProps) {
    if (!user) return null;

    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="user-detail" className="border-b-0">
                <AccordionTrigger className="cursor-pointer border-b py-1">
                    {triggerText}
                </AccordionTrigger>
                <AccordionContent className="mt-3 space-y-2">
                    <div className="grid grid-cols-[3.5rem_1fr] place-content-center items-center gap-2">
                        <h2 className="font-medium">Email</h2>
                        <TextWithCopyClipboard
                            className="rounded-md border-2 p-1.5"
                            text={user.email}
                        />
                    </div>
                    <div className="grid grid-cols-[3.5rem_1fr] place-content-center items-center gap-2">
                        <h2 className="font-medium">Name</h2>
                        <p
                            className="truncate rounded-md border-2 p-1.5"
                            title={user.name}
                        >
                            {user.name}
                        </p>
                    </div>
                    <div className="grid grid-cols-[3.5rem_1fr] place-content-center items-center gap-2">
                        <h2 className="font-medium">Surname</h2>
                        <p
                            className="truncate rounded-md border-2 p-1.5"
                            title={user.surname}
                        >
                            {user.surname}
                        </p>
                    </div>
                    <div className="grid grid-cols-[3.5rem_1fr] place-content-center items-center gap-2">
                        <h2 className="font-medium">Phone</h2>
                        <TextWithCopyClipboard
                            className="rounded-md border-2 p-1.5"
                            text={user.phoneNumber}
                        />
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}
