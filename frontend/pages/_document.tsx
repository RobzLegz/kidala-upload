import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <script 
                    async 
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3564006936877547"
                    crossorigin="anonymous"
                ></script>
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
