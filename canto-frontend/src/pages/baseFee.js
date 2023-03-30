import { useFormik } from "formik";
import { object, number } from "yup";
import { ContextAPI } from "../../context/ContextProvider";
import styles from "@/styles/BaseFee.module.css";
import { useContext, useEffect, useState } from "react";

export default function BaseFee() {
  const [contractBalance, setContractBalance] = useState("");
  const { managementContractInstance, getProviderOrSigner } =
    useContext(ContextAPI);

  const getContractBalance = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = await managementContractInstance(provider);
      const balance = await contract.getBalance();
      setContractBalance(balance.toString());
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
    // onSubmit: (values) => {
    //   handleCreateProposal(values.description, values.requestedContribution);
    // },
  });

  useEffect(() => {
    getContractBalance();
  }, [contractBalance]);

  return (
    <>
      <div className={styles.contractBalance}>
        Contract Balance: {contractBalance}
      </div>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h3>Pay The Base Fee</h3>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          onChange={formik.handleChange}
        />
        <button>Pay</button>
      </form>
    </>
  );
}
