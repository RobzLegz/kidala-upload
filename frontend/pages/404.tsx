import Head from 'next/head';
import FourOhFourContainer from '../src/components/fourohfour/FourOhFourContainer';

export default function FourOhFour() {
    return (
        <div className="page">
            <Head>
                <title>kidala upload</title>
                <meta
                    name="description"
                    content="Keep calm and be kidala 👑"
                />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3564006936877547"
                    crossOrigin="anonymous"
                ></script>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <FourOhFourContainer />
        </div>
    );
}
