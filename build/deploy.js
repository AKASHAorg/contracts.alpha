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
        gas: 4712300
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
    RegistryStore: "0x155c6d4831e0af9e3dee5159fb4e2a79fc0ac2c1",
    Comments: "0x8361da6abaa79589e768c8014a15dd569a3710e0",
    Votes: "0x23b0c296a9da5c1cbbd27edfe7e1282bb3f511ce",
    Funds: "0xa3e8254a83ac17f5999f0b2a33cf5671d61158f2",
    Faucet: "0x73dbff001616c8be349ee2fcbf1eeabe4836a22c",
    Feed: "0xd3a161dbc0acc415b3c73af1ac8ccaa2a2c79f3d",
    Tags: "0xd1ad662baa60cfc0a566ae50e93b0cd2c61a98a2",
    RegistryController: "0xc20a377b23e71138fa6c52c5b1e14be5ba79fdba",
    Entry: "0xbcb5b0974a29d24a3ce0badf18e1350cb8c00361",
    Subs: "0x0fd0eed8c14b040f0e8bd18334de1d8153b8a8bd"
};

//"Feed", "Tags", "RegistryController", "Entry" first be
// sure to deploy all libraries
// and link them to contracts: replace __LIB____ with actual address( no 0x)
// 8d303a3aec90ef378693440c16b263c612b82e58
/*["Subs"].forEach(
      (instance) => {
          console.log('deploying '+ instance);
          deploy(instance);
      }
);
*/
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
/*
    run('Tags', objects.Tags).setRegistry(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('Tags setRegistry');
        console.log(err, resp);
    });


    run('Faucet', objects.Faucet).setRegistry(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('Faucet setRegistry');
        console.log(err, resp);
    });
    */
/*
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
    */
/*
    run('Subs', objects.Subs).setRegistry(objects.RegistryController, { gas: 4000000 }, (err, resp) => {
        console.log('Subs setRegistry');
        console.log(err, resp);
    });

    run('Subs', objects.Subs).setTagSource(objects.Tags, { gas: 4000000 }, (err, resp) => {
        console.log('Subs setTagSource');
        console.log(err, resp);
    });
    */
/*
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
// runMigrations();

function release(version, hash) {
    run('Feed', objects.Feed).setVersion('https://github.com/AkashaProject/Alpha/releases/tag/'+version, version, hash, { gas: 4000000 }, (err, resp) => {
        console.log('Feed setVersion');
        console.log(err, resp);
    });
}
// release('0.1.0', 'QmfPdTH4Qse2WnDHXq6PfeVvfzt7FvaidmxDHW2wDdz775');