const Web3 = require('web3');
const classes = require('./classes.json');
const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = "0x29d69e88871f2b91251605600edce8f966fca2b2";

///////////////// POOR MAN'S DEPLOYER >_> \\\\\\\\\\\\\\\\\\\\
function deploy(contract) {
    const ContractClass = web3.eth.contract(JSON.parse(classes[contract].interface));
    const deploy = ContractClass.new({
        data: classes[contract].bytecode,
        gas: 4700000
    }, (err, myContract) => {
        if (!err) {
            if (!myContract.address) {
                console.log(contract, myContract.transactionHash, 'hash');
            } else {
                console.log(contract, myContract.address, 'address');
            }

        }
        if(err){
            console.error(contract, 'HAS ERROR', err);
        }
    });
}
function run(contract, address){
    return web3.eth.contract(JSON.parse(classes[contract].interface)).at(address);
}

const objects = {
    RegistryStore: "0x077c5983bfebec8fe75d7ef86311c2e9ff38609b",
    Comments: "0x514251eb26298337199a71ad28d2c1bdfb281723",
    Votes: "0x48e6b1e1891851288cc3711f6b231a912b4ab468",
    Funds: "0x211ae2d39c4724dc3cc7df216d39bcbf83016895",
    Faucet: "0xa27c237bd671e37b54e72b3264855059d07d5e1a",
    Feed: "0x940bb75effd935ecdd45537e81c95cdbc72c444c",
    Tags: "0x1170bed968f0e487932d84bfab38f51408404703",
    RegistryController: "0xd092e6baf52269121abf625f0a1a5693f65e46c7",
    Entry: "0x3746fa6bea40b4fe18a3479d18ce6fa352e4c455"
};

// first be sure to deploy all libraries and link them to contracts: replace __LIB____ with actual address( no 0x) 9bd7ec8a9e8774b703e3636a1d2396afa58ed81d
/*["Entry", "Votes", "Comments"].forEach(
      (instance) => {
          console.log('deploying '+ instance);
          deploy(instance);
      }
);*/
/////////////// after deployment
function runMigrations() {
/*
    run('RegistryStore', objects.RegistryStore).setOwner(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('RegistryStore setOwner');
        console.log(err, resp);
    });
    run('RegistryController', objects.RegistryController).setStore(objects.RegistryStore, { gas: 4000000 }, (err, resp) => {
        console.log('RegistryController setStore');
        console.log(err, resp);
    });

    run('Tags', objects.Tags).setRegistry(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('Tags setRegistry');
        console.log(err, resp);
    });


    run('Faucet', objects.Faucet).setRegistry(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('Faucet setRegistry');
        console.log(err, resp);
    });

    run('Funds', objects.Funds).setRegistry(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('Funds setRegistry');
        console.log(err, resp);
    });
    **/
/*
    run('Entry', objects.Entry).setTagsSource(objects.Tags, { gas: 4000000 }, (err, resp) => {
        console.log('Entry setTagsSource');
        console.log(err, resp);
    });
    run('Entry', objects.Entry).setRegistry(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('Entry setRegistry');
        console.log(err, resp);
    });
    */
/**
    run('Comments', objects.Comments).setRegistry(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('Comments setRegistry');
        console.log(err, resp);
    });


    run('Comments', objects.Comments).setEntryAddress(objects.Entry, { gas: 4000000 }, (err, resp) => {
        console.log('Comments setEntryAddress');
        console.log(err, resp);
    });
**/
/**
    run('Feed', objects.Feed).setRegistry(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('Feed setRegistry');
        console.log(err, resp);
    });
    run('Feed', objects.Feed).setTagSource(objects.Tags, { gas: 4000000 }, (err, resp) => {
        console.log('Feed setTagSource');
        console.log(err, resp);
    });

    run('Votes', objects.Votes).setRegistry(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('Votes setRegistry');
        console.log(err, resp);
    });

    run('Votes', objects.Votes).setFundsAddress(objects.Funds, { gas: 4000000 }, (err, resp) => {
        console.log('Votes setFundsAddress');
        console.log(err, resp);
    });
    */
    run('Votes', objects.Votes).setEntriesAddress(objects.Entry, { gas: 4000000 }, (err, resp) => {
        console.log('Votes setEntriesAddress');
        console.log(err, resp);
    });
    run('Votes', objects.Votes).setFaucetAddress(objects.Faucet, { gas: 4000000 }, (err, resp) => {
        console.log('Votes setFaucetAddress');
        console.log(err, resp);
    });

}
runMigrations();