import type { AppProps } from "next/app";
import "../assets/main.css";
import "../assets/chrome-bug.css";
import { reduxStore } from "@/config/reduxStore";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserProvider from "@/contexts/UserContext";
import CallProvider from "@/contexts/CallContext";
import ModalProvider from "@/contexts/ModalContext";
import EnlaredImageProvider from "@/contexts/EnlargeImageContext";
import "react-loading-skeleton/dist/skeleton.css";

("use client");

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={reduxStore}>
        <EnlaredImageProvider>
          <ModalProvider>
            <CallProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </CallProvider>
          </ModalProvider>
        </EnlaredImageProvider>
      </Provider>
    </UserProvider>
  );
}
