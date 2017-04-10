const App = artifacts.require('./App');
const Dlinked = artifacts.require('./DLinked');
const Comments = artifacts.require('./Comments');
const Entry = artifacts.require('./Entry');
const Faucet = artifacts.require('./Faucet');
const Feed = artifacts.require('./Feed');
const Funds = artifacts.require('./Funds');
const RegistryController = artifacts.require('./RegistryController');
const RegistryStore = artifacts.require('./RegistryStore');
const Subs = artifacts.require('./Subs');
const Tags = artifacts.require('./Tags');
const Votes = artifacts.require('./Votes');

module.exports = function (deployer) {
    let registryController, registryStore, tags, entry, funds, faucet, comments, feed, subs, votes;
    deployer.deploy(Dlinked);
    // Bind Dlinked lib to contracts
    deployer.link(Dlinked, [Comments, Entry, Feed, Subs, Tags, Votes]);

    deployer.deploy(RegistryStore);

    deployer.deploy(RegistryController);

    deployer.deploy(Tags);

    deployer.deploy(Faucet);

    deployer.deploy(Funds);

    deployer.deploy(Entry);

    deployer.deploy(Comments);

    deployer.deploy(Feed);

    deployer.deploy(Subs);

    deployer.deploy(Votes);

    deployer.deploy(App);

    deployer
        .then(function() {
        return RegistryStore.deployed();
        })
        .then(function(instance) {
            registryStore = instance;
            return RegistryController.deployed();
        })
        .then(function(instance) {
            registryController = instance;
            return registryStore.setOwner(registryController.address);
        })
        .then(function() {
            return registryController.setStore(registryStore.address)
        })
        .then(function(){
            return Tags.deployed();
        })
        .then(function(instance) {
            tags = instance;
            return tags.setRegistry(registryController.address);
        })
        .then(function() {
            return Faucet.deployed();
        })
        .then(function(instance) {
           faucet = instance;
           return faucet.setRegistry(registryController.address);
        })
        .then(function() {
            return Funds.deployed();
        })
        .then(function(instance) {
            funds = instance;
            return funds.setRegistry(registryController.address);
        })
        .then(function() {
            return Entry.deployed();
        })
        .then(function(instance) {
            entry = instance;
            return entry.setRegistry(registryController.address);
        })
        .then(function() {
            return entry.setTagsSource(tags.address);
        })
        .then(function(){
            return Comments.deployed();
        })
        .then(function(instance){
            comments = instance;
            return comments.setRegistry(registryController.address);
        })
        .then(function() {
            return comments.setEntryAddress(entry.address);
        })
        .then(function() {
            return Feed.deployed();
        })
        .then(function(instance){
            feed = instance;
            return feed.setRegistry(registryController.address);
        })
        .then(function(){
            return Subs.deployed();
        })
        .then(function(instance) {
            subs = instance;
            return subs.setRegistry(registryController.address);
        })
        .then(function() {
            return subs.setTagSource(tags.address);
        })
        .then(function(){
            return Votes.deployed();
        })
        .then(function(instance){
            votes = instance;
            return votes.setRegistry(registryController.address);
        })
        .then(function() {
            return votes.setFundsAddress(funds.address);
        })
        .then(function() {
            return votes.setEntriesAddress(entry.address);
        })
        .then(function() {
            return votes.setFaucetAddress(faucet.address);
        });
};
