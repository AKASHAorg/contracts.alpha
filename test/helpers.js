const ether = function ether(n) {
  return new web3.BigNumber(web3.toWei(n, 'ether'))
};

const advanceBlock = function advanceBlock() {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_mine',
      id: Date.now(),
    }, (err, res) => {
      return err ? reject(err) : resolve(res)
    })
  })
};

const sleep = function(seconds) {
  return new Promise(res=>setTimeout(()=>res(), seconds*1000));
};

// Advances the block number so that the last mined block is `number`.
const advanceToBlock =  async function advanceToBlock(number) {
  if (await getCurrentBlockNumber() > number) {
    throw Error(`block number ${number} is in the past (current is ${web3.eth.blockNumber})`)
  }

  while (await getCurrentBlockNumber() < number) {
    await advanceBlock()
  }
};

const getCurrentBlockNumber = function getCurrentBlockNumber(){
  return new Promise((resolve, reject) => {
    web3.eth.getBlockNumber((err, data) => {
      if(err){
        return reject(err);
      }
      resolve(data);
    });
  });
};
const EVMThrow = 'invalid opcode';

module.exports = {
  ether,
  advanceBlock,
  advanceToBlock,
  getCurrentBlockNumber,
  sleep,
  EVMThrow
};