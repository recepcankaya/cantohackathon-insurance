const { ethers } = require("hardhat");

async function main() {
  const InsuranceContractFactory = await ethers.getContractFactory("Insurance");
  console.log("Deploying contract Insurance...");
  const insuranceContract = await InsuranceContractFactory.deploy();
  await insuranceContract.deployed();
  console.log(`Contract deployed to: ${insuranceContract.address}`);

  const ManagementContractFactory = await ethers.getContractFactory(
    "Management"
  );
  console.log("Deploying contract Management...");
  const managementContract = await ManagementContractFactory.deploy();
  await managementContract.deployed();
  console.log(`Contract deployed to: ${managementContract.address}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
