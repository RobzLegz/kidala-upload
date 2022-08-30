import Head from 'next/head';
import CheckAuth from '../../src/hooks/CheckAuth';
import dynamic from 'next/dynamic';

const SingleFileContainer = dynamic(
    () => import('../../src/components/gallery/SingleFileContainer')
);
const LanguageSelector = dynamic(
    () => import('../../src/components/language/LanguageSelector')
);

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload | View file</title>
                <meta
                    content="/images/janisbataragsuzliso.png"
                    property="og:image"
                />
                <meta
                    name="description"
                    content="View your uploaded file at kidala.life"
                />
            </Head>

            <SingleFileContainer />

            <CheckAuth />

            <LanguageSelector />
        </div>
    );
}
