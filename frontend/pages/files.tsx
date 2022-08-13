import Head from 'next/head';
import GalleryContainer from '../src/components/gallery/GalleryContainer';

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload | Files</title>
                <meta
                    name="description"
                    content="Kidala life. Max kidala. Safe pacans 🔥 stafaars. Max safe pacani utt. Only at kidala-upload.vercel.app. Kidala hosting services. 🌐🤙🏿🅿😱"
                />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3564006936877547"
                    crossOrigin="anonymous"
                ></script>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <GalleryContainer />
        </div>
    );
}
