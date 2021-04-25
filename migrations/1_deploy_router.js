require('dotenv').config();
const Router = artifacts.require('PancakeRouter01');
const WETH = artifacts.require('WETH9');
module.exports = async function (deployer, network, addresses) {
  let weth;
  if (network === 'development') {
    await deployer.deploy(WETH);
    weth = await WETH.deployed();
  } else {
    weth = await WETH.at(process.env.WETH_ADDRESS);
  }
  console.log("FACTORY_ADDRESS ", process.env.FACTORY_ADDRESS)
  await deployer.deploy(Router, process.env.FACTORY_ADDRESS, weth.address);
  
};
