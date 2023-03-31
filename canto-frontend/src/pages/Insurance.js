import { useFormik } from "formik";
import { object, number } from "yup";
import { utils } from "ethers";
import styles from "@/styles/Insurance.module.css";
import { useContext } from "react";
import { ContextAPI } from "../../context/ContextProvider";
import Balance from "../../components/Balance";

export default function Insurance() {
  const { insuranceContractInstance, getProviderOrSigner } =
    useContext(ContextAPI);

  const takeInsurance = async (amount) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await insuranceContractInstance(signer);
      const fee = await contract.calculateInsurance(amount);
      const ins = (Number(fee) / 1e18).toString();
      const payment = await contract.getInsurance(amount, {
        value: utils.parseEther(ins),
      });
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
      takeInsurance(values.amount);
    },
  });

  return (
    <>
      <Balance />
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h3>Pay The Insurance Cost</h3>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={formik.handleChange}
        />
        {formik.touched.amount && formik.errors.amount ? (
          <div className={styles.error}>
            <span className={styles.errorText}>{formik.errors.amount}</span>
          </div>
        ) : null}
        <button type="submit">Pay</button>
      </form>
    </>
  );
}
