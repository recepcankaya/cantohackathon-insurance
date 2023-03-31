import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ContextAPI } from "../context/ContextProvider";
import {
  MANAGEMENT_CONTRACT_ADDRESS,
  INSURANCE_CONTRACT_ADDRESS,
} from "../constants";
import styles from "@/styles/NavBar.module.css";
import { utils } from "ethers";

export default function NavBar() {
  const {
    connectWallet,
    walletConnected,
    address,
    insuranceContractInstance,
    getProviderOrSigner,
  } = useContext(ContextAPI);
  const router = useRouter();

  const insuranceBalance = async () => {
    const provider = await getProviderOrSigner();
    const balance = provider.getBalance(INSURANCE_CONTRACT_ADDRESS);
    return balance;
  };

  const sendTokensToContract = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await insuranceContractInstance(signer);
      const balance = await insuranceBalance();
      const str = (Number(balance) / 1e18).toString();
      const send = await contract.withdrawTokensToContract(
        MANAGEMENT_CONTRACT_ADDRESS,
        {
          value: utils.parseEther(str),
        }
      );
    } catch (e) {
      alert("You don't have right to transfer the contract's tokens");
    }
  };

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
      <button onClick={sendTokensToContract} className={styles.send}>
        Send To Contract
      </button>
      <button className={styles.clientWallet} onClick={connectWallet}>
        {walletConnected ? "Wallet Connected" : "Connect Wallet"}: {""}
        {address.slice(0, 5)}...{address.slice(-4)}
      </button>
    </nav>
  );
}
