import { useFormik } from "formik";
import { object, number } from "yup";
import { ContextAPI } from "../../context/ContextProvider";
import styles from "@/styles/BaseFee.module.css";
import { useContext, useEffect, useState } from "react";
import { BigNumber, utils } from "ethers";

export default function BaseFee() {
  const [contractBalance, setContractBalance] = useState("");
  const [insurance, setInsurance] = useState("");
  const {
    insuranceContractInstance,
    managementContractInstance,
    getProviderOrSigner,
  } = useContext(ContextAPI);

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

  const takeBaseFee = async (amount) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await insuranceContractInstance(signer);
      const fee = await contract.baseFee(amount);
      const division = fee.div(10000);
      console.log(division.toString());
      const getPayment = await contract.getBaseFee(amount, {
        value: utils.parseEther(division.toString()),
      });
      // await getPayment.wait();
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
      takeBaseFee(values.amount);
    },
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
          value={formik.values.amount}
        />
        <button type="submit">Pay</button>
      </form>
    </>
  );
}
