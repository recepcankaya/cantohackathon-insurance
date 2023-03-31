import styles from "@/styles/BaseFeeForm.module.css";
import { useContext, useState } from "react";
import { ContextAPI } from "../context/ContextProvider";
import Form from "./Form";

export default function FormContainer() {
  const [baseFeeAmount, setBaseFeeAmount] = useState(0);

  const { insuranceContractInstance, getProviderOrSigner } =
    useContext(ContextAPI);

  const handleFormSubmit = async (amount) => {
    try {
      const provider = await getProviderOrSigner();
      const contract = await insuranceContractInstance(provider);
      const getInfo = await contract.baseFee(amount);
      setBaseFeeAmount(Number(getInfo) / 1e18);
    } catch (e) {
      console.error(e);
    }
  };

  const title = () => "Learn the Base Fee";

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.triangle}></div>
        <h3 className={styles.firstTitle}>
          To learn the first-time base fee for insurance, fill the form!
          <br /> And do not forget the enter the amount!
        </h3>
      </div>
      <Form
        title={title}
        cost={baseFeeAmount}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
}
