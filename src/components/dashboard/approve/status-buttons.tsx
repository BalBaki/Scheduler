// import { FcApproval, FcCancel } from 'react-icons/fc';
// import { ImSpinner6 } from 'react-icons/im';
// import { updateUserStatus } from '@/actions/update-user-status';
// import type { UserWithoutPassword } from '@/types';
// import SubmitButton from '@/components/submit-button';

// type ApproveButtonsProps = {
//     user: UserWithoutPassword;
// };

// export default function ApproveButtons({ user }: ApproveButtonsProps) {
//     return (
//         <>
//             <form action={updateUserStatus.bind(null, { id: user.id, status: 'APPROVED' })}>
//                 <SubmitButton className="size-6" pendingText={<ImSpinner6 className="w-full h-full animate-spin" />}>
//                     <FcApproval className="w-full h-full" />
//                 </SubmitButton>
//             </form>
//             {user.status !== 'DECLINED' && (
//                 <form action={updateUserStatus.bind(null, { id: user.id, status: 'DECLINED' })}>
//                     <SubmitButton
//                         className="size-6"
//                         pendingText={<ImSpinner6 className="w-full h-full animate-spin" />}
//                     >
//                         <FcCancel className="w-full h-full" />
//                     </SubmitButton>
//                 </form>
//             )}
//         </>
//     );
// }

'use client';

import { FcApproval, FcCancel } from 'react-icons/fc';
import { ImSpinner6 } from 'react-icons/im';
import { updateUserStatus } from '@/actions/update-user-status';
import type { UserWithoutPassword } from '@/types';
import { useTransition } from 'react';

type StatusButtonsProps = {
    user: UserWithoutPassword;
};

export default function StatusButtons({ user }: StatusButtonsProps) {
    const [isPending, startTransition] = useTransition();

    return (
        <>
            <button
                className="size-6"
                onClick={() =>
                    startTransition(() => {
                        updateUserStatus({ id: user.id, status: 'APPROVED' });
                    })
                }
                disabled={isPending}
                aria-label="Approve user"
            >
                {isPending ? <ImSpinner6 className="size-full animate-spin" /> : <FcApproval className="size-full" />}
            </button>
            {user.status !== 'DECLINED' && (
                <button
                    className="size-6"
                    onClick={() =>
                        startTransition(() => {
                            updateUserStatus({ id: user.id, status: 'DECLINED' });
                        })
                    }
                    disabled={isPending}
                    aria-label="Decline user"
                >
                    {isPending ? (
                        <ImSpinner6 className="size-full animate-spin" />
                    ) : (
                        <FcCancel className="size-full" />
                    )}
                </button>
            )}
        </>
    );
}
