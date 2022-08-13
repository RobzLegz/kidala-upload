import Head from 'next/head';
import { useRouter } from 'next/router';
import SingleFileContainer from '../../src/components/gallery/SingleFileContainer';

export default function Home() {
    const router = useRouter();

    const { hash } = router.query;

    return (
        <div className="page">
            <Head>
                <title>Kidala upload | {hash}</title>
                <meta
                    name="description"
                    content="Kidala life. Max kidala. Safe pacans 🔥 stafaars. Max safe pacani utt. Only at kidala-upload.vercel.app. Kidala hosting services. 🌐🤙🏿🅿😱"
                />
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3564006936877547"
                    crossOrigin="anonymous"
                ></script>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <SingleFileContainer />
        </div>
    );
}
