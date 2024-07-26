import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import type { UserWithoutPassword } from '@/types';

type UserDetailPopoverProps = {
    triggerText: string;
    user?: UserWithoutPassword;
};

export default function UserDetailPopover({
    triggerText,
    user,
}: UserDetailPopoverProps) {
    if (!user) return null;

    return (
        <Popover>
            <PopoverTrigger
                className="w-fit text-left"
                aria-label="Open user detail"
            >
                {triggerText}
            </PopoverTrigger>
            <PopoverContent className="flex w-[22rem] flex-col gap-y-1">
                <div className="grid grid-cols-[2fr,5fr] place-content-center">
                    <div>Email</div>
                    <div className="rounded-md border-2 px-2 py-0.5">
                        {user.email}
                    </div>
                </div>
                <div className="grid grid-cols-[2fr,5fr]">
                    <div>Full Name</div>
                    <div className="rounded-md border-2 px-2 py-0.5">{`${user.name} ${user.surname}`}</div>
                </div>
                <div className="grid grid-cols-[2fr,5fr]">
                    <div>Phone</div>
                    <div className="rounded-md border-2 px-2 py-0.5">
                        {user.phoneNumber}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
