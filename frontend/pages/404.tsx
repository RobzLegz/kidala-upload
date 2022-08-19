import Head from 'next/head';
import FourOhFourContainer from '../src/components/fourohfour/FourOhFourContainer';

export default function FourOhFour() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload</title>
                <meta name="description" content="Keep calm and be kidala 👑" />
            </Head>

            <FourOhFourContainer />
        </div>
    );
}
