import Head from 'next/head';
import AdminContainer from '../src/components/admin/AdminContainer';
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
        </div>
    );
}
