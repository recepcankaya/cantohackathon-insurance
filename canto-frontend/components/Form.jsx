import { useState } from "react";
import Modal from "./Modal";
import { useFormik } from "formik";
import { object, number } from "yup";
import styles from "@/styles/Form.module.css";

export default function Form({ title, cost, handleFormSubmit }) {
  const [isOpen, setIsOpen] = useState(false);

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
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h3>{title()}</h3>
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        id="amount"
        name="amount"
        onChange={formik.handleChange}
        value={formik.values.amount}
      />
      <Modal open={isOpen} onClose={closeModal}>
        Your one-time base fee is {cost} token
      </Modal>
      <button onClick={openModal}>Learn!</button>
    </form>
  );
}
