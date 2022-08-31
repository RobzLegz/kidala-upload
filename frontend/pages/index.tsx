import Head from 'next/head';
import CheckAuth from '../src/hooks/CheckAuth';
import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('../src/components/home/HomePage'));
const LanguageSelector = dynamic(
    () => import('../src/components/language/LanguageSelector')
);

export default function Home() {
    return (
        <main className="page">
            <Head>
                <title>Kidala upload</title>
                <meta
                    name="description"
                    content="Kidala file upload. Free file hosting services, unlimited uploads"
                />
                <meta name="twitter:title" content="Kidala upload" />
                <meta name="twitter:site" content="www.kidala.life" />
                <meta
                    name="twitter:description"
                    content="Kidala file upload. Free file hosting services, unlimited uploads"
                />
                <meta
                    content="/images/janisbataragsuzliso.png"
                    property="og:image"
                />
                <meta
                    name="twitter:image"
                    content="/images/janisbataragsuzliso.png"
                />
            </Head>

            <HomePage />

            <CheckAuth />

            <LanguageSelector />
        </main>
    );
}
