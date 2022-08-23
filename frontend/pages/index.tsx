import Head from 'next/head';
import HomePage from '../src/components/home/HomePage';
import CheckAuth from '../src/hooks/CheckAuth';

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload</title>
                <meta
                    name="description"
                    content="kidala file hosting services"
                />
                <meta name="twitter:title" content="Kidala upload" />
                <meta name="twitter:site" content="www.kidala.life" />
                <meta
                    name="twitter:description"
                    content="kidala file hosting services"
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
        </div>
    );
}
