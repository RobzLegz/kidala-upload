import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BASE_URL } from '../../requests/routes';
import GalleryImages from './GalleryImages';

function SingleFileContainer() {
    const router = useRouter();

    const { hash } = router.query;

    return (
        <div className="w-full bg-orange-500 min-h-screen pt-10">
            <Link href="/">
                <p className="text-blue-300 hover:underline focus:underline">
                    Upload more
                </p>
            </Link>

            <section className="w-full p-4">
                <img src={`${BASE_URL}/${hash}`} alt={String(hash)} className="w-full h-full object-cover" />
            </section>

            <GalleryImages />
        </div>
    );
}

export default SingleFileContainer;
