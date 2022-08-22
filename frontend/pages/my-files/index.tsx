import Head from 'next/head';
import GalleryContainer from '../../src/components/gallery/GalleryContainer';
import CheckAuth from '../../src/hooks/CheckAuth';

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
        </div>
    );
}
