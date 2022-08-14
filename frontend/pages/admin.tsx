import Head from 'next/head';
import AdminContainer from '../src/components/admin/AdminContainer';
import Footer from '../src/components/navigation/Footer';

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>kidala upload</title>
                <meta
                    name="description"
                    content="kidala file hosting services"
                />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3564006936877547"
                    crossOrigin="anonymous"
                ></script>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <AdminContainer />
        </div>
    );
}
