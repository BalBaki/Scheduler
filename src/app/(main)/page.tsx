import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaArrowRight } from 'react-icons/fa6';

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
