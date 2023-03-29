import { useContext } from "react";
import { ContextAPI } from "../context/ContextProvider";
import styles from "@/styles/NavBar.module.css";

export default function NavBar() {
  const { connectWallet, walletConnected, address } = useContext(ContextAPI);

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>Insurance</h1>
      <button className={styles.clientWallet} onClick={connectWallet}>
        {walletConnected ? "Wallet Connected" : "Connect Wallet"}: {""}
        {address.slice(0, 5)}...{address.slice(-4)}
      </button>
    </nav>
  );
}
