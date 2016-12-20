pragma solidity ^0.4.7;
import 'dapple/test.sol';
import 'feed.sol';
import 'registrycontroller.sol';
import 'registrystore.sol';

contract ProfileTest is Test {
    Profile profile;
    Tester proxy_tester;

    function setUp() {
        profile = new Profile(address(0x0), [bytes32("0x"), bytes32("1x")], address(this));
        proxy_tester = new Tester();
        proxy_tester._target(profile);
    }

    function testProfileOwner() {
        assertTrue(profile.owner() == address(this), 'owner not set');
    }
    event UpdateInfo();
    function testProfileUpdate() {
        expectEventsExact(profile);
        UpdateInfo();
        profile.setHash([bytes32("1x2"), bytes32("2x3")]);
    }
    function testFailProfileTip() {
        profile.sendTip.value(1)();
    }
}