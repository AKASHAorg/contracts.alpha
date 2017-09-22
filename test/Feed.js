const BigNumber = web3.BigNumber;
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const Feed = artifacts.require('Feed.sol');

contract('Feed', function ([owner, wallet, otherAccount]) {
  let feed;

  before(async function () {
    feed = await Feed.deployed();
  });

  describe('follow', function () {

    it('should follow an address', async function() {
      const follow = await feed.follow(otherAccount, {from: wallet});
      const event = follow.logs.find(e => e.event === 'Follow');
      should.exist(event);

      const followers = await feed.totalFollowers(otherAccount);
      followers.should.be.bignumber.equal(1);

      const following = await feed.totalFollowing(wallet);
      following.should.be.bignumber.equal(1);
    });

    it('should unfollow', async function() {
      console.log(feed.follow.request(otherAccount, {from: wallet, gas: 1000}));
      const unfollow = await feed.unFollow(otherAccount, {from: wallet});
      const event = unfollow.logs.find(e => e.event === 'UnFollow');
      should.exist(event);
    });

  })

});