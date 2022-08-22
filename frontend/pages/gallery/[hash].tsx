import Head from 'next/head';
import SingleFileContainer from '../../src/components/gallery/SingleFileContainer';
import CheckAuth from '../../src/hooks/CheckAuth';

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload | File</title>
                <meta
                    content="/images/janisbataragsuzliso.png"
                    property="og:image"
                />
                <meta
                    name="description"
                    content="View uploaded file 🔥 stafaars, max safe pacani only at kidala.life"
                />
            </Head>

            <SingleFileContainer />

            <CheckAuth />
        </div>
    );
}
