import { ContextAPI } from "../../context/ContextProvider";
import { useContext } from "react";
import { utils } from "ethers";
import Balance from "../../components/Balance";
import PaymentForm from "../../components/PaymentForm";

export default function ClaimToken() {
  const { managementContractInstance, getProviderOrSigner } =
    useContext(ContextAPI);

  const payTheInsurance = async (amount) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await managementContractInstance(signer);
      const fee = await contract.baseFee(amount);
      const ins = (Number(fee) / 1e18).toString();
      const payment = await contract.getBaseFee(amount, {
        value: utils.parseEther(ins),
      });
    } catch (error) {
      alert("Claimed Wrong");
    }
  };

  const title = () => "Claim Your Tokens";

  return (
    <>
      <Balance />
      <PaymentForm
        handlePaymentForm={payTheInsurance}
        title={title}
        text="Get"
      />
    </>
  );
}
