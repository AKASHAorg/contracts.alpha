const Dlinked = require('./DLinked');
const Comments = require('./Comments');
const Entry = require('./Entry');
const Faucet = require('./Faucet');
const Feed = require('./Feed');
const Funds = require('./Funds');
const RegistryController = require('./RegistryController');
const RegistryStore = require('./RegistryStore');
const Subs = require('./Subs');
const Tags = require('./Tags');
const Votes = require('./Votes');

module.exports = function(deployer) {
  deployer.deploy(Dlinked);

  deployer.link(Dlinked, Comments);
  deployer.deploy(Comments);

  deployer.link(Dlinked, Entry);
  deployer.deploy(Entry);

  deployer.deploy(Faucet);

  deployer.deploy(Funds);


  deployer.link(Dlinked, Feed);
  deployer.deploy(Feed);

  deployer.deploy(RegistryController);

  deployer.deploy(RegistryStore);

  deployer.link(Dlinked, Subs);
  deployer.deploy(Subs);

  deployer.link(Dlinked, Tags);
  deployer.deploy(Tags);

  deployer.link(Dlinked, Votes);
  deployer.deploy(Votes);
};
