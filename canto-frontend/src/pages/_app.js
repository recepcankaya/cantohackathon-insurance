import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { ContextProvider } from "../../context/ContextProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </ContextProvider>
  );
}
