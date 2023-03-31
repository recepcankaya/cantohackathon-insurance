import { utils } from "ethers";
import { useContext } from "react";
import { ContextAPI } from "../../context/ContextProvider";
import Balance from "../../components/Balance";
import PaymentForm from "../../components/PaymentForm";

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

  const title = () => "Pay The Insurance Cost";

  return (
    <>
      <Balance />
      <PaymentForm handlePaymentForm={takeInsurance} title={title} text="Pay" />
    </>
  );
}
