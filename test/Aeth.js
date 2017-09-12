const BigNumber = web3.BigNumber;
const helpers = require('./helpers');
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const AethSale = artifacts.require('AethSale');
const AETH = artifacts.require('AETH');


contract('AETH', function ([_, holder1, holder2, holder3]) {

  const rate = new BigNumber(1000);
  const cap = helpers.ether(10);
  const minimum = helpers.ether(2);
  let endBlockCap;
  before(async function () {
    const currentBlock = await helpers.getCurrentBlockNumber();
    this.startBlock = currentBlock + 10;
    this.endBlock = currentBlock + 20;
    endBlockCap = currentBlock + 15;
    this.crowdsale = await AethSale.new(this.startBlock, this.endBlock, rate, _, cap, minimum, endBlockCap, {
      gas: 6200000,
      from: _
    });
    this.token = AETH.at(await this.crowdsale.token());
    await helpers.advanceToBlock(this.startBlock);
  });

  describe('accepting payments', function () {

    afterEach(async function () {
      await helpers.advanceBlock();
    });

    it('alloc eth*ratio tokens', async function () {
      await this.crowdsale.sendTransaction({from: holder1, value: minimum}).should.be.fulfilled;
      await this.crowdsale.sendTransaction({from: holder2, value: cap.sub(minimum)}).should.be.fulfilled;
      await this.crowdsale.finalize();
      const total = await this.token.totalSupply();
      total.should.be.bignumber.equal(cap.mul(rate));
      const balance1 = await this.token.balanceOf(holder1);
      const balance2 = await this.token.balanceOf(holder2);

      balance1.should.be.bignumber.equal(minimum.mul(rate));
      balance2.should.be.bignumber.equal((cap.sub(minimum)).mul(rate));
    });

    it('bonds aeth to essence', async function () {
      await this.token.bondAeth(web3.toWei('1000', 'ether'), {from: holder1});
      const balances = await this.token.getTokenRecords(holder1);
      balances[1].should.be.bignumber.equal((helpers.ether(1)).mul(rate));
    });

    it('bonds extra aeth to essence', async function () {
      await this.token.bondAeth(helpers.ether(500), {from: holder1});
      const balances = await this.token.getTokenRecords(holder1);
      balances[1].should.be.bignumber.equal(helpers.ether(1500));
    });

    it('fails to generate extra essence when out of aeth', async function () {
      await this.token.bondAeth(helpers.ether(600), {from: holder1}).should.be.rejectedWith(helpers.EVMThrow);
      const balances = await this.token.getTokenRecords(holder1);
      balances[1].should.be.bignumber.equal(helpers.ether(1500));
      await this.token.setLockTime(web3.fromDecimal(1), {from: _});
    });

    it('cycles bonded aeth', async function () {
      await this.token.cycleAeth(helpers.ether(300), {from: holder1});
      const balances = await this.token.getTokenRecords(holder1);
      balances[1].should.be.bignumber.equal(helpers.ether(1200));
      balances[2].should.be.bignumber.equal(helpers.ether(300));
    });

    it('frees cycling aeth', async function () {
      this.timeout(20000);
      const balance1 = await this.token.balanceOf(holder1);
      await this.token.cycleAeth(helpers.ether(100), {from: holder1});

      await helpers.advanceBlock();
      await helpers.advanceBlock();
      await helpers.advanceBlock();
      await helpers.advanceBlock();
      await helpers.sleep(5);

      const block = await web3.eth.getBlock('latest');
      const cyclingStatesNr = await this.token.getCyclingStatesNr(holder1, web3.fromDecimal(block.timestamp + 10));
      cyclingStatesNr[0].should.be.bignumber.above(0);
      cyclingStatesNr[1].should.be.bignumber.above(0);

      await this.token.freeAeth({from: holder1});

      const finalBalance = await this.token.balanceOf(holder1);
      finalBalance.should.be.bignumber.equal(balance1.add(helpers.ether(400)));

    })

  });
});