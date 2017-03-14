const classes = require('./../build/classes.json');
const objects = require('./objects.json');

/**
 *
 * const TestRPC = require("ethereumjs-testrpc");
 * const classes = require('./js_module').default;
 web3.setProvider(TestRPC.provider());
 const xx = new classes.Class(web3);
 xx.classes["DLinked"].deploy({gas: 2000000}, function(err, tx) {
    console.log(err, tx);
});
 **/
///////////////// POOR MAN'S DEPLOYER >_> \\\\\\\\\\\\\\\\\\\\
function deploy(web3, contract, cb) {
    console.log('deploying ' + contract);
    const ContractClass = web3.eth.contract(JSON.parse(classes[contract].interface));
    const deploy = ContractClass.new({
        data: classes[contract].bytecode,
        gas: 4712300
    }, (err, myContract) => {
        if (!err) {
            if (!myContract.address) {
                console.log(contract, myContract.transactionHash, 'hash');
            } else {
                cb('', myContract.address);
            }

        }

        if (err) {
            cb(err);
        }
    });
}
exports.deploy = deploy;

function bindLib(contract, hexLibAddress, libName) {

    let placeholder = "__" + libName;
    if (placeholder.length < 40) {
        placeholder += "_".repeat(40 - placeholder.length);
    }
    classes[contract].bytecode = (classes[contract].bytecode).replace(placeholder, hexLibAddress.slice(2));
}
exports.bindLib = bindLib;

function run(web3, contract, address) {
    return web3.eth.contract(JSON.parse(classes[contract].interface)).at(address);
}
exports.run = run;

exports.objects = objects;

const steps = new Map();

function step_1(web3) {
    run(web3, 'RegistryStore', objects.RegistryStore).setOwner(objects.RegistryController, {gas: 4000000}, (err, resp) => {
        console.log('RegistryStore setOwner');
        console.log(err, resp);
    });
}
steps.set('step_1', step_1);


function step_2(web3) {
    run(web3, 'RegistryController', objects.RegistryController).setStore(objects.RegistryStore, {gas: 4000000}, (err, resp) => {
        console.log('RegistryController setStore');
        console.log(err, resp);
    });
}
steps.set('step_2', step_2);


function step_3(web3) {
    run(web3, 'Tags', objects.Tags).setRegistry(objects.RegistryController, {gas: 4000000}, (err, resp) => {
        console.log('Tags setRegistry');
        console.log(err, resp);
    });


    run(web3, 'Faucet', objects.Faucet).setRegistry(objects.RegistryController, {gas: 4000000}, (err, resp) => {
        console.log('Faucet setRegistry');
        console.log(err, resp);
    });
}
steps.set('step_3', step_3);


function step_4(web3) {
    run(web3, 'Funds', objects.Funds).setRegistry(objects.RegistryController, {gas: 4000000}, (err, resp) => {
        console.log('Funds setRegistry');
        console.log(err, resp);
    });
}
steps.set('step_4', step_4);


function step_5(web3) {
    
    run(web3, 'Entry', objects.Entry).setTagsSource(objects.Tags, {gas: 4000000}, (err, resp) => {
        console.log('Entry setTagsSource');
        console.log(err, resp);
    });
    
    run(web3, 'Entry', objects.Entry).setRegistry(objects.RegistryController, {gas: 4000000}, (err, resp) => {
        console.log('Entry setRegistry');
        console.log(err, resp);
    });
    
}
steps.set('step_5', step_5);


function step_6(web3) {
    
    run(web3, 'Comments', objects.Comments).setRegistry(objects.RegistryController, {gas: 4000000}, (err, resp) => {
        console.log('Comments setRegistry');
        console.log(err, resp);
    });
    
    run(web3, 'Comments', objects.Comments).setEntryAddress(objects.Entry, {gas: 4000000}, (err, resp) => {
        console.log('Comments setEntryAddress');
        console.log(err, resp);
    });
    
    run(web3, 'Feed', objects.Feed).setRegistry(objects.RegistryController, {gas: 4000000}, (err, resp) => {
        console.log('Feed setRegistry');
        console.log(err, resp);
    });
}
steps.set('step_6', step_6);


function step_7(web3) {
    run(web3, 'Subs', objects.Subs).setRegistry(objects.RegistryController, {gas: 4000000}, (err, resp) => {
        console.log('Subs setRegistry');
        console.log(err, resp);
    });

    run(web3, 'Subs', objects.Subs).setTagSource(objects.Tags, {gas: 4000000}, (err, resp) => {
        console.log('Subs setTagSource');
        console.log(err, resp);
    });
}
steps.set('step_7', step_7);


function step_8(web3) {
    run(web3, 'Votes', objects.Votes).setRegistry(objects.RegistryController, {gas: 4000000}, (err, resp) => {
        console.log('Votes setRegistry');
        console.log(err, resp);
    });

    run(web3, 'Votes', objects.Votes).setFundsAddress(objects.Funds, {gas: 4000000}, (err, resp) => {
        console.log('Votes setFundsAddress');
        console.log(err, resp);
    });
}
steps.set('step_8', step_8);


function step_9(web3) {
    run(web3, 'Votes', objects.Votes).setEntriesAddress(objects.Entry, {gas: 4000000}, (err, resp) => {
        console.log('Votes setEntriesAddress');
        console.log(err, resp);
    });
    run(web3, 'Votes', objects.Votes).setFaucetAddress(objects.Faucet, {gas: 4000000}, (err, resp) => {
        console.log('Votes setFaucetAddress');
        console.log(err, resp);
    });
}
steps.set('step_9', step_9);

function runMigrations(web3, number, waitTime) {
    let initial = (number > 0 && number <= steps.size) ? number : 1;
    const wait = (waitTime) ? waitTime: 30000;
    const interval = setInterval(() => {
        if (initial > steps.size) {
            clearInterval(interval);
            return null;
        }
        (steps.get('step_' + initial))(web3);
        initial++;
    }, waitTime);

}
exports.runMigrations = runMigrations;
exports.steps = steps;

/**
 * release('0.5.2', 'QmW3h3d98cM5Wq6gQX5YCuc3jJEFmzNtD3bKx5t1Y3SDxa');
 * @param web3
 * @param version
 * @param hash
 */
function release(web3, version, hash) {
    run(web3, 'Feed', objects.Feed).setVersion('https://github.com/AkashaProject/Alpha/releases/tag/' + version, version, hash, {gas: 4000000}, (err, resp) => {
        console.log('Feed setVersion');
        console.log(err, resp);
    });
}

exports.release = release;

module.exports = exports;