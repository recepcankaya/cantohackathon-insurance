import { useState, useEffect, useContext } from "react";
import { ContextAPI } from "../context/ContextProvider";
import styles from "@/styles/Balance.module.css";

export default function Balance() {
  const [contractBalance, setContractBalance] = useState(0);
  const { managementContractInstance, getProviderOrSigner } =
    useContext(ContextAPI);

  const getContractBalance = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = await managementContractInstance(provider);
      const balance = await contract.getBalance();
      const turnNumber = Number(balance) / 1e18;
      setContractBalance(turnNumber);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getContractBalance();
  });

  return (
    <div className={styles.contractBalance}>
      {contractBalance === null
        ? "Loading..."
        : `Contract Balance: ${contractBalance} Canto Token`}
    </div>
  );
}
