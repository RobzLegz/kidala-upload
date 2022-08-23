import Head from 'next/head';
import FourOhFourContainer from '../src/components/fourohfour/FourOhFourContainer';

export default function FourOhFour() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload</title>
                <meta name="description" content="Keep calm and be kidala 👑" />
                <meta name="twitter:title" content="Kidala upload" />
                <meta name="twitter:site" content="www.kidala.life" />
                <meta
                    content="/images/janisbataragsuzliso.png"
                    property="og:image"
                />
                <meta
                    name="twitter:description"
                    content="Keep calm and be kidala 👑"
                />
                <meta
                    name="twitter:image"
                    content="/images/janisbataragsuzliso.png"
                />
            </Head>

            <FourOhFourContainer />
        </div>
    );
}
