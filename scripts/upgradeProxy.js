const { ethers, upgrades } = require('hardhat');

// TO DO: Place the address of your proxy here!
// real
const proxyAddress = '0xCC69697d6C54b11466799F41A31D256FA596041f';
//test
// const proxyAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';


async function main() {
  const VendingMachineV2 = await ethers.getContractFactory('VendingMachineV2');
  const upgraded = await upgrades.upgradeProxy(proxyAddress, VendingMachineV2);

  const implementationAddress = await upgrades.erc1967.getImplementationAddress(
    proxyAddress
  );
  const owner = await upgraded.owner()

  console.log("The current contract owner is: " + owner);
  console.log('Implementation contract address: ' + implementationAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
