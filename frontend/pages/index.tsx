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
            </Head>

            <HomePage />

            <CheckAuth />
        </div>
    );
}
