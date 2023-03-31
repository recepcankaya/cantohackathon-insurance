import { useFormik } from "formik";
import { object, number } from "yup";
import { ContextAPI } from "../../context/ContextProvider";
import styles from "@/styles/BaseFee.module.css";
import { useContext } from "react";
import { utils } from "ethers";
import Balance from "../../components/Balance";

export default function BaseFee() {
  const { insuranceContractInstance, getProviderOrSigner } =
    useContext(ContextAPI);

  const takeBaseFee = async (amount) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await insuranceContractInstance(signer);
      const fee = await contract.baseFee(amount);
      const ins = (Number(fee) / 1e18).toString();
      const payment = await contract.getBaseFee(amount, {
        value: utils.parseEther(ins),
      });
    } catch (error) {
      alert("You paid the base fee");
    }
  };

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
      takeBaseFee(values.amount);
    },
  });

  return (
    <>
      <Balance />
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h3>Pay The Base Fee</h3>
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
        <button type="submit">Pay</button>
      </form>
    </>
  );
}
