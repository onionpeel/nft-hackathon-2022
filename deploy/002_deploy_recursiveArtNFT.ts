import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import { ethers } from 'ethers';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, execute} = deployments;

  const {deployer} = await getNamedAccounts();

  await deploy('RecursiveArtNFT', {
    from: deployer,
    log: true,
  });

  const recursiveArtNFT = await deployments.get('RecursiveArtNFT');
  const recursiveExchange = await deployments.get('RecursiveExchange');

  await execute(
    'RecursiveArtNFT',
    {from: deployer, log: true},
    'setRecursiveExchange',
    recursiveExchange.address
  )
};

export default func;

func.tags = ['recursiveArtNFT'];
func.dependencies = ['recursiveExchange'];
