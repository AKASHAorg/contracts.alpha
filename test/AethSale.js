const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const AethSale = artifacts.require('AethSale');
const AETH = artifacts.require('AETH');

function ether(n) {
  return new web3.BigNumber(web3.toWei(n, 'ether'))
}

function advanceBlock() {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: Date.now(),
    }, (err, res) => {
      return err ? reject(err) : resolve(res)
    })
  })
}

// Advances the block number so that the last mined block is `number`.
async function advanceToBlock(number) {
  if (await getCurrentBlockNumber() > number) {
    throw Error(`block number ${number} is in the past (current is ${web3.eth.blockNumber})`)
  }

  while (await getCurrentBlockNumber() < number) {
    await advanceBlock()
  }
}

function getCurrentBlockNumber(){
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, data) => {
      if(err){
        return reject(err);
      }
      resolve(data);
    });
  });
}

contract('CappedCrowdsale', function ([_, wallet]) {

  const rate = new BigNumber(1000);

  const cap = ether(300);
  const minimum = ether(60);

  beforeEach(async function () {
    const currentBlock = await getCurrentBlockNumber();
    console.log(currentBlock);
    this.startBlock = currentBlock + 10;
    this.endBlock =   currentBlock + 20;

    this.crowdsale = await AethSale.new(this.startBlock, this.endBlock, rate, wallet, cap, minimum);

    this.token = AETH.at(await this.crowdsale.token());
  });

  describe('accepting payments', function () {

    beforeEach(async function () {
      await advanceToBlock(this.startBlock - 1);
    });

    it('should accept payments within cap', async function () {
      await this.crowdsale.send(cap.minus(minimum)).should.be.fulfilled;
      await this.crowdsale.send(minimum).should.be.fulfilled;
    });

  });

  describe('ending', function () {

    beforeEach(async function () {
      await advanceToBlock(this.startBlock - 1);
    });
  })

});