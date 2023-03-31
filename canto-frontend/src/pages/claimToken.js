import { ContextAPI } from "../../context/ContextProvider";
import { useContext } from "react";
import { utils } from "ethers";
import Balance from "../../components/Balance";
import styles from "@/styles/ClaimToken.module.css";

export default function ClaimToken() {
  const {
    managementContractInstance,
    insuranceContractInstance,
    getProviderOrSigner,
    address,
  } = useContext(ContextAPI);

  const takeClient = async () => {
    const provider = await getProviderOrSigner();
    const contract = await insuranceContractInstance(provider);
    const client = await contract.getClient(address);
    return client.amount;
  };

  const payTheInsurance = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await managementContractInstance(signer);
      const amount = await takeClient();
      const payment = await contract.claimToken({
        value: utils.parseEther(amount.toString()),
      });
      await payment.wait();
    } catch (error) {
      alert("Claimed Wrong");
    }
  };

  return (
    <>
      <Balance />
      <div className={styles.container}>
        <h3>Claim Your Tokens</h3>
        <button onClick={payTheInsurance}>Get Your Tokens</button>
      </div>
    </>
  );
}
