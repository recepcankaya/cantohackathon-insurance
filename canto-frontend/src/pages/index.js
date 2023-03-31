import BaseFeeForm from "../../components/BaseFeeForm";
import CalculateInsuranceForm from "../../components/CalculateInsuranceForm";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h2 className={styles.h2Title}>The New Modal of Crypto Insurance</h2>
        <BaseFeeForm />
        <CalculateInsuranceForm />
      </main>
    </>
  );
}
