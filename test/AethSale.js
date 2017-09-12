const BigNumber = web3.BigNumber;
const helpers = require('./helpers');
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const AethSale = artifacts.require('AethSale');
const AETH = artifacts.require('AETH');

contract('AethSale', function ([owner, wallet]) {

  const rate = new BigNumber(1000);
  const cap = helpers.ether(10);
  const minimum = helpers.ether(1);
  let endBlockCap;
  beforeEach(async function () {
    const currentBlock = await helpers.getCurrentBlockNumber();
    this.startBlock = currentBlock + 10;
    this.endBlock = currentBlock + 20;
    endBlockCap = currentBlock + 15;
    this.crowdsale = await AethSale.new(this.startBlock, this.endBlock, rate, wallet, cap, minimum, endBlockCap, {gas: 6200000});
    this.token = AETH.at(await this.crowdsale.token());
  });

  describe('accepting payments', function () {

    beforeEach(async function () {
      await helpers.advanceToBlock(this.startBlock - 1);
    });

    it('should accept payments within cap', async function () {
      const x = await web3.eth.getBalance(owner);
      console.log(web3.fromWei(x.toString(), 'ether'));
      await this.crowdsale.send(minimum).should.be.fulfilled;
      await this.crowdsale.send(cap.sub(minimum)).should.be.fulfilled;
    });

    it('should accept payments after reaching goal', async function () {
      await this.crowdsale.send(minimum).should.be.fulfilled;
      await helpers.advanceToBlock(endBlockCap - 1);
      await this.crowdsale.send(cap.sub(minimum)).should.be.fulfilled;
    });

    it('should reject payments after reaching goal', async function () {
      await this.crowdsale.send(minimum).should.be.fulfilled;
      await helpers.advanceToBlock(endBlockCap);
      await this.crowdsale.send(cap.sub(minimum)).should.be.rejectedWith(helpers.EVMThrow);
    });

    it('should reject payments outside cap', async function () {
      await this.crowdsale.send(cap).should.be.fulfilled;
      await this.crowdsale.send(1).should.be.rejectedWith(helpers.EVMThrow);
    });

    it('should reject payments that exceed cap', async function () {
      await this.crowdsale.send(cap.plus(1)).should.be.rejectedWith(helpers.EVMThrow);
    });

    it('should mint ethers*ratio tokens', async function () {
      const {logs} = await this.crowdsale.send(minimum).should.be.fulfilled;

      const event = logs.find(e => e.event === 'TokenPurchase');
      should.exist(event);

      const totalSupply = await this.token.totalSupply();
      totalSupply.should.be.bignumber.equal(rate.mul(minimum));
    });
  });

  describe('ending', function () {

    beforeEach(async function () {
      await helpers.advanceToBlock(this.startBlock - 1);
    });

    it('should not be ended if under cap', async function () {
      let hasEnded = await this.crowdsale.hasEnded();
      hasEnded.should.equal(false);
      await this.crowdsale.send(minimum);
      hasEnded = await this.crowdsale.hasEnded();
      hasEnded.should.equal(false);
    });

    it('should not be ended if just under cap', async function () {
      await this.crowdsale.send(cap.minus(1));
      let hasEnded = await this.crowdsale.hasEnded();
      hasEnded.should.equal(false);
    });

    it('should be ended if cap reached', async function () {
      await this.crowdsale.send(cap);
      let hasEnded = await this.crowdsale.hasEnded();
      hasEnded.should.equal(true);
    });

    it('should be ended if end period reached', async function () {
      await helpers.advanceToBlock(this.endBlock + 1);
      let hasEnded = await this.crowdsale.hasEnded();
      hasEnded.should.equal(true);
    });

    it('should be ended if goal reached and after cap block', async function () {
      await this.crowdsale.send(minimum).should.be.fulfilled;
      await helpers.advanceToBlock(endBlockCap + 1);
      let hasEnded = await this.crowdsale.hasEnded();
      hasEnded.should.equal(true);
    });

    it('should mark sale as finished and set admin', async function () {
      await this.crowdsale.send(minimum).should.be.fulfilled;
      await helpers.advanceToBlock(endBlockCap + 1);
      await this.crowdsale.finalize();
      let hasEnded = await this.crowdsale.hasEnded();
      hasEnded.should.equal(true);

      const admin = await this.token.owner();
      admin.should.equal(owner);
    });

  })

});
