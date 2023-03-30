import styles from "@/styles/CalculateInsuranceForm.module.css";
import { useFormik } from "formik";
import { object, number } from "yup";
import { useContext, useState } from "react";
import { ContextAPI } from "../context/ContextProvider";
import Modal from "./Modal";

export default function FormContainer() {
  const [insCalculation, setInsCalculation] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { insuranceContractInstance, getProviderOrSigner } =
    useContext(ContextAPI);

  const handleFormSubmit = async (amount) => {
    try {
      const provider = await getProviderOrSigner();
      const contract = await insuranceContractInstance(provider);
      const getInsurancePredict = await contract.calculateInsurance(amount);
      const turnToNumber = Number(getInsurancePredict) / 10000;
      setInsCalculation(turnToNumber);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: object({
      amount: number().required("This field is required!").positive(),
    }),
    onSubmit: (values) => {
      handleFormSubmit(values.amount);
    },
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h3>Learn the Insurance Cost</h3>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={formik.handleChange}
        />
        <button onClick={openModal}>Learn!</button>
      </form>
      <Modal open={isOpen} onClose={closeModal}>
        Your insurance cost is {insCalculation} token
      </Modal>
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
