import { useFormik } from "formik";
import { object, number } from "yup";
import { utils } from "ethers";
import styles from "@/styles/Insurance.module.css";
import { useContext } from "react";
import { ContextAPI } from "../../context/ContextProvider";

export default function Insurance() {
  const { insuranceContractInstance, getProviderOrSigner } =
    useContext(ContextAPI);

  const takeInsurance = async (amount) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await insuranceContractInstance(signer);
      const fee = await contract.calculateInsurance(amount);
      const ins = Number(fee) / 1e18;
      const cost = ins.toString();
      const payment = await contract.getInsurance(amount, {
        value: utils.parseEther(cost),
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
