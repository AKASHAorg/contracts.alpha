const test = require('tape');
const deployer = require('./deployer');
const helpers = require('../helpers/deploy');

let constracts;
const contractName = 'RegistryController';
let instance;

test('deploy', function (t) {
    t.plan(1);

    deployer.deployAll(1, 500, (err, data) => {
        constracts = data;
        setTimeout(()=> t.ok(data), 10000);
    });
});

test('register', function (t) {
   t.plan(2);
    instance = helpers.run(deployer.web3, contractName, constracts[contractName]);

    instance.check_format('testuser', (err, data) => {
        t.ok(data);
    });

    instance.register('testuser', ['bmfirst', 'second'], { gas: 1000000, from: deployer.accounts[1] }, (err, tx) => {
        console.log(err, tx);
        console.log(tx);
        t.ok(tx);
    })
});