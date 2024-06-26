import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

export default function HomeIcon() {
    return (
        <Link href="/">
            <div className="fixed left-2 bottom-2 border-2 border-black p-1 rounded-full z-[9999]">
                <FaHome className="size-8" />
            </div>
        </Link>
    );
}
