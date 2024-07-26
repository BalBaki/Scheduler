import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa6';
import { Button } from '@/components/ui/button';

export default function Home() {
    return (
        <div className="mt-2">
            <Link href="/doctor">
                <Button variant="default">
                    Doctor List
                    <span className="ml-2 animate-pulse">
                        <FaArrowRight className="size-4" />
                    </span>
                </Button>
            </Link>
        </div>
    );
}
