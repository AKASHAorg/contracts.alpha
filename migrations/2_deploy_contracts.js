const ENS = artifacts.require("ENS.sol");
const FIFSRegistrar = artifacts.require('FIFSRegistrar.sol');
const IpfsHash = artifacts.require('IpfsHash.sol');
const ProfileRegistrar = artifacts.require('ProfileRegistrar.sol');
const ProfileResolver = artifacts.require('ProfileResolver.sol');

const namehash = require('eth-ens-namehash');

/**
 * Calculate root node hashes given the top level domain(tld)
 *
 * @param {string} tld plain text tld, for example: 'eth'
 */
function getRootNodeFromTLD(tld) {
  return {
    namehash: namehash(tld),
    sha3: web3.sha3(tld)
  };
}

 // https://github.com/ethereum/ens/blob/master/migrations/2_deploy_contracts.js#L67
function deployFIFSRegistrar(deployer, tld) {
  const rootNode = getRootNodeFromTLD(tld);

  // Deploy the ENS first
  return deployer.deploy(ENS)
    .then(() => {
      // Deploy the FIFSRegistrar and bind it with ENS
      return deployer.deploy(FIFSRegistrar, ENS.address, rootNode.namehash);
    })
    .then(function() {
      // Transfer the owner of the `rootNode` to the FIFSRegistrar
      return ENS.at(ENS.address).setSubnodeOwner('0x0', rootNode.sha3, FIFSRegistrar.address);
    });
}

const deployAkasha = async function (deployer) {
  const akasha = web3.sha3('akashaproject');
  await deployer.deploy(IpfsHash);
  await deployer.link(IpfsHash, [ProfileResolver]);
  await deployer.deploy(ProfileResolver, ENS.address, web3.fromDecimal(0));
  await deployer.deploy(ProfileRegistrar, ENS.address, namehash('akashaproject.eth'));
  await FIFSRegistrar.at(FIFSRegistrar.address).register(akasha, ProfileRegistrar.address);

  console.log(ProfileRegistrar.address, '<==========');
  await ProfileRegistrar.at(ProfileRegistrar.address).setResolver(ProfileResolver.address);
  await ProfileResolver.at(ProfileResolver.address).setModule(ProfileRegistrar.address);
  await ProfileRegistrar.deployed();
};

module.exports = function(deployer, network) {
  const tld = 'eth';
  console.log('running on network => ', network);
  deployFIFSRegistrar(deployer, tld)
    .then(() => deployAkasha(deployer));
};