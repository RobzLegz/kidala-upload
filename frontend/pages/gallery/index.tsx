import Head from 'next/head';
import GalleryContainer from '../../src/components/gallery/GalleryContainer';
import CheckAuth from '../../src/components/hooks/CheckAuth';

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload | Files</title>
                <meta
                    name="description"
                    content="Kidala life. Max kidala. Safe pacans 🔥 stafaars. Max safe pacani utt. Only at kidala.life"
                />
            </Head>

            <GalleryContainer />
            
            <CheckAuth />
        </div>
    );
}
