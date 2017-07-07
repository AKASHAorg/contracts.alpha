const BigNumber = web3.BigNumber;
const helpers = require('./helpers');
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const AethSale = artifacts.require('AethSale');
const AETH = artifacts.require('AETH');

contract('AethSale', function ([_, wallet]) {

  const rate = new BigNumber(1000);
  const cap = helpers.ether(1000);
  const minimum = helpers.ether(99);

  beforeEach(async function () {
    const currentBlock = await helpers.getCurrentBlockNumber();
    this.startBlock = currentBlock + 10;
    this.endBlock = currentBlock + 20;
    this.crowdsale = await AethSale.new(this.startBlock, this.endBlock, rate, wallet, cap, minimum);
    this.token = AETH.at(await this.crowdsale.token());
  });

  describe('accepting payments', function () {

    beforeEach(async function () {
      await helpers.advanceToBlock(this.startBlock - 1);
    });

    it('should accept payments within cap', async function () {
      await this.crowdsale.send(minimum).should.be.fulfilled;
      await this.crowdsale.send(cap.sub(minimum)).should.be.fulfilled;
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
      console.log(totalSupply);
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
  })

});