import type { AppProps } from "next/app";
import "../assets/main.css";
import "../assets/chrome-bug.css";
import { reduxStore, persistedStore } from "@/config/reduxStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={reduxStore}>
      <PersistGate loading={null} persistor={persistedStore}>
        <Component {...pageProps} />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}
