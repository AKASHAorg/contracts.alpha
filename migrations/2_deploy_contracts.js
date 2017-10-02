const ENS = artifacts.require("ENS.sol");
const FIFSRegistrar = artifacts.require('FIFSRegistrar.sol');
const IpfsHash = artifacts.require('IpfsHash.sol');
const ProfileRegistrar = artifacts.require('ProfileRegistrar.sol');
const ProfileResolver = artifacts.require('ProfileResolver.sol');
const Tags = artifacts.require('Tags.sol');
const Feed = artifacts.require('Feed.sol');
const aethSale = artifacts.require('AethSale.sol');
const Essence = artifacts.require('Essence.sol');
const Comments = artifacts.require('Comments.sol');
const Entries = artifacts.require('Entries.sol');
const Votes = artifacts.require('Votes.sol');

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
  await deployer.link(IpfsHash, [ProfileResolver, Tags, Comments, Entries]);
  await deployer.deploy(Tags);
  await deployer.deploy(Feed);
  await deployer.deploy(ProfileResolver, ENS.address, web3.fromDecimal(0));
  await deployer.deploy(ProfileRegistrar, ENS.address, namehash('akashaproject.eth'));
  await FIFSRegistrar.at(FIFSRegistrar.address).register(akasha, ProfileRegistrar.address);

  await deployer.deploy(Essence);

  await deployer.deploy(Comments);
  await deployer.deploy(Votes);
  await deployer.deploy(Entries, Essence.address);

  await Comments.at(Comments.address).setEssence(Essence.address);
  await Comments.at(Comments.address).setVotes(Votes.address);
  await Comments.at(Comments.address).setEntries(Entries.address);

  await Tags.at(Tags.address).setEntry(Entries.address);
  await Tags.at(Tags.address).setEssence(Essence.address);

  await Votes.at(Votes.address).setEntries(Entries.address);
  await Votes.at(Votes.address).setComments(Comments.address);
  await Votes.at(Votes.address).setTags(Tags.address);
  await Votes.at(Votes.address).setEssence(Essence.address);

  await Entries.at(Entries.address).setVotesAddress(Votes.address);
  await Entries.at(Entries.address).setTagsAddress(Tags.address);
  await Entries.at(Entries.address).setEssenceAddress(Essence.address);

  await Essence.at(Essence.address).addToWhiteList(Entries.address);
  await Essence.at(Essence.address).addToWhiteList(Comments.address);
  await Essence.at(Essence.address).addToWhiteList(Tags.address);
  await Essence.at(Essence.address).addToWhiteList(Votes.address);

  await Votes.at(Votes.address).whiteList(Entries.address, true);
  await Votes.at(Votes.address).whiteList(Comments.address, true);
  await Votes.at(Votes.address).whiteList(Tags.address, true);

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