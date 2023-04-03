import { ContextAPI } from "../../context/ContextProvider";
import { useContext, useState } from "react";
import { utils } from "ethers";
import Balance from "../../components/Balance";
import PaymentForm from "../../components/PaymentForm";
import Loader from "../../components/Loader";

export default function BaseFee() {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      await payment.wait();
      setLoading(false);
    } catch (error) {
      alert("You paid the base fee");
    }
  };

  if (loading) {
    return <Loader />;
  }

  const title = () => "Pay The Base Fee";

  return (
    <>
      <Balance />
      <PaymentForm handlePaymentForm={takeBaseFee} title={title} text="Pay" />
    </>
  );
}
