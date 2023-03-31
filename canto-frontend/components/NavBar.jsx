import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ContextAPI } from "../context/ContextProvider";
import styles from "@/styles/NavBar.module.css";

export default function NavBar() {
  const { connectWallet, walletConnected, address } = useContext(ContextAPI);
  const router = useRouter();

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <h1 className={styles.title}>Insurance</h1>
      </Link>
      <div className={styles.links}>
        <Link
          href="/insurance"
          className={
            router.pathname === "/insurance" ? styles.active : styles.link
          }>
          Get The Insurance
        </Link>
        <Link
          href="/baseFee"
          className={
            router.pathname === "/baseFee" ? styles.active : styles.link
          }>
          Pay The Base Fee
        </Link>
      </div>
      <button className={styles.clientWallet} onClick={connectWallet}>
        {walletConnected ? "Wallet Connected" : "Connect Wallet"}: {""}
        {address.slice(0, 5)}...{address.slice(-4)}
      </button>
    </nav>
  );
}
