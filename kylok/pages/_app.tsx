import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/redux/app/store";
import "../src/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default App;
