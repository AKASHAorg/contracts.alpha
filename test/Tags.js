const BigNumber = web3.BigNumber;
const sha3 = require('js-sha3').keccak_256;
const helpers = require('./helpers');
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Tags = artifacts.require('Tags.sol');

contract('Tags', function ([owner, wallet]) {
  let tags;
  const hash = '0x9cbc07c3f9917';

  before(async function () {
    tags = await Tags.deployed();
  });

  describe('register a tag', function () {

    it('should create a valid tag', async function () {
      const {logs} = await tags.add('test-tag', { from: wallet });
      const event = logs.find(e => e.event === 'TagCreate');
      should.exist(event);
    });

    it('should create a list', async function () {
      const { logs } = await tags.create_list('My list', hash, web3.fromDecimal(11), web3.fromDecimal(20), { from: wallet });
      const event = logs.find(e => e.event === 'ListCreate');
      should.exist(event);

      const listData = await tags.get_list_publisher('My list', wallet);
      should.exist(listData);

      const listData1 = await tags.get_list(event.args.id);
      should.exist(listData1);

      listData.should.eql(listData1);
    });

    it('should edit a list', async function () {
      const newHash = hash + '112';
      const { logs } = await tags.update_list('My list', newHash, web3.fromDecimal(11), web3.fromDecimal(20), { from: wallet });
      const event = logs.find(e => e.event === 'ListUpdate');
      should.exist(event);
    });

  })
});