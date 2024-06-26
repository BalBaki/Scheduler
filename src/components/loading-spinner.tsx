import { ImSpinner } from 'react-icons/im';

export default function LoadingSpinner() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ImSpinner className="size-44 animate-spin" />
        </div>
    );
}
