import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import type { UserWithoutPassword } from '@/types';

type UserDetailPopoverProps = {
    triggerText: string;
    user?: UserWithoutPassword;
};

export default function UserDetailPopover({ triggerText, user }: UserDetailPopoverProps) {
    if (!user) return null;

    return (
        <Popover>
            <PopoverTrigger className="text-left w-fit">{triggerText}</PopoverTrigger>
            <PopoverContent className="flex flex-col gap-y-1 w-[22rem]">
                <div className="grid grid-cols-[2fr,5fr] place-content-center">
                    <div>Email</div>
                    <div className="border-2 px-2 py-0.5 rounded-md">{user.email}</div>
                </div>
                <div className="grid grid-cols-[2fr,5fr]">
                    <div>Full Name</div>
                    <div className="border-2 px-2 py-0.5 rounded-md">{`${user.name} ${user.surname}`}</div>
                </div>
                <div className="grid grid-cols-[2fr,5fr]">
                    <div>Phone</div>
                    <div className="border-2 px-2 py-0.5 rounded-md">{user.phoneNumber}</div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
