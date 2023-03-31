import { ContextAPI } from "../../context/ContextProvider";
import { useContext } from "react";
import { utils } from "ethers";
import Balance from "../../components/Balance";
import PaymentForm from "../../components/PaymentForm";

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

  const title = () => "Pay The Base Fee";

  return (
    <>
      <Balance />
      <PaymentForm handlePaymentForm={takeBaseFee} title={title} />
    </>
  );
}
