import styles from "@/styles/BaseFeeForm.module.css";
import { useFormik } from "formik";
import { object, number } from "yup";

export default function BaseFeeForm() {
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
        />
        <button>Learn!</button>
      </form>
    </div>
  );
}
