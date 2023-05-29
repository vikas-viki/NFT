const hre = require("hardhat");

async function main() {

  const Lock = await hre.ethers.getContractFactory("NFT");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log(`Deployed to ${lock.address}`
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
// 0x9Ef94a755C47aBB0630eBe2Df6d61A670BDa9740