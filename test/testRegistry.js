const RegistryController = artifacts.require("./RegistryController");
const RegistryStore = artifacts.require("./RegistryStore");
let controller;
let store;
const testUser = 'test.user1';
const testHash = 'QmIPFSHash';
const testHashUpdate = 'QmIPFSHashOO';
contract("RegistryController", function(accounts){
   it("should register new profile", function(){
       return RegistryController.deployed().then(function(instance){
           controller = instance;
           return controller.register(testUser, testHash, { from: accounts[1] });
       }).then(function(tx){
           return RegistryStore.deployed();
       }).then(function(instance){
           store = instance;
           return store.get_by_id.call(testUser);
       }).then(function(data){
           assert.strictEqual(web3.toUtf8(data[1]), testHash);
           return controller.update(testUser, testHashUpdate, { from: accounts[1] });
       }).then(function(tx){
           return store.get_by_id.call(testUser);
       }).then(function(data){
           assert.strictEqual(web3.toUtf8(data[1]), testHashUpdate);
       });
   })
});