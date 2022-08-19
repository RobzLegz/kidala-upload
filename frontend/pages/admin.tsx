import Head from 'next/head';
import AdminContainer from '../src/components/admin/AdminContainer';
import CheckAuth from '../src/components/hooks/CheckAuth';
import Footer from '../src/components/navigation/Footer';

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>Kidala upload | Admin</title>
                <meta name="description" content="Kidala admin panel" />
            </Head>

            <AdminContainer />

            <Footer />

            <CheckAuth />
        </div>
    );
}
