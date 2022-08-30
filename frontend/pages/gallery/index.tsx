import Head from 'next/head';
import CheckAuth from '../../src/hooks/CheckAuth';
import dynamic from 'next/dynamic';

const GalleryContainer = dynamic(
    () => import('../../src/components/gallery/GalleryContainer')
);
const LanguageSelector = dynamic(
    () => import('../../src/components/language/LanguageSelector')
);

export default function Gallery() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload | Files</title>
                <meta
                    name="description"
                    content="Kidala life. Max kidala. Safe pacans 🔥 stafaars. Max safe pacani utt. Only at www.kidala.life"
                />
            </Head>

            <GalleryContainer />
            
            <CheckAuth />

            <LanguageSelector />
        </div>
    );
}
