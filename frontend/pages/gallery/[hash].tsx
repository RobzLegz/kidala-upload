import Head from 'next/head';
import SingleFileContainer from '../../src/components/gallery/SingleFileContainer';

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload | Share file</title>
                <meta
                    name="description"
                    content="Kidala life. Max kidala. Safe pacans. 🔥 stafaars. Max safe pacani utt. Only at kidala-upload.vercel.app. Kidala hosting services. 🌐🤙🏿🅿😱 KEEP CALM AND BE KIDALA"
                />
                <meta
                    content="/images/janisbataragsuzliso.png"
                    property="og:image"
                />
                <link rel="/images/janisbataragsuzliso.png" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SingleFileContainer />
        </div>
    );
}
