import { useFormik } from "formik";
import { object, number } from "yup";
import styles from "@/styles/Insurance.module.css";

export default function Insurance() {
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: object({
      amount: number().required("This field is required!").positive(),
    }),
    // onSubmit: (values) => {
    //   handleCreateProposal(values.description, values.requestedContribution);
    // },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h3>Pay The Insurance Cost</h3>
      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        id="amount"
        name="amount"
        onChange={formik.handleChange}
      />
      <button>Pay</button>
    </form>
  );
}
