import Head from 'next/head';
import HomePage from '../src/components/home/HomePage';

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload</title>
                <meta
                    name="description"
                    content="Kidala file hosting services"
                />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3564006936877547"
                    crossOrigin="anonymous"
                ></script>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HomePage />
        </div>
    );
}
