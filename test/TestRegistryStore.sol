pragma solidity ^0.4.8;

import "truffle/Assert.sol";
import "../contracts/RegistryStore.sol";

contract TestRegistryStore {

    RegistryStore registryStore = new RegistryStore();

    function testAdd() {
        Assert.isTrue(registryStore.add(bytes32("new.user"), address(0x1), address(0x2)), 'It should store new record.');
        Assert.isFalse(registryStore.add(bytes32("new.user"), address(0x3), address(0x4)), 'It should not store(same id).');
        Assert.isFalse(registryStore.add(bytes32("new.user1"), address(0x1), address(0x4)), 'It should not store(same address).');
    }

    function testRemove() {

        Assert.isFalse(registryStore.remove(bytes32("new.user"), address(0x2)), 'It should not remove record(owner).');

        Assert.isTrue(registryStore.remove(bytes32("new.user"), address(0x1)), 'It should remove record.');

        Assert.isFalse(registryStore.remove(bytes32("new.user1"), address(0x1)), 'It should not remove record().');

        Assert.isFalse(registryStore.remove(bytes32("new.user"), address(0x1)), 'It should not remove record(ID).');
    }

    function testCanStore() {
        Assert.isTrue(registryStore.can_store(bytes32("new.user3"), address(0x4)), 'It should allow to store.');
    }
}
