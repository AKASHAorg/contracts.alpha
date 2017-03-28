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

    deployer
        .then(function() {
        return RegistryStore.new();
        })
        .then(function(instance) {
            registryStore = instance;
            return RegistryController.new();
        })
        .then(function(instance) {
            registryController = instance;
            return registryStore.setOwner(registryController.address);
        })
        .then(function() {
            return registryController.setStore(registryStore.address)
        })
        .then(function(){
            return Tags.new();
        })
        .then(function(instance) {
            tags = instance;
            return tags.setRegistry(registryController.address);
        })
        .then(function() {
            return Faucet.new();
        })
        .then(function(instance) {
           faucet = instance;
           return faucet.setRegistry(registryController.address);
        })
        .then(function() {
            return Funds.new();
        })
        .then(function(instance) {
            funds = instance;
            return funds.setRegistry(registryController.address);
        })
        .then(function() {
            return Entry.new();
        })
        .then(function(instance) {
            entry = instance;
            return entry.setRegistry(registryController.address);
        })
        .then(function() {
            return entry.setTagsSource(tags.address);
        })
        .then(function(){
            return Comments.new();
        })
        .then(function(instance){
            comments = instance;
            return comments.setRegistry(registryController.address);
        })
        .then(function() {
            return comments.setEntryAddress(entry.address);
        })
        .then(function() {
            return Feed.new();
        })
        .then(function(instance){
            feed = instance;
            return feed.setRegistry(registryController.address);
        })
        .then(function(){
            return Subs.new();
        })
        .then(function(instance) {
            subs = instance;
            return subs.setRegistry(registryController.address);
        })
        .then(function() {
            return subs.setTagSource(tags.address);
        })
        .then(function(){
            return Votes.new();
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
