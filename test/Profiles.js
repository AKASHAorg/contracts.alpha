const BigNumber = web3.BigNumber;
const helpers = require('./helpers');
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const namehash = require('eth-ens-namehash');
const ENS = artifacts.require("ENS.sol");
const FIFSRegistrar = artifacts.require('FIFSRegistrar.sol');
const IpfsHash = artifacts.require('IpfsHash.sol');
const ProfileRegistrar = artifacts.require('ProfileRegistrar.sol');
const ProfileResolver = artifacts.require('ProfileResolver.sol');

contract('ProfileRegistrar', function ([owner, wallet]) {
  let ens, registrar;
  const hash = '0x9cbc07c3f9917';

  before(async function () {
    ens = await ENS.deployed();
    registrar = await ProfileRegistrar.deployed();
  });

  describe('register an username', function () {

    it('should reserve a valid username', async function () {
      await ens.owner.call(namehash('akashaproject.eth')).then((data)=> console.log(data));
      await registrar.register(web3.sha3('testuser'), hash, web3.fromDecimal(11), web3.fromDecimal(20), { from: wallet });
      const owner = await ens.owner(namehash('testuser.akashaproject.eth'));
      console.log(owner);
    });

  })
});