import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../src/redux/app/store';
import '../src/styles/globals.css';
import Script from 'next/script';

function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Script
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3564006936877547"
                strategy="afterInteractive"
                crossOrigin="anonymous"
            />
            <Component {...pageProps} />
        </Provider>
    );
}

export default App;
