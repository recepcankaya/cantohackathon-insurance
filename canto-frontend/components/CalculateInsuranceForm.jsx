import styles from "@/styles/CalculateInsuranceForm.module.css";
import { useFormik } from "formik";
import { object, number } from "yup";

export default function FormContainer() {
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
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h3>Learn the Insurance Cost</h3>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={formik.handleChange}
        />
        <button>Learn!</button>
      </form>
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
