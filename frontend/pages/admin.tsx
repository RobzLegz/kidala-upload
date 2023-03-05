import Head from 'next/head';
import AdminContainer from '../src/ui/admin/AdminContainer';
import CheckAuth from '../src/hooks/CheckAuth';

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload | Admin</title>
                <meta name="description" content="Kidala admin panel" />
                <meta name="twitter:title" content="Kidala upload | Admin" />
                <meta name="twitter:site" content="www.kidala.life" />
                <meta
                    name="twitter:description"
                    content="Kidala admin panel"
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

            <AdminContainer />

            <CheckAuth />
        </div>
    );
}
