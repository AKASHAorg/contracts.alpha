const Web3 = require('web3');
const classes = require('./classes.json');
const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = "0x523317d8d59990df1724953e647898bd81effe98";

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
    RegistryStore: "0xcc62d9d7b6080428b97178034cdbfc219cebd565",
    Comments: "0xe2adb9839395892725508d554409906be1e407c8",
    Votes: "0xea05dbe12b6a5ef549d3e4a6b8fa2826bd0157a5",
    Funds: "0xfb8f8921ab57c6cd19f637a772cb0ae6374fdf1a",
    Faucet: "0x762c63cc5102f448e541ad5c9859dce398a0b2c6",
    Feed: "0x36e590f0e5ea86e69ad69e6f189927c7808fe4e2",
    Tags: "0x3f991679094bcc0c5e382aea2646bf7729e98bfb",
    RegistryController: "0x9234104000d07e9f979d0658ab4c3af24d28c809",
    Entry: "0x8851b3dc6676f92532180cc0da14f86db248243a"
};

// first be sure to deploy all libraries and link them to contracts: replace __LIB____ with actual address( no 0x) 486aac69d2fd446bf1379aea3b43a52f044fef6c
/*["Votes", "Feed", "Entry"].forEach(
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
*//*
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
*/
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
/*
    run('Comments', objects.Comments).setRegistry(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('Comments setRegistry');
        console.log(err, resp);
    });


    run('Comments', objects.Comments).setEntryAddress(objects.Entry, { gas: 4000000 }, (err, resp) => {
        console.log('Comments setEntryAddress');
        console.log(err, resp);
    });
*/
/*
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