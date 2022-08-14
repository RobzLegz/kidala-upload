import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { BASE_URL } from '../../requests/routes';
import GalleryImages from './GalleryImages';

function SingleFileContainer() {
    const router = useRouter();

    const { hash } = router.query;

    return (
        <div className="w-full min-h-screen pt-10 px-2">
            <Link href="/">
                <p className="link">Upload more</p>
            </Link>

            <section className="w-full flex items-center justify-center mt-2">
                <img
                    src={`${BASE_URL}/${hash}`}
                    alt={String(hash)}
                    className="relative object-cover max-h-[600px]"
                    draggable={false}
                />
            </section>

            <GalleryImages />
        </div>
    );
}

export default SingleFileContainer;
