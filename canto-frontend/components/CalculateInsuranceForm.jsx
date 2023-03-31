import styles from "@/styles/CalculateInsuranceForm.module.css";
import { useContext, useState } from "react";
import { ContextAPI } from "../context/ContextProvider";
import Form from "./Form";

export default function FormContainer() {
  const [insCalculation, setInsCalculation] = useState(0);

  const { insuranceContractInstance, getProviderOrSigner } =
    useContext(ContextAPI);

  const handleFormSubmit = async (amount) => {
    try {
      const provider = await getProviderOrSigner();
      const contract = await insuranceContractInstance(provider);
      const getInsurancePredict = await contract.calculateInsurance(amount);
      setInsCalculation(Number(getInsurancePredict) / 1e18);
    } catch (error) {
      console.error(error);
    }
  };

  const title = () => "Learn The Insurance Cost";

  return (
    <div className={styles.container}>
      <Form
        title={title}
        handleFormSubmit={handleFormSubmit}
        cost={insCalculation}
      />
      <div className={styles.rightSide}>
        <div className={styles.triangle}></div>
        <h3 className={styles.secondTitle}>
          To learn the insurance cost for your tokens, fill the form!
          <br /> And do not forget the enter the amount!
        </h3>
      </div>
    </div>
  );
}
