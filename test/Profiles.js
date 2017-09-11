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
  let ens, registrar, resolver;
  const hash = '0x9cbc07c3f9917';

  before(async function () {
    ens = await ENS.deployed();
    registrar = await ProfileRegistrar.deployed();
    resolver = await ProfileResolver.deployed();
  });

  describe('register an username', function () {

    it('should reserve a valid username', async function () {
      const {logs} = await registrar.register('testuser', hash, true, web3.fromDecimal(11), web3.fromDecimal(20), { from: wallet });
      const userName = await registrar.hash('testuser');
      const owner = await ens.owner(userName);
      const resolved = await resolver.addr(userName);
      const reversed = await resolver.reverse(owner);
      const resolverAddress = await ens.resolver(userName);

      resolverAddress.should.equal(ProfileResolver.address);
      resolved.should.equal(owner);
      userName.should.equal(reversed);

      const event = logs.find(e => e.event === 'Register');
      should.exist(event)
    });

  })
});