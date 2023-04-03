<<<<<<< HEAD
import { useContext, useState } from "react";
=======
import { utils } from "ethers";
import { useContext, useState, CSSProperties } from "react";
>>>>>>> 27469956ca1ec1cd95726d126959b4ab475ce5fe
import { ContextAPI } from "../../context/ContextProvider";
import Balance from "../../components/Balance";
import PaymentForm from "../../components/PaymentForm";
import Loader from "../../components/Loader";

import { utils } from "ethers";

export default function Insurance() {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await payment.wait();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const title = () => "Pay The Insurance Cost";

  return (
    <>
      <Balance />
      <PaymentForm handlePaymentForm={takeInsurance} title={title} text="Pay" />
    </>
  );
}
