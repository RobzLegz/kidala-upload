import Head from 'next/head';
import CheckAuth from '../../src/hooks/CheckAuth';
import dynamic from 'next/dynamic';

const GalleryContainer = dynamic(
    () => import('../../src/components/gallery/GalleryContainer')
);
const LanguageSelector = dynamic(
    () => import('../../src/components/language/LanguageSelector')
);

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload | My files</title>
                <meta
                    name="description"
                    content="My files on kidala file hosting service"
                />
            </Head>

            <GalleryContainer />

            <CheckAuth />

            <LanguageSelector />
        </div>
    );
}
