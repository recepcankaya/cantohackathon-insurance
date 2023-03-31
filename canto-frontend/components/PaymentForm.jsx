import { useFormik } from "formik";
import { object, number } from "yup";
import styles from "@/styles/PaymentForm.module.css";

export default function PaymentForm({ handlePaymentForm, title, text }) {
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: object({
      amount: number()
        .required("This field is required!")
        .positive("Must be positive!"),
    }),
    onSubmit: (values) => {
      handlePaymentForm(values.amount);
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
      {formik.touched.amount && formik.errors.amount ? (
        <div className={styles.error}>
          <span className={styles.errorText}>{formik.errors.amount}</span>
        </div>
      ) : null}
      <button type="submit">{text}</button>
    </form>
  );
}
