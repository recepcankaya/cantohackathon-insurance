import { ContextProvider } from "../../context/ContextProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
}
