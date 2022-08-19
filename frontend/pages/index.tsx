import Head from 'next/head';
import HomePage from '../src/components/home/HomePage';

export default function Home() {
    return (
        <div className="page">
            <Head>
                <title>kidala upload</title>
                <meta
                    name="description"
                    content="kidala file hosting services"
                />
            </Head>

            <HomePage />
        </div>
    );
}
