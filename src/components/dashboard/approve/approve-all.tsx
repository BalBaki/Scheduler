import { approveAllUsers } from '@/actions/approve-all-users';
import SubmitButton from '@/components/submit-button';
import { ImSpinner6 } from 'react-icons/im';

export default function ApproveAll() {
    return (
        <form action={approveAllUsers}>
            <SubmitButton
                className="w-28 h-10 border-2 border-black rounded-md max-sm:w-full max-sm:mt-1"
                pendingText={<ImSpinner6 className="size-full animate-spin" />}
            >
                Approve All
            </SubmitButton>
        </form>
    );
}
