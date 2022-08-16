import Head from 'next/head';
import SingleFileContainer from '../../src/components/gallery/SingleFileContainer';

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload | Share file</title>
                <meta
                    content="/images/janisbataragsuzliso.png"
                    property="og:image"
                />
                <meta
                    name="description"
                    content="Kidala life. Max kidala. Safe pacans. 🔥 stafaars. Max safe pacani utt. Only at kidala-upload.vercel.app. Kidala hosting services. 🌐🤙🏿🅿😱 KEEP CALM AND BE KIDALA"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SingleFileContainer />
        </div>
    );
}
