import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function HomeIcon() {
    return (
        <Link href="/">
            <div className="fixed bottom-2 left-2 z-[9999] rounded-full border-2 border-black p-1">
                <FaHome className="size-8" />
            </div>
        </Link>
    );
}
