import Head from 'next/head';
import GalleryContainer from '../../src/components/gallery/GalleryContainer';
import LanguageSelector from '../../src/components/language/LanguageSelector';
import CheckAuth from '../../src/hooks/CheckAuth';

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
