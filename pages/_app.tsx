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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ModalProvider>
        <CallProvider>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
            <ToastContainer />
          </Provider>
        </CallProvider>
      </ModalProvider>
    </UserProvider>
  );
}
