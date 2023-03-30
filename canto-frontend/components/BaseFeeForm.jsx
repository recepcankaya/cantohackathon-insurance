import styles from "@/styles/BaseFeeForm.module.css";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { object, number } from "yup";
import { ContextAPI } from "../context/ContextProvider";
import Modal from "./Modal";

export default function FormContainer() {
  const [baseFeeAmount, setBaseFeeAmount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const { insuranceContractInstance, getProviderOrSigner } =
    useContext(ContextAPI);

  const handleFormSubmit = async (amount) => {
    try {
      const provider = await getProviderOrSigner();
      const contract = await insuranceContractInstance(provider);
      const getInfo = await contract.baseFee(amount);
      const turnToNumber = Number(getInfo) / 10000;
      setBaseFeeAmount(turnToNumber);
    } catch (e) {
      console.error(e);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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

  return (
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <div className={styles.triangle}></div>
        <h3 className={styles.firstTitle}>
          To learn the first-time base fee for insurance, fill the form!
          <br /> And do not forget the enter the amount!
        </h3>
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h3>Learn the Base Fee</h3>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={formik.handleChange}
          value={formik.values.amount}
        />
        <Modal open={isOpen} onClose={closeModal}>
          Your one-time base fee is {baseFeeAmount} token
        </Modal>
        <button onClick={openModal}>Learn!</button>
      </form>
    </div>
  );
}
