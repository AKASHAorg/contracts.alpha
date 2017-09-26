const BigNumber = web3.BigNumber;
const helpers = require('./helpers');
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

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

      const fetched = await resolver.resolve(userName);

      fetched[0].should.equal('0x7465737475736572000000000000000000000000000000000000000000000000'); // testuser
      resolverAddress.should.equal(ProfileResolver.address);
      resolved.should.equal(owner);
      reversed.should.equal(userName);

      const event = logs.find(e => e.event === 'Register');
      should.exist(event)
    });

  })
});