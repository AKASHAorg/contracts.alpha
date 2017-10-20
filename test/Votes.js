const BigNumber = web3.BigNumber;
const helpers = require('./helpers');
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const AethSale = artifacts.require('AethSale');
const AETH = artifacts.require('AETH');
const Tags = artifacts.require('Tags.sol');
const Entries = artifacts.require('Entries.sol');
const Essence = artifacts.require('Essence.sol');
const Comments = artifacts.require('Comments.sol');
const Votes = artifacts.require('Votes.sol');

contract('Votes', function ([owner, wallet]) {
  const tagName = web3.fromAscii('testtag');
  const hashIpfs = web3.fromAscii('aabdes');
  const rate = new BigNumber(1000);
  const mana = helpers.ether(5000);
  const cap = helpers.ether(10);
  const minimum = helpers.ether(1);
  let endBlockCap;
  let tags;
  let entries;
  let comments;
  let commentId;
  let votes;

  let entryObj = {entryId: null, ethAddress: null};
  before(async function () {
    const currentBlock = await helpers.getCurrentBlockNumber();
    this.startTime = new Date().getTime() / 1000 + 1;
    this.endTime = this.startTime + 200;
    endBlockCap = currentBlock + 15;
    this.crowdsale = await AethSale.new(this.startTime, this.endTime, rate, wallet, cap, minimum, endBlockCap, {
      gas: 6150000,
      from: owner
    });

    this.token = AETH.at(await this.crowdsale.token());
    await helpers.sleep(1);
    await this.crowdsale.send(cap, { from: owner }).should.be.fulfilled;
    await helpers.advanceToBlock(endBlockCap + 1);
    await this.crowdsale.finalize();
    await helpers.advanceBlock();
    await this.token.transfer(wallet, mana, {from: owner});

    await this.token.bondAeth(mana, {from: owner});
    await this.token.bondAeth(mana, {from: wallet});
    tags = await Tags.deployed();
    const {logs} = await tags.adminAdd(tagName, { from: owner });
    const event = logs.find(e => e.event === 'TagCreate');
    should.exist(event);
    await helpers.advanceBlock();
    entries = await Entries.deployed();
    const ess = await Essence.deployed();
    comments = await Comments.deployed();
    votes = await Votes.deployed();

    await this.token.setEssence(Essence.address,
      {
        from: owner,
        gas: 200000
      });

    await ess.setAeth(this.token.address, {
      from: owner,
      gas: 200000
    });

    const logsEntry = await entries.publishArticle(hashIpfs, new BigNumber(12), new BigNumber(20), [tagName], { from: owner});
    const entryCreate = logsEntry.logs.find(e => e.event === 'Publish');
    if(entryCreate) {
      entryObj.ethAddress = entryCreate.args.author;
      entryObj.entryId = entryCreate.args.entryId;
    }

    await helpers.advanceBlock();

  });

  describe('Vote comment', function() {

    it('should publish an entry', async function () {
      should.exist(entryObj.ethAddress);
    });

    it('should comment on entry', async function () {
      const ev = await comments.publish(entryObj.entryId, entryObj.ethAddress, '0x0', hashIpfs, new BigNumber(12), new BigNumber(20));
      const commentPublish = ev.logs.find(e => e.event === 'Publish');
      commentId = commentPublish.args.id;
      should.exist(commentId);
    });

    it('should upvote comment', async function () {
      const { logs } = await votes.voteComment(new BigNumber(1), entryObj.entryId, commentId, false, { from: wallet });
      should.exist(logs[0].args);
    });
  })
});